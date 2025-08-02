import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [phase, setPhase] = useState(0); // 0: flash, 1: spread, 2: reveal
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 800); // Flash duration
    const timer2 = setTimeout(() => setPhase(2), 1800); // Spread duration
    const timer3 = setTimeout(() => navigate('/login'), 4000); // Navigate delay

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="text-center">
        {/* Main AAA Letters */}
        <div className="mb-8">
          <h1 
            className={`text-8xl font-bold text-primary transition-all duration-1000 ${
              phase === 0 ? "aaa-flash" : ""
            } ${
              phase >= 1 ? "aaa-spread" : ""
            }`}
          >
            AAA
          </h1>
        </div>

        {/* Revealed phrase */}
        {phase >= 2 && (
          <div className="fade-in-up">
            <div className="text-2xl text-muted-foreground mb-2">
              <span className="text-accent font-semibold">Anticipate</span>
              <span className="mx-4">•</span>
              <span className="text-primary font-semibold">Adapt</span>
              <span className="mx-4">•</span>
              <span className="text-destructive font-semibold">Alert</span>
            </div>
            <p className="text-lg text-muted-foreground">
              Your Travel Risk Awareness Companion
            </p>
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 sticky-note opacity-30 rounded-lg"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-note-blue opacity-40 rounded-full blur-xl"></div>
      <div className="absolute top-1/3 right-20 w-28 h-28 bg-note-pink opacity-30 rounded-lg transform rotate-12"></div>
    </div>
  );
};

export default Landing;