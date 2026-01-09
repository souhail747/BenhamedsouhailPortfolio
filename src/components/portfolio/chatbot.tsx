import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import botAvatar from "../../../public/chatbotimage3.png";

declare global {
  interface Window {
    handleBotQuestion: (question: string) => void;
  }
}

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

// Questions that will appear in the clickable list
const botQA: { [key: string]: string } = {
  "Who is Souhail?":
    "Souhail is a Fullstack JavaScript developer and software engineering graduate with hands-on experience in web development.",
  "Contact (email)":
    "You can contact Souhail at: <a href='https://mail.google.com/mail/?view=cm&fs=1&to=souhailleaders2003@gmail.com' target='_blank' style='color:#007bff;text-decoration:underline;'>souhailleaders2003@gmail.com</a>",
  Phone:
    "Phone: <a href='tel:+216438905' style='color:#007bff;text-decoration:underline;'>+219 438 905</a>",
  GitHub:
    "GitHub: <a href='https://github.com/souhail747' target='_blank' style='color:#007bff;text-decoration:underline;'>https://github.com/souhail747</a>",
  LinkedIn:
    "LinkedIn: <a href='https://www.linkedin.com/in/souhail-benhamed-569826242/' target='_blank' style='color:#007bff;text-decoration:underline;'>https://github.com/souhail747</a>",
};

// Short greetings / phrases that will be answered automatically
const greetingsList: { phrases: string[]; response: string }[] = [
  { phrases: ["hi", "hello"], response: "Hello! Ask me about Souhail." },
  {
    phrases: ["sou", "souhail"],
    response:
      "Souhail is a Fullstack JS developer and software engineering student",
  },
  { phrases: ["bye"], response: "Goodbye! Have a great day!" },
  { phrases: ["okay", "ok"], response: "Sure!" },
  {
    phrases: ["gmail", "email", "contact"],
    response:
      "You can contact Souhail at: <a href='https://mail.google.com/mail/?view=cm&fs=1&to=souhailleaders2003@gmail.com' target='_blank' style='color:#007bff;text-decoration:underline;'>souhailleaders2003@gmail.com</a>",
  },
  {
    phrases: ["3asba", "t7ab", "tahan", "mnaye", "zeby"],
    response: "yezi rak metrabi",
  },
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I’m Souhail Bot 🤖. Ask me something about Souhail.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    window.handleBotQuestion = (question: string) => {
      const answer = botQA[question];
      const botMessage: Message = {
        sender: "bot",
        text: answer,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    };
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node))
        closeChat();
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const closeChat = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 300);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let reply: string | undefined;

      // Check greetings first (automatic responses)
      for (const item of greetingsList) {
        if (item.phrases.some((phrase) => lower.includes(phrase))) {
          reply = item.response;
          break;
        }
      }

      // Check info questions if not greeting
      if (!reply) {
        for (const key in botQA) {
          if (lower.includes(key.split(" ")[0].toLowerCase())) {
            reply = botQA[key];
            break;
          }
        }
      }

      // If not recognized, show clickable list
      if (!reply) {
        reply = `<p>Sorry, I only answer questions about Souhail. Here’s what you can ask:</p>
                 <ul class="gradient-text" style="padding-left:20px; margin:0;">
                   ${Object.keys(botQA)
                     .map(
                       (q) =>
                         `<li style="cursor:pointer; margin-bottom:6px;" onclick="window.handleBotQuestion('${q.replace(
                           /'/g,
                           "\\'"
                         )}')">${q}</li>`
                     )
                     .join("")}
                 </ul>`;
      }

      const botMessage: Message = {
        sender: "bot",
        text: reply,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 600);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);
// Scroll to bottom when messages update
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Scroll to bottom when chat is opened
useEffect(() => {
  if (open) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [open]);

  return (
    <div style={styles.chatWrapper}>
      {!open && (
        <div style={styles.toggleButton} onClick={() => setOpen(true)}>
          <img src={botAvatar} alt="Souhail Bot" style={styles.avatarLarge} />
        </div>
      )}

      {open && (
        <div
          ref={chatRef}
          style={{
            ...styles.chatContainer,
            transform: closing ? "translateY(20px)" : "translateY(0)",
            opacity: closing ? 0 : 1,
            transition: "all 0.3s ease",
          }}
        >
          <div style={styles.botHeader} onClick={closeChat}>
            Souhail Bot
          </div>

          <div style={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent:
                    msg.sender === "bot" ? "flex-start" : "flex-end",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                  padding: "0 10px",
                }}
              >
                {msg.sender === "bot" && (
                  <img src={botAvatar} alt="bot" style={styles.avatarBot} />
                )}
                {msg.sender === "user" && <div style={{ width: "40px" }} />}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontSize: msg.sender === "bot" ? "16px" : "14px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                      color: msg.sender === "bot" ? "#555" : "#007bff",
                    }}
                  >
                    {msg.sender === "bot" ? "Souhail Bot" : "You"}
                  </span>

                  {msg.sender === "bot" ? (
                    <div
                      style={{
                        backgroundColor: "#f1f0f0",
                        color: "#000",
                        borderRadius: "16px",
                        padding: "10px 15px",
                        maxWidth: "750px",
                        wordBreak: "break-word",
                      }}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "16px",
                        padding: "10px 15px",
                        maxWidth: "750px",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                  justifyContent: "flex-start",
                  padding: "0 10px",
                }}
              >
                <img src={botAvatar} alt="bot" style={styles.avatarBot} />
                <div style={{ display: "flex", gap: "4px", marginLeft: "8px" }}>
                  <span
                    style={{ ...styles.typingDot, animationDelay: "0s" }}
                  ></span>
                  <span
                    style={{ ...styles.typingDot, animationDelay: "0.4s" }}
                  ></span>
                  <span
                    style={{ ...styles.typingDot, animationDelay: "0.8s" }}
                  ></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.button}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  chatWrapper: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
    fontFamily: "Arial, sans-serif",
  },
  toggleButton: { cursor: "pointer" },
  avatarLarge: {
    width: "80px",
    height: "80px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  avatarBot: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  chatContainer: {
    width: "480px",
    maxWidth: "95vw",
    height: "90vh",
    marginTop: "10px",
    paddingTop: "0px",
    border: "1px solid #ccc",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    overflow: "hidden",
    position: "relative",
  },
  botHeader: {
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.2rem",
    padding: "12px 20px",
    borderRadius: "12px 12px 0 0",
    textAlign: "center",
    cursor: "pointer",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#f7f7f7",
    fontSize: "14px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
    padding: "8px",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px",
    color: "#000",
    backgroundColor: "#fefefe",
    marginRight: "8px",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "20px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  typingDot: {
    width: "6px",
    height: "6px",
    backgroundColor: "#888",
    borderRadius: "50%",
    display: "inline-block",
    animation: "typingDotBlink 1.4s infinite",
  },
};

export default ChatBot;
