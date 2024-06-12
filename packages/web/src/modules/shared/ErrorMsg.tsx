import React from "react";

interface ErrorMsgProps {
  content: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ content }) => {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
      role="alert"
    >
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{content}</span>
      </div>
    </div>
  );
};

export default ErrorMsg;
