
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Use replace instead of navigate to avoid adding to history
    navigate("/cohort", { replace: true });
  }, [navigate]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003f7f] mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold text-[#003f7f] mb-2">Aspen Study Dashboard</h1>
        <p className="text-lg text-muted-foreground">Loading patient cohort data...</p>
      </div>
    </div>
  );
};

export default Index;
