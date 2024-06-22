// src/components/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/api/auth/verify-token`, {token});
        if (!response.data.isSuccess){
            setIsAuthenticated(false);
            setLoading(false);
            return;
        }
        setIsAuthenticated(true);
        setLoading(false)
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    };
    
    verifyToken();

  }, []);

  if (loading) return;

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
