import React, { useEffect } from "react";

interface Props {
  logout: () => void;
  onFinish: () => void;
}

export const CallLogout: React.FC<Props> = ({ logout, onFinish }) => {
  useEffect(() => {
    const handleLogout = async () => {
      await logout();
      onFinish();
    };

    handleLogout();

    // Cleanup function (equivalent to componentWillUnmount in class components)
    return () => {
      // Add any cleanup logic here if needed
    };
  }, [logout, onFinish]);

  // This component doesn't render anything
  return null;
};
