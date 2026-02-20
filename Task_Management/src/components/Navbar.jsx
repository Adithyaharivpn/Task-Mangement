import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/dashboard" className="text-xl font-bold tracking-tight">
          TaskMaster
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
            Tasks
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}