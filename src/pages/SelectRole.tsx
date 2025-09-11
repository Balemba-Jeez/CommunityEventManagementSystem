import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RoleList } from "../components/ui/RoleList";
import { type Role } from "../components/ui//RoleCard";
// import { User, Building, Users, Crown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";
import { ProgressFlow } from "@/components/auth/ProgressFlow";
import { useToast } from "../hooks/use-toast";
import axios from "axios";
import { User, Users, Building2, ShieldCheck, Crown } from "lucide-react";

const roleIcons: Record<string, JSX.Element> = {
  visitor: <User className="w-6 h-6 text-royal-blue" aria-label="Visitor" />,
  member: <Users className="w-6 h-6 text-royal-blue" aria-label="Member" />,
  zone_event_manager: <Building2 className="w-6 h-6 text-royal-blue" aria-label="Zone Event Manager" />,
  general_event_manager: <ShieldCheck className="w-6 h-6 text-royal-blue" aria-label="General Event Manager" />,
  admin: <Crown className="w-6 h-6 text-royal-blue" aria-label="Admin" />,
};


// const roleIcons: Record<string, JSX.Element> = {
//   visitor: <User className="w-6 h-6 text-royal-blue" />,
//   member: <Users className="w-6 h-6 text-royal-blue" />,
//   zone_event_manager: <Building className="w-6 h-6 text-royal-blue" />,
//   general_event_manager: <Users className="w-6 h-6 text-royal-blue" />,
//   admin: <Crown className="w-6 h-6 text-royal-blue" />,
// };

const SelectRole = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState<Role[]>([]);


// Load roles from localStorage
  useEffect(() => {
    const storedRoles = localStorage.getItem("roles");
    if (storedRoles) {
      try {
        const parsed = JSON.parse(storedRoles);

        // Map plain role names into Role objects for RoleList
        const formatted: Role[] = parsed.map((roleName: string) => ({
          id: roleName,
          name: roleName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), // e.g. "community-leader" → "Community Leader"
          icon: roleIcons[roleName] || <User className="w-6 h-6 text-royal-blue" />,
        }));

        setUserRoles(formatted);
      } catch (err) {
        console.error("Failed to parse roles:", err);
      }
    } else {
      // If no roles found, redirect back to login
      navigate("/login");
    }
  }, [navigate]);

const handleRoleSelect = async (role: Role) => {
  setLoading(true);

  try {
    const tempToken = localStorage.getItem("tempToken");
    if (!tempToken) throw new Error("No session found");

    const response = await axios.post("http://localhost:3000/api/login/confirm-role", {
      role: role.id,  // or role.name depending on backend
      tempToken,
    });

    const { token, user } = response.data;

    // Save final login token & user info
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    toast({
      title: "Login successful!",
      description: `Welcome, ${user.email}`,
    });

    navigate("/dashboard");

  } catch (error: any) {
    toast({
      title: "Role confirmation failed",
      description: error.response?.data?.message || "Please try again",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background border-b border-border px-6 py-4">
        <div className="max-w-6xl flex flex-col justify-center">
            <div className=" flex flex-row justify-between">
                {/* Logo */}
                <Logo />
                

            <div className="mr-[300px] mt-2">
                {/* Progress Flow */}
                <div className="hidden md:flex ">
                    <ProgressFlow currentStep={2} />
                </div>
            </div>

            </div>

        </div>

      </header>
        {/* Cancel Button */}
        <Link
            to="/login"
            className="sticky top-[80px] z-10 bg-background p-2 mt-2 ml-4 flex flex-col h-10 w-36 sm:flex-row gap-1 hover:bg-muted rounded-lg transition-colors text-[#7F8C8D] hover:text-foreground font-['Poppins', sans-serif] text-sm"
        >
            <ArrowLeft className="mr-1 h-5 w-5" />
            Back to Login
        </Link>

      <main className="py-6 px-6">
        <div className="max-w-md mx-auto">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font font-semibold text-foreground mb-2">
              Select Your Role
            </h1>
            <p className="text-[#7F8C8D] font-body">
              Choose how you'd like to participate in the PC Community
            </p>
          </div>

          {/* Role Selection */}
          <RoleList
            roles={userRoles}
            onSelectRole={handleRoleSelect}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default SelectRole;