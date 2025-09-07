import { useState } from "react";
import { Link } from "react-router-dom";
import { FormField } from "@/components/ui/FormField";
import { CTAButton } from "@/components/ui/CTAButton";
import { SocialButton } from "@/components/ui/SocialButton";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Email - simple check
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
            }
        }

        // Password - only check empty
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        return newErrors;
    };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        error={errors.email}
      />

      <FormField
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        error={errors.password}
      />

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <SocialButton
          icon={<GoogleIcon />}
          provider="Google"
          type="button"
          onClick={() => console.log("Google login")}
        />
        
        <SocialButton
          icon={<AppleIcon />}
          provider="Apple"
          type="button"
          onClick={() => console.log("Apple login")}
        />
      </div>

      {/* Login Button */}
      <CTAButton
        type="submit"
        size="lg"
        className="w-full"
        loading={loading}
      >
        Login
      </CTAButton>

      {/* Additional Links */}
      <div className="space-y-2 text-center">
        <Link
          to="/forgot-password"
          className="text-sm font-body text-primary hover:underline transition-colors"
        >
          Forgot Password?
        </Link>
        
        {/* <p className="text-sm font-body text-secondary-gray">
          Don't have an account?{" "}
          <Link
            to="/create-account"
            className="text-royal-blue hover:underline font-medium"
          >
            Join Community
          </Link>
        </p> */}
      </div>
    </form>
  );
};