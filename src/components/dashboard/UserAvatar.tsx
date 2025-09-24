import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = () => {
  const { loginUser } = useAuth();

  // Shades/tints around your primary #2C3E94
  const avatarColors = [
    { bg: "bg-[#2C3E94]", ring: "hover:ring-[#1F2A66]" }, // primary + darker ring
    { bg: "bg-[#3E4EA8]", ring: "hover:ring-[#2C3E94]" }, // slightly lighter + primary ring
    { bg: "bg-[#1F2A66]", ring: "hover:ring-[#121940]" }, // darker + even darker ring
    { bg: "bg-[#4F5FBF]", ring: "hover:ring-[#2C3E94]" }, // lighter shade + primary ring
    { bg: "bg-[#121940]", ring: "hover:ring-[#2C3E94]" }, // very dark + primary ring
  ];

  const getColorsForName = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
  };

  const initials = loginUser?.name
    ? loginUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  const { bg, ring } = loginUser?.name
    ? getColorsForName(loginUser.name)
    : { bg: "bg-primary", ring: "hover:ring-[#2C3E94]" };

  return (
    <Avatar className={`cursor-pointer transition-all ${ring} hover:ring-2`}>
      <AvatarImage
        src={loginUser?.profile_image || "/api/placeholder/32/32"}
        alt="Profile"
      />
      <AvatarFallback className={`${bg} text-white font-semibold`}>
        {initials || "FA"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
