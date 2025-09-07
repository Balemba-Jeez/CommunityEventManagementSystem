import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/Header";
import { CTAButton } from "@/components/ui/CTAButton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";


const VerifyPhone = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [codeResent, setCodeResent] = useState(false);
  const { toast } = useToast();
  const [userPhone, setUserPhone] = useState("");
  const [userId, setUserId] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("userSignupData");
        if (storedUser) {
            const { id, phone } = JSON.parse(storedUser); // tel = phone number from signup
            if (id && phone) {
            setUserId(id);
            setUserPhone(phone);
            return; // ✅ valid user, don’t redirect
            }
        }

        // If missing data, redirect to signup
        navigate("/create-account");
    }, [navigate]);

    // Countdown effect
    useEffect(() => {
      if (resendTimer <= 0) return;

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // stop countdown at 0
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
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
            
        try {
            const response = await axios.post("http://localhost:3000/api/users/new/phone/verify-code", {
                userId,
                phone: userPhone,
                code: otp,
            });

            toast({
                title: "Phone Verified!",
                description: response.data.message,
            });

            navigate("/"); // or next step
        } catch (error: any) {
            toast({
                title: "Verification failed",
                description: error?.response?.data?.error || "Invalid code or server error",
                variant: "destructive",
            });
        } finally {
        setLoading(false);
        }

  };

    const handleResendCode = async () => {
    if (resendTimer > 0) return;
    
    setResendLoading(true);
    
    try {
        await axios.post("http://localhost:3000/api/users/new/phone/resend-verification", {
            userId,
            phone: userPhone,
        });

        setCodeResent(true);
        setResendTimer(24);

        toast({
            title: "Code Sent",
            description: "A new verification code has been sent to your phone.",
        });

        setTimeout(() => setCodeResent(false), 3000);
    } catch (error: any) {
    toast({
        title: "Failed to resend",
        description: error?.response?.data?.error || "Something went wrong",
        variant: "destructive",
    });
    } finally {
        setResendLoading(false);
    }

  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={3} onCancel={handleCancel}/>
      
      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-semibold text-charcoal leading-tight mb-4">
              Verify your phone
            </h1>
            <p className="text-base font-body text-secondary-gray">
              Enter the 6-digit code we sent to{" "}
              <span className="font-medium text-charcoal">{userPhone}</span>{" "}
              to complete your verification.
            </p>
          </div>

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
              Verify Phone
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
          <div className="text-center mt-6">
            <p className="text-sm text-secondary-gray">
              Having trouble?{" "}
              <a 
                href="mailto:team@womp.xyz" 
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

export default VerifyPhone;