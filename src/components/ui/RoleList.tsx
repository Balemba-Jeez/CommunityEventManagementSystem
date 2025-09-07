import { useState } from "react";
import { RoleCard, type Role } from "@/components/ui/RoleCard";
import { CTAButton } from "@/components/ui/CTAButton";

interface RoleListProps {
  roles: Role[];
  onSelectRole: (role: Role) => void;
  loading?: boolean;
}

export const RoleList = ({ roles, onSelectRole, loading }: RoleListProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role.id);
  };

  const handleContinue = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      onSelectRole(role);
    }
  };

  return (
    <div className="space-y-6">
      {/* Role Cards */}
      <div className="space-y-3">
        {roles.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            selected={selectedRole === role.id}
            onClick={() => handleRoleSelect(role)}
          />
        ))}
      </div>

      {/* Continue Button */}
      <CTAButton
        size="lg"
        className="w-full"
        disabled={!selectedRole}
        loading={loading}
        onClick={handleContinue}
      >
        Continue
      </CTAButton>
    </div>
  );
};