import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RoleList } from "../components/ui/RoleList";
import { type Role } from "../components/ui//RoleCard";
import { User, Building, Users, Crown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ArrowLeft } from "lucide-react";
import { ProgressFlow } from "@/components/auth/ProgressFlow";

const SelectRole = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock user roles - in real app, this would come from the authenticated user's data
  const userRoles: Role[] = [
    {
      id: "individual",
      name: "Individual Member",
      icon: <User className="w-6 h-6 text-royal-blue" />
    },
    {
      id: "organization",
      name: "Organization Representative",
      icon: <Building className="w-6 h-6 text-royal-blue" />
    },
    {
      id: "community-leader",
      name: "Community Leader",
      icon: <Users className="w-6 h-6 text-royal-blue" />
    },
    {
      id: "admin",
      name: "PC Community Admin",
      icon: <Crown className="w-6 h-6 text-royal-blue" />
    }
  ];

  const handleRoleSelect = (role: Role) => {
    setLoading(true);
    
    // Simulate saving role selection
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-pure-white border-b border-border px-6 py-4">
        <div className="max-w-6xl flex flex-col justify-center pr-[25px]">
            <div className=" flex flex-row justify-between">
                {/* Logo */}
                <Logo />
                

                {/* Progress Flow */}
                <div className="hidden md:flex ">
                    <ProgressFlow currentStep={2} />
                </div>

            </div>

        </div>

      </header>
        {/* Cancel Button */}
        <Link
            to="/login"
            className="p-2 mt-2 ml-4 flex flex-col h-10 w-36 sm:flex-row gap-1 hover:bg-muted rounded-lg transition-colors text-[#7F8C8D] hover:text-foreground font-['Poppins', sans-serif] text-sm"
        >
            <ArrowLeft className="mr-1 h-5 w-5" />
            Back to Login
        </Link>

      <main className="py-12 px-6">
        <div className="max-w-md mx-auto">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-semibold text-charcoal mb-2">
              Select Your Role
            </h1>
            <p className="text-secondary-gray font-body">
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