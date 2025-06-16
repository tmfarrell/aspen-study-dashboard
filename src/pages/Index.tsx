
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to cohort
        navigate("/cohort", { replace: true });
      } else {
        // User is not authenticated, redirect to auth page
        navigate("/auth", { replace: true });
      }
    }
  }, [navigate, user, loading]);

  // Show a loading state while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003f7f] mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold text-[#003f7f] mb-2">Aspen Study Dashboard</h1>
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
