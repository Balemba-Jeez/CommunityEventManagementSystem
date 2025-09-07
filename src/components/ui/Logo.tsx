import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-bold">
          PC
        </div>
        <div>
          <h1 className="font-poppins font-bold text-xl text-primary">
            PC Community
          </h1>
          <p className="text-sm text-muted-foreground -mt-1">Events</p>
        </div>
      </div>
    </Link>
  );
}
