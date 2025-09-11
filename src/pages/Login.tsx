import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/auth/Header";
import { LoginForm } from "../components/ui/LoginForm";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);


const handleLogin = async (data: { email: string; password: string }) => {
  setLoading(true);

  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      email: data.email,
      password: data.password,
    });

    const { user, roles, tempToken, message } = response.data;

    // Save temp token if provided
    if (tempToken) localStorage.setItem("tempToken", tempToken);

    // Determine toast content and next page
    let toastTitle = "";
    let toastDescription = "";
    let nextPage = "/";

    if (user.is_verified === 0 && user.status === "pending") {
        // Not verified
      toastTitle = "Almost There!";
      toastDescription = `We've sent you a verification email. Confirm your account to join the community!`;
      nextPage = "/verify-email";
    } else if (user.is_verified === 1 && user.status === "pending") {
        localStorage.setItem("createdAt", user.created_at);
        localStorage.setItem("status", user.status);
        // Verified but waiting approval
      toastTitle = "Hang Tight!";
      toastDescription = `Your account is under review. We'll notify you as soon as it's approved.`;
      nextPage = "/approval-waiting";
    } else if (user.is_verified === 1 && user.status === "active") {

        // Calculate how recent approval is
        const approvedAt = new Date(user.approved_at);
        const now = new Date();
        const diffInHours = (now.getTime() - approvedAt.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            // Show approval success page or toast
            toast({
            title: "Welcome to the Community 🎉",
            description: "Your account has just been approved. You can now choose your role.",
            variant: "default",
            });

            navigate("/approval-waiting"); // optional page
        } else {
            // Normal flow → go to select role
            toast({
            title: `Welcome back, ${user.name}! 🎉`,
            description: "Choose a role to start your journey in the community.",
            variant: "default",
            });

            // Save user and roles for select-role page
            localStorage.setItem("user", JSON.stringify(user));
            if (roles) {
                localStorage.setItem("userRoles", JSON.stringify(roles));
            }

            // Also save tempToken for confirming role
            if (tempToken) {
                localStorage.setItem("tempToken", tempToken);
            }

            nextPage = "/select-role";
        }
    } else if (user.is_verified === 1 && user.status === "blocked") {
      toastTitle = "Oops! Access Restricted 🚫";
      toastDescription = "Your account has been blocked. Please contact support for assistance.";
      nextPage = "/restricted";
    } else if (user.is_verified === 1 && user.status === "rejected") {
      toastTitle = "Not a Community Member ❌";
      toastDescription = `Your account is not approved to access the community.`;
      nextPage = "/restricted";
    } else {
      // fallback
      toastTitle = "Login Info";
      toastDescription = message || "Unexpected account status.";
      nextPage = "/";
    }

    toast({
      title: toastTitle,
      description: toastDescription,
      variant: "default",
    });

    // Save user info in localStorage if active
    if (user.status === "active") {
      localStorage.setItem("user", JSON.stringify(user));
    }

    // Navigate after short delay to let toast be visible
    setTimeout(() => {
      navigate(nextPage);
    }, 1000);

  } catch (error: any) {
    toast({
      title: "Login Failed ❌",
      description: error.response?.data?.message || "Invalid email or password",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-background">
      {/* Header with Join Community CTA */}
      <Header currentStep={1}/>


      <main className="py-10 px-6">
        <div className="max-w-md mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font font-semibold text-charcoal mb-2">
              Welcome back
            </h1>
            <p className="text-[#7F8C8D] font-body">
              Sign in to your PC Community | Events account 
            </p>
          </div>

          {/* Login Form */}
          <LoginForm onSubmit={handleLogin} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default Login;