import { useState, useEffect } from "react";
import { Header } from "../components/ApprovalWaitingHeader";
import { Progress } from "@/components/ui/progress";
import { Mail, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const ApprovalWaiting = () => {
  const [reviewProgress, setReviewProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);
  const navigate = useNavigate();

    useEffect(() => {
        // 🔹 Get createdAt from localStorage
        const createdAtStr = localStorage.getItem("createdAt");
        console.log('createdAtStr:', createdAtStr);
        if (createdAtStr) {
        const createdAt = new Date(createdAtStr);
        const today = new Date();

        // Calculate difference in days
        const diffInDays = Math.floor(
            (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        console.log('diffInDays:', diffInDays)

        // Ensure it stays between 1 and 3
        setCurrentDay(Math.min(diffInDays + 1, 3));

        // 🔹 Progress based on days (example distribution)
        // if (diffInDays === 0) setReviewProgress(30); // Day 1
        // if (diffInDays === 1) setReviewProgress(60); // Day 2
        // if (diffInDays >= 2) setReviewProgress(90); // Day 3
        const progress = Math.min(((diffInDays + 1) / 3) * 100, 100);
        setReviewProgress(progress);
        }
    }, []);

  const handleCancel = () => {
    // Could navigate back to login or home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCancel={handleCancel} title="Account Review" />
      
      {/* Progress Section */}
      <div className="bg-[#FFFFFF]  border-border px-4 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm font-body text-[#7F8C8D] mb-2">
              Review Progress: {Math.round(reviewProgress)}% • Day {currentDay} of 3
            </p>
            <Progress value={reviewProgress} className="h-3" />
          </div>
        </div>
      </div>
      
      <main className="py-12  px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Message */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-10 w-10 text-primary" />
            </div>
            
            <h1 className="text-3xl font-heading font-semibold text-[#2C2C2C] leading-tight mb-4">
              Hang Tight! Your Account is Under Review
            </h1>
            
            <div className="space-y-4 text-base font-body text-secondary-gray max-w-lg mx-auto">
              <p>
                Thanks for joining the PC Community! We're reviewing your account to make sure everything is complete.
              </p>
              <p>
                This usually takes <span className="font-medium text-[#2C2C2C]">1–3 business days</span>.
              </p>
              <p>
                You'll receive an email notification once your account is approved.
              </p>
            </div>
          </div>

          {/* Email Reminder */}
          <div className="bg-[#F4F6F7] rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mail className="h-5 w-5 text-[#2C3E94]" />
              <h3 className="font-body font-medium text-[#2C2C2C]">
                Important Reminder
              </h3>
            </div>
            <p className="text-sm font-body text-[#7F8C8D]">
              Ensure your email is correct so you don't miss the approval notification.
            </p>
          </div>

          {/* Contact Support */}
          <div className="border border-border rounded-lg p-6">
            <h3 className="font-body font-medium text-[#2C2C2C] mb-3">
              Need Help?
            </h3>
            <p className="text-sm font-body text-[#7F8C8D] mb-4">
              You can contact support anytime:
            </p>
            <a 
              href="mailto:support@pccommunity.com"
              className="inline-flex items-center gap-2 text-[#2C3E94] hover:underline font-body"
            >
              <Mail className="h-4 w-4" />
              support@pccommunity.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApprovalWaiting;