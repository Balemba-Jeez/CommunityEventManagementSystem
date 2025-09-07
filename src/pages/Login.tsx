import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../components/auth/Header";
import { LoginForm } from "../components/ui/LoginForm";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Show success toast
      toast({
        title: "Login successful!",
        description: "Redirecting...",
        variant: "default",
      });
      
      // Redirect to role selection after a short delay
      setTimeout(() => {
        navigate("/select-role");
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Join Community CTA */}
      <Header currentStep={1}/>


      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Welcome Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-semibold text-charcoal mb-2">
              Welcome back
            </h1>
            <p className="text-secondary-gray font-body">
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