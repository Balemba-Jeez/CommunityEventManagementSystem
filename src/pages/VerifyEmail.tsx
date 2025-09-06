import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/Header";
import { CTAButton } from "@/components/ui/CTAButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [codeResent, setCodeResent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Demo email - in a real app this would come from router state or API
  const userEmail = "jessy@gmail.com";

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Demo: Accept any 6-digit code for verification
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified.",
      });
      
      // Navigate to next step
      navigate("/verify-phone");
    }, 2000);
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setResendLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResendLoading(false);
      setCodeResent(true);
      setResendTimer(24); // 24 seconds as shown in design
      
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
      
      // Hide the "Code resent!" message after 3 seconds
      setTimeout(() => setCodeResent(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">

      <Header currentStep={2} onCancel={handleCancel}/>
      
      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-semibold text-charcoal leading-tight mb-4">
              Check your inbox
            </h1>
            <p className="text-base font-body text-secondary-gray">
              Enter the 6-digit code we sent to{" "}
              <span className="font-medium text-charcoal">{userEmail}</span>{" "}
            </p>
          </div>

          {/* Code Resent Success Message */}
          {codeResent && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">
                  Code resent!
                </span>
              </div>
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                className="w-full"
              >
                <InputOTPGroup className="w-full justify-center gap-2">
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Submit Button */}
            <CTAButton
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={otp.length !== 6}
            >
              Submit
            </CTAButton>
          </form>

          {/* Resend Code */}
          <div className="text-center mt-6">
            <p className="text-sm font-body text-secondary-gray mb-2">
              Didn't receive the code?{" "}
              {resendTimer > 0 ? (
                <span className="font-medium text-charcoal">
                  Resend code in {resendTimer}s
                </span>
              ) : (
                <button
                  onClick={handleResendCode}
                  disabled={resendLoading}
                  className="text-primary hover:underline font-medium disabled:opacity-50"
                >
                  {resendLoading ? "Sending..." : "Resend code"}
                </button>
              )}
            </p>
          </div>

          {/* Support Link */}
          <div className="text-center mt-4">
            <p className="text-sm text-secondary-gray">
              Having trouble?{" "}
              <a 
                href="mailto:pccommunityevents@gmail.com" 
                className="text-primary hover:underline"
              >
                team@pccommunityevents
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;