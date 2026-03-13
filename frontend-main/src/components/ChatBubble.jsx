import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatBubble = ({ role, message }) => {

  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`max-w-3xl p-4 rounded-lg text-sm break-words overflow-x-auto ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-slate-200 dark:bg-slate-700 dark:text-white"
        }`}
      >

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message}
        </ReactMarkdown>

      </div>

    </div>
  );
};