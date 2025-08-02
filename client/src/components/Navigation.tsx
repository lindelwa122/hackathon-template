import { Link, useLocation } from "react-router-dom";
import { Home, AlertTriangle, Award, Map, Settings, MapPin } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/alerts", icon: AlertTriangle, label: "Alerts" },
    { path: "/badges", icon: Award, label: "Badges" },
    { path: "/travel-engine", icon: Map, label: "Travel Engine" },
    { path: "/frequented-areas", icon: MapPin, label: "Areas" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="bg-card border-r border-border h-full w-64 p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="text-2xl font-bold text-primary">AAA</div>
        <div className="text-sm text-muted-foreground">Travel Risk</div>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;