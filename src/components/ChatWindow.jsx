import React from "react";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  ChannelHeader,

} from "stream-chat-react";
import { useNavigate } from "react-router-dom";
import CallButton from "./CallButton";
import "stream-chat-react/dist/css/v2/index.css";
import { useSelector } from "react-redux";

// NOTE: The styling below uses very high-specificity selectors and !important
// to ensure Stream's internal styles are overridden. If you still see no
// change, follow the restart + hard-refresh steps in the chat reply.

export function ChatWindow({ chatClient, channel, channelId, isEmployer}) {
  const handleVideoCall = () => {
    if (!channel) {
      toast.error("No channel ready for calls.");
      return;
    }
    const callUrl = `${window.location.origin}/call/${channelId}`;
    channel
      .sendMessage({
        text: `Your interview has been scheduled successfully! Please read the following instructions carefully to ensure a smooth interview experience.

**Pre-Interview Preparation:**
• Test your internet connection and ensure stable connectivity
• Check your camera and microphone functionality 30 minutes before the interview
• Choose a quiet, well-lit location with minimal background distractions
• Keep your resume, portfolio, and relevant documents ready
• Prepare answers for common behavioral and technical questions
• Research the company and role thoroughly

**Technical Requirements:**
• Laptop/desktop with working camera and microphone
• Updated web browser (Chrome, Firefox, Safari, or Edge)
• Backup internet connection (mobile hotspot if needed)
• Headphones recommended for better audio quality

**During the Interview:**
• Join the call 5-10 minutes early using the provided link
• Dress professionally as you would for an in-person interview
• Maintain eye contact by looking at the camera, not the screen
• Speak clearly and pause for any potential audio delays
• Have a pen and paper ready for notes

**Interview Structure:**
• Introduction and company overview (5-10 minutes)
• Technical/behavioral questions (30-40 minutes)
• Your questions about the role/company (5-10 minutes)
• Next steps discussion (5 minutes)

**Important Notes:**
• Keep your phone on silent mode
• Inform household members about your interview timing
• Have the interviewer's contact details handy for technical issues
• If you experience technical difficulties, contact us immediately

Video Call Link: ${callUrl}

Good luck with your interview!
`,
      })
      .then(() => toast.success("Video call link sent successfully!"))
      .catch(() => toast.error("Failed to send video call link."));
  };
  const navigate = useNavigate();
  console.log(isEmployer);
  console.log(typeof(isEmployer));
  const employer = true;
 function handleBack (){
  console.log() 
  navigate(-1);} 
  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className="chat-page fixed inset-0 flex items-stretch justify-center bg-gray-50">
          <div className="chat-container relative flex-1 h-full bg-gray-300">

            {/* NAVBAR */}
            <header className="chat-header border-1 sticky top-0 z-50 bg-white h-[60px]">
              <div className="max-w-[1400px]  mx-auto flex items-center justify-between px-6 h-14">
                <div className="left-controls  flex items-center min-w-[150px] ">
                 <button
  onClick={handleBack}
  className="back-btn inline-flex items-center gap-2 rounded-md border border-gray-200  px-3 py-1 text-sm text-gray-700 hover:text-blue-500 hover:border-blue-500 hover:scale-105"
  style={{ 
    position: 'relative', 
    zIndex: 9999,
    pointerEvents: 'auto'
  }}
  aria-label="Back"
>

                    <svg width="25" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-medium p-1">Back</span>
                  </button>
                </div>

                <div className="flex-1 flex items-center justify-center min-w-0 px-4">
                  <div className="w-full max-w-[800px] relative top-1 text-center">
                    <ChannelHeader />
                  </div>
                </div>

                <div className="right-controls flex items-center justify-end min-w-[150px]">
                  <div className="call-button-wrapper">
                   {(true)?<CallButton handleVideoCall={handleVideoCall} />:<div className=" "></div>} 
                  </div>
                </div>
              </div>
            </header>

            {/* CHAT AREA */}
            <main className="chat-main relative h-[calc(100vh-112px)] overflow-hidden">
              <div className="max-w-[1400px] mx-auto h-full px-6">
                <Window>
                  <MessageList MessageAvatar={() => null} />
                </Window>
              </div>
            </main>

            {/* FOOTER / INPUT */}
            <footer className="chat-footer sticky bottom-0 z-50 border-t mt-[-11px] bg-white">
              <div className="max-w-[1400px] mx-auto px-6 py-2">
                <MessageInput focus />
              </div>
            </footer>

            <Thread />

            <style jsx global>{`
              /* -----------------------
                 Important: very specific overrides
                 ----------------------- */
              html, body, #root { height: 100%; }
              .chat-page { background: #f8fafc !important; }
              .chat-container { display: flex !important; flex-direction: column !important; height: 100% !important; }

              /* Force Stream internal main panel to full height */
              .chat-container .str-chat__main-panel, .chat-container .str-chat__main-panel-inner {
                width: 100% !important;
                height: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                box-sizing: border-box !important;
              }

              /* MESSAGE LIST: enable vertical scroll, hide horizontal scroll */
              .chat-container .str-chat__message-list, .chat-container .str-chat__message-list-scroll {
                height: 100% !important;
                padding: 28px 12px !important;
                box-sizing: border-box !important;
                overflow-y: auto !important; /* allow scrolling vertically */
                overflow-x: hidden !important; /* prevent horizontal scroll */
                -webkit-overflow-scrolling: touch !important;
              }

              /* Hide any stray horizontal bars */
              .chat-container .str-chat__message-list-scroll::-webkit-scrollbar { width: 10px; height: 8px; }
              .chat-container .str-chat__message-list-scroll::-webkit-scrollbar:horizontal { height: 8px; }

              /* Remove per-message avatars completely */
              .chat-container .str-chat__message .str-chat__avatar,
              .chat-container .str-chat__message .str-chat__message-avatar,
              .chat-container .str-chat__message .str-chat__avatar img {
                display: none !important; width: 0 !important; height: 0 !important; margin: 0 !important; padding: 0 !important;
              }

              /* spacing between messages */
              .chat-container .str-chat__message { margin-bottom: 14px !important; }

              /* Ensure message contents are aligned and not stretched */
              .chat-container .str-chat__message .str-chat__message-inner,
              .chat-container .str-chat__message .str-chat__message-content { display: inline-flex !important; align-items: flex-start !important; }

              /* RECEIVED messages: light background, crisp text */
              .chat-container .str-chat__message:not(.str-chat__message--me) .str-chat__bubble,
              .chat-container .str-chat__message:not(.str-chat__message--mine) .str-chat__bubble {
                background-color: #f1f5f9 !important; /* off-white / faint blue */
                color: #0f172a !important; /* dark text */
                border-radius: 12px !important;
                padding: 10px 14px !important;
                box-shadow: 0 3px 10px rgba(2,6,23,0.03) !important;
                max-width: 72% !important;
                display: inline-block !important;
                margin-left: 0 !important;
              }

              /* SENT messages: strong green background, less rounded
                 Note: we force margin-left:auto so bubble sits to the right. */
              .chat-container .str-chat__message--me { justify-content: flex-end !important; }
              .chat-container .str-chat__message--me .str-chat__bubble,
              .chat-container .str-chat__message--mine .str-chat__bubble {
                background-color: #059669 !important; /* strong green */
                color: #ffffff !important; /* white text */
                border-radius: 8px !important; /* less rounded */
                padding: 10px 14px !important;
                box-shadow: 0 10px 30px rgba(5,150,105,0.14) !important;
                max-width: 72% !important;
                display: inline-block !important;
                margin-left: auto !important; /* push to right */
                border: 1px solid rgba(0,0,0,0.03) !important;
              }

              /* Ensure timestamp & read/seen mark inside green bubble are readable */
              .chat-container .str-chat__message--me .str-chat__message-timestamp,
              .chat-container .str-chat__message--me .str-chat__message-status {
                color: rgba(255,255,255,0.9) !important; font-size: 12px !important;
              }

              /* Make usernames & timestamps outside bubble readable */
              .chat-container .str-chat__message-username { color: #334155 !important; font-size: 12px !important; }
              .chat-container .str-chat__message-timestamp { color: #64748b !important; font-size: 12px !important; }

              /* DATE separator */
              .chat-container .str-chat__date-separator { text-align:center !important; display:flex !important; justify-content:center !important; margin: 18px 0 !important; }
              .chat-container .str-chat__date-separator-text { background:#e6eef8 !important; color:#0f172a !important; font-size:0.85rem !important; font-weight:600 !important; padding:6px 14px !important; border-radius:9999px !important; }

              /* NAVBAR styling: balance and contrast */
              .chat-header { box-shadow: 0 6px 24px rgba(15,23,42,0.06) !important; }
              .chat-header .back-btn { background: #fff !important; border-radius: 8px !important; }
              .chat-header .str-chat__channel-header__title { font-weight:700 !important; font-size:16px !important; color:#0f172a !important; }
              .chat-header .str-chat__channel-header__subtitle { color:#6b7280 !important; font-size:12px !important; margin-top:2px !important; }

              /* CALL BUTTON: ensure it's visible and in the right area */
              .chat-header .call-button-wrapper { display:flex !important; align-items:center !important; justify-content:flex-end !important; }
              .chat-header .call-button-wrapper button, .chat-header .call-button-wrapper .call-btn, .chat-header .call-button-wrapper a {
                background: #059669 !important; color:#fff !important; border-radius:10px !important; padding:8px 12px !important; box-shadow: 0 8px 24px rgba(5,150,105,0.14) !important; border:none !important; display:inline-flex !important; align-items:center !important; gap:8px !important;
              }

              /* INPUT: make pill centered & visible */
              .chat-footer .str-chat__input-flat { border-radius: 9999px !important; padding-left: 18px !important; padding-right: 14px !important; box-shadow: 0 6px 30px rgba(2,6,23,0.04) inset !important; }

              /* Accessibility helpers */
              .chat-container .str-chat__message-username, .chat-container .str-chat__message-timestamp { color:#334155 !important; }

              @media (max-width: 768px) {
                .max-w-[1400px] { max-width: 100% !important; padding-left: 12px !important; padding-right: 12px !important; }
                .chat-container .str-chat__message:not(.str-chat__message--me) .str-chat__bubble,
                .chat-container .str-chat__message--me .str-chat__bubble { max-width: 86% !important; }
              }
            `}</style>
          </div>
        </div>
      </Channel>
    </Chat>
  );
}

export default ChatWindow;
