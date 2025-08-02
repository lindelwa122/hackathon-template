import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Car, AlertTriangle, Award, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
    
    // Risk score will be set by backend
    setRiskScore(0);
  }, []);

  const frequentedPlaces: any[] = [];
  const pastRoutes: any[] = [];

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "low": return "risk-low";
      case "medium": return "risk-medium";
      case "high": return "risk-high";
      default: return "bg-muted";
    }
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=parking+near+me', '_blank');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {userInfo?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground">Here's your travel risk overview</p>
          </div>
          <div className="flex gap-2">
            <Award className="text-accent" size={24} />
            <span className="text-sm text-muted-foreground">0 badges earned</span>
          </div>
        </div>

        {/* Risk Score & Current Warning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Travel Risk Score */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="text-primary" size={24} />
                Travel Risk Score
              </CardTitle>
              <CardDescription>
                Based on your recent travel patterns and current conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{riskScore}%</span>
                  <span className="text-sm text-muted-foreground">Safe</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="risk-meter-fill h-3 rounded-full bg-primary transition-all duration-1000"
                    style={{ '--fill-width': `${riskScore}%` } as any}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Discount eligibility will be calculated based on your data
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Current Warning */}
          <Card className="glass-card border-l-4 border-l-muted">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle size={24} />
                Current Warnings
              </CardTitle>
              <CardDescription>No active alerts for your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  All clear! No warnings currently affecting your routes.
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openGoogleMaps}
                    className="flex items-center gap-1"
                  >
                    <MapPin size={16} />
                    Nearby Parking
                    <ExternalLink size={12} />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Navigation size={16} />
                    Safer Route
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Frequented Places & Past Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Frequented Places */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-primary" size={24} />
                Frequented Places
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {frequentedPlaces.length > 0 ? (
                  frequentedPlaces.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold">{place.name}</p>
                        <p className="text-sm text-muted-foreground">{place.address}</p>
                        <p className="text-xs text-muted-foreground">{place.visits} visits</p>
                      </div>
                      <Badge className={getRiskBadgeClass(place.risk)}>
                        {place.risk}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p>No frequented places configured yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Past Routes */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="text-primary" size={24} />
                Recent Routes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastRoutes.length > 0 ? (
                  pastRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-semibold">{route.route}</p>
                        <p className="text-sm text-muted-foreground">{route.date} at {route.time}</p>
                      </div>
                      <Badge className={getRiskBadgeClass(route.risk)}>
                        {route.risk}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    <Navigation size={32} className="mx-auto mb-2" />
                    <p>No recent routes available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Map */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-primary" size={24} />
              Live Location Map
            </CardTitle>
            <CardDescription>
              Current location and nearby risk factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.8!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuMiJX!5e0!3m2!1sen!2sus!4v1000000000000!5m2!1sen!2sus"
                width="100%" 
                height="300" 
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <Button 
                variant="outline"
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=current+location', '_blank')}
                className="w-full"
              >
                <ExternalLink size={16} className="mr-2" />
                Open in Google Maps
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;