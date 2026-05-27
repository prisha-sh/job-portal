import React, { useEffect, useState, useRef } from "react";
import "../chat.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from "react-hot-toast";

import { getStreamToken } from "../services/apicalls/chatApi"; // adjust path
import { getEmployer, getUser } from "../services/apicalls/authApi"; // adjust path
import { setUserData } from "../redux/slices/authSlice"; // adjust path to your redux slice/action

import ChatLoader from "../components/ChatLoader"; // adjust path
import CallButton from "../components/CallButton"; // adjust path
import { ChatWindow } from "../components/ChatWindow";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY || "dnc52adyqvqk";

/** decode base64url JWT payload */
function decodeJwt(token) {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4;
    const padded = pad ? base64 + "=".repeat(4 - pad) : base64;
    const json = atob(padded);
    return JSON.parse(json);
  } catch (err) {
    console.warn("decodeJwt error:", err);
    return null;
  }
}

/** djb2 fallback short hex hash (deterministic) */
function djb2Hex(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33) ^ s.charCodeAt(i);
  }
  return (h >>> 0).toString(16);
}


async function generateDeterministicChannelId(idA, idB) {
  const a = String(idA ?? "");
  const b = String(idB ?? "");
  const pair = [a, b].sort().join("-"); // order independent

  // prefer secure SHA-256 if available
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(pair);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
      // use first 32 hex chars (16 bytes) → 32 chars
      const shortHex = hex.slice(0, 32);
      const channelId = `c-${shortHex}`; // e.g. c-1a2b3c...
      // safety: ensure <= 64 chars
      return channelId.length <= 64 ? channelId : channelId.slice(0, 64);
    }
  } catch (err) {
    console.warn("crypto.subtle digest failed, falling back to djb2:", err);
  }

  // fallback deterministic short id
  const fallback = `c-${djb2Hex(pair)}`;
  return fallback.length <= 64 ? fallback : fallback.slice(0, 64);
}

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const dispatch = useDispatch();

  // Redux selectors
  const tkn = useSelector((state) => state.auth.token);
  const authUser = useSelector((state) => state.auth.userData);
  const reduxUserId = useSelector((state) => state.auth.userId);
  const [finalChannelId, setFinalChannelId] = useState(null);
  // Local state
  const [isEmployer, setIsEmployer] = useState(true);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingProfile, setFetchingProfile] = useState(false);
  
  const chatInitializedRef = useRef(false);
  const clientRef = useRef(null);

  // 1) fetch profile using token if missing
  useEffect(() => {
    let cancelled = false;
    const  fetchProfileUsingToken = async  () => {
      try {
        if (!tkn) {
          console.log("No token available; skipping profile fetch.");
          return;
        }

        if (authUser && Object.keys(authUser).length) {
          console.log("authUser already present in redux; skipping fetch.");
          return;
        }

        setFetchingProfile(true);
        console.log("Decoding token to extract id...");
        const payload = decodeJwt(tkn);
        console.log("Decoded token payload:", payload);

        const idFromToken = payload?.id || payload?.user_id || payload?.sub;
        console.log("idFromToken:", idFromToken);

        const [empResult, userResult] = await Promise.allSettled([
          getEmployer(dispatch, tkn),
          getUser(dispatch, tkn),
        ]);

        if (cancelled) return;

        console.log("getEmployer result:", empResult);
     
        const extractData = (res) => {
          if (!res) return null;
          if (res.data) {
            if (res.data.data) return res.data.data;
            return res.data;
          }
          return res;
        };

        let selected = null;
          console.log("getUser result:", userResult);
      
        // Set isEmployer true only if fulfilled and employer data is valid
        if (empResult.status === "fulfilled") {
          const employerData = extractData(empResult.value);
          if (employerData && Object.keys(employerData).length > 0) {
            setIsEmployer(true);
            selected = employerData;
            console.log("Selected employer response for userData:", employerData);
          }
        }

        // Fallback to user data if no employer selected
        if (!selected && userResult.status === "fulfilled") {
          const userData = extractData(userResult.value);
          if (userData && Object.keys(userData).length > 0) {
            selected = userData;
            console.log("Selected user response for userData:", userData);
          }
        }

        if (!selected) {
          console.warn("No usable data returned from getEmployer or getUser.");
          setFetchingProfile(false);
          return;
        }

        dispatch(setUserData(selected));
        console.log("Dispatched setUserData with:", selected);
      } catch (err) {
        console.error("Error fetching profile with token:", err);
      } finally {
        if (!cancelled) setFetchingProfile(false);
      }
    };

    fetchProfileUsingToken();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tkn]);

  // 2) Initialize Stream Chat once we have user data (authUser) and targetUserId
  useEffect(() => {
    let active = true;

    const initChat = async () => {
      if (chatInitializedRef.current) {
        console.log("Chat already initialized; skipping.");
        return;
      }

      if (!authUser || Object.keys(authUser).length === 0) {
        console.log("authUser is not available yet; waiting...");
        return;
      }
      if (!targetUserId) {
        console.log("No targetUserId from route; cannot create channel.");
        return;
      }

      setLoading(true);
      try {
        console.log("Requesting stream token from server...");
        const temp = await getStreamToken();
        const streamToken = temp?.token || temp;
        console.log("Received stream token (exists?):", !!streamToken);

        if (!streamToken) {
          console.error("No stream token returned by server.");
          toast.error("Could not get chat token.");
          setLoading(false);
          return;
        }

        // choose a stable user id from authUser / redux
        const localUserId =
          authUser.user_id ||
          authUser.employer_id ||
          reduxUserId ||
          authUser.id ||
          authUser._id ||
          null;

        if (!localUserId) {
          console.error(
            "No local user id available for Stream initialization. authUser:",
            authUser
          );
          toast.error("Could not identify current user for chat.");
          setLoading(false);
          return;
        }

        const displayName = `${authUser.firstname || ""} ${authUser.lastname || ""}`.trim();
        const image = authUser.user_avatar_link || authUser.avatar || undefined;

        // --- HERE: generate deterministic short channel id for the pair ---
        const channelId = await generateDeterministicChannelId(localUserId, targetUserId);
        setFinalChannelId(channelId);
        // logging
        console.log("=== Stream Client Setup Data ===");
        console.log("authUser (from redux):", authUser);
        console.log("localUserId:", localUserId);
        console.log("displayName:", displayName);
        console.log("image:", image);
        console.log("streamToken (first 10 chars):", String(streamToken).slice(0, 10) + "...");
        console.log("targetUserId:", targetUserId);
        console.log("computed channelId:", channelId, "(length:", channelId.length, ")");
        console.log("================================");

        // Final guard: ensure allowed characters and length <= 64
        if (!/^[A-Za-z0-9\-_]+$/.test(channelId)) {
          console.warn("channelId contains unexpected characters. It should be alphanumeric or -/_ only.");
        }
        if (channelId.length > 64) {
          console.warn("channelId longer than 64 chars (unexpected). Truncating to 64.");
        }

        const client = StreamChat.getInstance(STREAM_API_KEY);
        clientRef.current = client;

        await client.connectUser(
          {
            id: String(localUserId),
            name: displayName,
            image: image,
          },
          streamToken
        );

        const currChannel = client.channel("messaging", channelId, {
          members: [String(localUserId), String(targetUserId)],
        });

        await currChannel.watch();

        if (!active) {
          await currChannel.stopWatching();
          await client.disconnectUser();
          return;
        }

        setChatClient(client);
        setChannel(currChannel);
        chatInitializedRef.current = true;
        console.log("Stream chat initialized successfully. channelId:", channelId);
      } catch (err) {
        console.error("Error initializing stream chat:", err);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    initChat();

    return () => {
      active = false;
    };
  }, [authUser, targetUserId, reduxUserId]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      const client = clientRef.current;
      if (client) {
        client
          .disconnectUser()
          .then(() => console.log("Stream client disconnected on unmount"))
          .catch((e) => console.warn("Error disconnecting stream client on unmount:", e));
      }
    };
  }, []);

  

  const listRef = useRef(null);

  // On every render, scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  });

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.replace("/");
  };

  if (loading || fetchingProfile || !chatClient || !channel) return <ChatLoader />;

  return (
    <ChatWindow
      chatClient={chatClient}
      isEmployer={isEmployer}
      channelId= {finalChannelId}
      channel={channel}
      
    />
  );
};

export default ChatPage;
