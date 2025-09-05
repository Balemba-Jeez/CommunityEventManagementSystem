import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { ProgressFlow } from "../components/ui/ProgressFlow";
import { FormField } from "../components/ui/FormField";
import { CheckboxGroup } from "../components/ui/CheckboxGroup";
import { TermsCheckbox } from "../components/ui/TermsCheckbox";
import { CTAButton } from "../components/ui/CTAButton";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    emailNotifications: false,
    smsNotifications: false,
    whatsappNotifications: false,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: "create", title: "Create Account", isActive: true, isCompleted: false },
    { id: "verify-email", title: "Verify Email", isActive: false, isCompleted: false },
    { id: "verify-phone", title: "Verify Phone", isActive: false, isCompleted: false },
    { id: "done", title: "Done", isActive: false, isCompleted: false },
  ];

  const notificationOptions = [
    {
      id: "email",
      label: "Please keep me updated by Email with the latest news, research findings, reward programs, event updates.",
      checked: formData.emailNotifications,
      onChange: (checked: boolean) =>
        setFormData((prev) => ({ ...prev, emailNotifications: checked })),
    },
    {
      id: "sms",
      label: "Please keep me updated by SMS with the latest news, research findings, reward programs, event updates.",
      checked: formData.smsNotifications,
      onChange: (checked: boolean) =>
        setFormData((prev) => ({ ...prev, smsNotifications: checked })),
    },
    {
      id: "whatsapp",
      label: "Please keep me updated by WhatsApp with the latest news, research findings, reward programs, event updates.",
      checked: formData.whatsappNotifications,
      onChange: (checked: boolean) =>
        setFormData((prev) => ({ ...prev, whatsappNotifications: checked })),
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    if (!formData.termsAccepted) {
      newErrors.terms = "You must agree to the Terms and Privacy Policy";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to email verification step
        console.log("Account creation submitted:", formData);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressFlow steps={steps} />
      
      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Hero Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-semibold text-charcoal leading-tight">
              Join Thousands of PC's in growing together with Community Events.
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              error={errors.fullName}
            />

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
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              error={errors.phone}
              required
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

            <FormField
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }
              error={errors.confirmPassword}
            />

            {/* Notification Preferences */}
            <CheckboxGroup
              options={notificationOptions}
              className="py-2"
            />

            {/* Terms & Privacy */}
            <TermsCheckbox
              id="terms"
              checked={formData.termsAccepted}
              onChange={(checked) =>
                setFormData((prev) => ({ ...prev, termsAccepted: checked }))
              }
              error={errors.terms}
            />

            {/* Submit Button */}
            <CTAButton
              type="submit"
              size="lg"
              className="w-full"
              loading={loading}
            >
              Create Account
            </CTAButton>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-sm font-body text-secondary-gray">
                Already have a PC Community account?{" "}
                <Link
                  to="/signin"
                  className="text-royal-blue hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateAccount;