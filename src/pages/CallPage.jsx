// CallPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import LoadingScreen from "../components/LoadingScreen";
import { getStreamToken } from "../services/apicalls/chatApi";

import "@stream-io/video-react-sdk/dist/css/styles.css";

async function generateDeterministicChannelId(idA, idB) {
  const a = String(idA ?? "");
  const b = String(idB ?? "");
  const pair = [a, b].sort().join("-");
  try {
    if (window.crypto?.subtle) {
      const data = new TextEncoder().encode(pair);
      const hash = await window.crypto.subtle.digest("SHA-256", data);
      const hex = Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      const shortHex = hex.slice(0, 32);
      return `c-${shortHex}`.slice(0, 64);
    }
  } catch {}
  let h = 5381;
  for (let i = 0; i < pair.length; i++) {
    h = (h * 33) ^ pair.charCodeAt(i);
  }
  return `c-${(h >>> 0).toString(16)}`.slice(0, 64);
}

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY || "dnc52adyqvqk";

const CallPage = () => {
  const { id: otherUserId } = useParams();
  const navigate = useNavigate();
  const authUser = useSelector((s) => s.auth.userData);
  const userId = useSelector((state) => state.auth.userId);
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const initCall = async () => {
      setLoading(true);
      if (!authUser || !otherUserId) {
        toast.error("Missing user information or call ID.");
        setLoading(false);
        return;
      }

      const { token } = (await getStreamToken()) || {};
      if (!token) {
        toast.error("Unable to fetch video token.");
        setLoading(false);
        return;
      }

      const localUserId =
        authUser.user_id ||
        authUser.id ||
        authUser._id ||
        authUser.employer_id ||
        userId ||
        null;
      if (!localUserId) {
        toast.error("Current user ID not found.");
        setLoading(false);
        return;
      }

      const channelId = await generateDeterministicChannelId(localUserId, otherUserId);

      try {
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: localUserId,
            name: `${authUser.firstname || authUser.fullname} ${authUser.lastname || ""}`.trim(),
            image: authUser.user_avatar_link,
          },
          token,
        });

        const callInstance = videoClient.call("default", channelId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (err) {
        console.error("Error joining call:", err);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initCall();
  }, [authUser, otherUserId, userId]);

  if (loading) return <LoadingScreen />;

  return client && call ? (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <CallContent
            call={call}
            isFullscreen={isFullscreen}
            setIsFullscreen={setIsFullscreen}
          />
        </StreamTheme>
      </StreamCall>

      <style jsx>{`
        .str-video {
          background: #4b4b4b;
          color: #f1f1f8;
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: "Inter", sans-serif;
          --str-video__primary-color: #7c3aed;
          --str-video__secondary-color: #c4b5fd;
          --str-video__border-radius-circle: 16px;
        }
        .str-video__call-controls {
          padding: 16px 32px;
          background: rgba(31, 28, 44, 0.75);
          backdrop-filter: blur(10px);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        .str-video__call-controls__button {
          padding: 12px 20px;
          background: var(--str-video__primary-color);
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s, background 0.2s;
          cursor: pointer;
          border: none;
        }
        .str-video__call-controls__button:hover {
          transform: translateY(-2px) scale(1.05);
          background: var(--str-video__secondary-color);
        }
        .str-video__speaker-layout {
          flex-grow: 1;
          padding: 24px;
          gap: 16px;
          display: grid;
          grid-template-columns: ${isFullscreen
            ? "repeat(auto-fill, minmax(400px, 1fr))"
            : "repeat(auto-fill, minmax(240px, 1fr))"};
          transition: grid-template-columns 0.3s ease;
        }
        .my-floating-local-participant {
          position: absolute;
          width: 200px;
          height: 150px;
          bottom: 32px;
          right: 32px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          z-index: 30;
          background: #000;
          border: 2px solid var(--str-video__secondary-color);
          transition: transform 0.2s ease;
          cursor: pointer;
        }
        .my-floating-local-participant:hover {
          transform: scale(1.03);
        }
        @media (max-width: 768px) {
          .str-video__call-controls {
            padding: 12px 20px;
            gap: 8px;
          }
          .str-video__speaker-layout {
            padding: 16px;
            gap: 12px;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          }
          .my-floating-local-participant {
            width: 140px;
            height: 100px;
            bottom: 16px;
            right: 16px;
          }
        }
      `}</style>
    </StreamVideo>
  ) : (
    <div className="h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
      <p>Unable to initialize call.</p>
    </div>
  );
};

const CallContent = ({ call, isFullscreen, setIsFullscreen }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const localParticipant = call.localParticipant;
    if (!localParticipant) return;

    const stream = localParticipant.streams && localParticipant.streams[0];
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream.mediaStream;
    }
  }, [call]);

  if (callingState === CallingState.LEFT) {
    navigate("/");
    return null;
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <>
      <SpeakerLayout className="flex-grow p-4" />
      <CallControls className="str-video__call-controls">
        <button
          className="str-video__call-controls__button"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen video layout"
          title="Toggle fullscreen video layout"
        >
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen (75%)"}
        </button>
      </CallControls>

      <div
        className="my-floating-local-participant"
        onClick={toggleFullscreen}
        title="Click to toggle fullscreen video layout"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </>
  );
};

export default CallPage;
