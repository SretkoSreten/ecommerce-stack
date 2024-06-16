import React, { useEffect } from "react";

interface Props {
  logout: () => void;
}

export const CallLogout: React.FC<Props> = ({ logout }) => {
  useEffect(() => {
    const handleLogout = async () => {
      await logout();
    };

    handleLogout();

    // Cleanup function (equivalent to componentWillUnmount in class components)
    return () => {
      // Add any cleanup logic here if needed
    };
  }, [logout]);

  // This component doesn't render anything
  return null;
};
