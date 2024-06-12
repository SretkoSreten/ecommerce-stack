import React from 'react';

interface SuccessMsgProps {
  name: string;
  content: string;
}

const SuccessMsg: React.FC<SuccessMsgProps> = ({ name, content }) => {
  return (
    <div
      className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
      role="alert"
    >
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{name}:</span> {content}
      </div>
    </div>
  );
};

export default SuccessMsg;
