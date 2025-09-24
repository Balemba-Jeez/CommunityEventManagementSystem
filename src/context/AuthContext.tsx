import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  is_verified: number;
  [key: string]: any; // extra fields
}

interface DecodedToken {
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginUser: DecodedToken | null; // decoded token
  login: (user: User, token: string) => void;
  logout: () => void;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState<DecodedToken | null>(null);
  const [authLoading, setLoading] = useState(true);

  // On app load, read user & token from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedDecoded = localStorage.getItem("login_user");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);

      if (storedDecoded) {
        setLoginUser(JSON.parse(storedDecoded));
      } else {
        try {
          const decoded = jwtDecode(storedToken);
          setLoginUser(decoded);
          localStorage.setItem("login_user", JSON.stringify(decoded));
        } catch (err) {
          console.error("Failed to decode token:", err);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);

    try {
      const decoded = jwtDecode(tokenData);
      setLoginUser(decoded);
      localStorage.setItem("login_user", JSON.stringify(decoded));
    } catch (err) {
      console.error("Failed to decode token:", err);
      setLoginUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setLoginUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("login_user");
    localStorage.removeItem("tempToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for convenience
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
