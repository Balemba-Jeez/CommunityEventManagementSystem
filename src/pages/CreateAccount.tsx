import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { ProgressFlow } from "../components/ui/ProgressFlow";
import { FormField } from "../components/ui/FormField";
import { CheckboxGroup } from "../components/ui/CheckboxGroup";
import { TermsCheckbox } from "../components/ui/TermsCheckbox";
import { CTAButton } from "../components/ui/CTAButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // const steps = [
  //   { id: "create", title: "Create Account", isActive: true, isCompleted: false },
  //   { id: "verify-email", title: "Verify Email", isActive: false, isCompleted: false },
  //   { id: "verify-phone", title: "Verify Phone", isActive: false, isCompleted: false },
  //   { id: "done", title: "Done", isActive: false, isCompleted: false },
  // ];

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

    // Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const email = formData.email.trim();

      if (!email.includes("@")) {
        newErrors.email = "Email must contain '@'";
      } else {
        const [local, domain] = email.split("@");

        if (!local) {
          newErrors.email = "Email must have text before '@'";
        } else if (!domain) {
          newErrors.email = "Email must have a domain after '@'";
        } else if (!domain.includes(".")) {
          newErrors.email = "Email domain must contain a '.' (example.com)";
        } else if (domain.startsWith(".")) {
          newErrors.email = "Domain cannot start with '.'";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            newErrors.email = "Enter a valid email format (e.g. name@example.com)";
          }
        }
      }
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phone = formData.phone.trim();

      // Cameroon phone regex
      const cameroonPhoneRegex = /^(?:\+237|237)?(6[2-9]\d{7})$/;

      if (!/^\+?\d+$/.test(phone)) {
        newErrors.phone = "Phone number must contain only digits (and optional +)";
      } else if (!(phone.startsWith("6") || phone.startsWith("+237") || phone.startsWith("237"))) {
        newErrors.phone = "Phone number must start with 6 (or +237 / 237)";
      } else if (!cameroonPhoneRegex.test(phone)) {
        if (phone.length < 9) {
          newErrors.phone = "Phone number is too short (must be 9 digits)";
        } else if (phone.length > 12) {
          newErrors.phone = "Phone number is too long";
        } else {
          newErrors.phone = "Invalid Cameroon phone format";
        }
      }
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else {
      // enforce at least 1 uppercase, 1 lowercase, 1 digit
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must contain uppercase, lowercase, and a number";
      }
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms & Privacy
    if (!formData.termsAccepted) {
      newErrors.terms = "You must agree to the Terms and Privacy Policy";
    }

    return newErrors;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form submitted");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        // Build opt-ins object
        const optIns = {
          email: formData.emailNotifications,
          sms: formData.smsNotifications,
          whatsapp: formData.whatsappNotifications,
        };

        // Prepare payload
        const payload = {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          tel: formData.phone,
          opt_ins: optIns,
        };

        console.log("Sending payload:", payload);

        // Create user
        const response = await axios.post("http://localhost:3000/api/users", payload);

        console.log("API response:", response.data);

        const { userId:id } = response.data;

        // Save only safe info in localStorage
        const { email, phone, fullName } = formData;
        localStorage.setItem(
          "userSignupData",
          JSON.stringify({ email, phone, fullName, whatsapp: formData.whatsappNotifications, id })
        );
        console.log('localstorage set userinfo', localStorage.getItem("userSignupData"));

        // Request email verification code
        const verificationRes = await axios.post(
          "http://localhost:3000/api/users/new/email/request-verification",
          { email: formData.email }
        );

        if (verificationRes.status === 200) {
          console.log("Verification code requested successfully");
          // 4. Navigate only if verification succeeded
          navigate("/verify-email");
        } else {
          throw new Error("Failed to request email verification code");
        }


      } catch (error: any) {
        console.error("Registration failed:", error);
        setErrors({ api: "Failed to create account. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentStep={1}/>

      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
            Join Thousands of PC's
          </h2>
          <p className="text-lg font-inter text-[#7F8C8D]">
            in growing together with Community Events.
          </p>
        </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
            <div className="text-left pt-4">
              <p className="text-sm font-body text-secondary-gray">
                Already have a PC Community account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-medium"
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