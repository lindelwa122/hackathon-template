import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, MapPin } from "lucide-react";

const Alerts = () => {
  const alerts: any[] = [];

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-l-risk-critical bg-red-50";
      case "serious":
        return "border-l-destructive bg-orange-50";
      case "moderate":
        return "border-l-risk-medium bg-yellow-50";
      case "info":
        return "border-l-primary bg-blue-50";
      default:
        return "border-l-muted";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="risk-critical">Critical</Badge>;
      case "serious":
        return <Badge className="bg-destructive text-destructive-foreground">Serious</Badge>;
      case "moderate":
        return <Badge className="risk-medium">Moderate</Badge>;
      case "info":
        return <Badge className="bg-primary text-primary-foreground">Info</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Travel Alerts</h1>
          <p className="text-muted-foreground">
            Real-time notifications about conditions affecting your routes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-risk-critical">0</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">0</div>
                <div className="text-sm text-muted-foreground">Serious</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-risk-medium">0</div>
                <div className="text-sm text-muted-foreground">Moderate</div>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">0</div>
                <div className="text-sm text-muted-foreground">Info</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card 
                key={alert.id} 
                className={`glass-card border-l-4 ${getSeverityClass(alert.severity)} hover:shadow-lg transition-shadow`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon 
                        size={24} 
                        className={`${
                          alert.severity === 'critical' ? 'text-risk-critical' :
                          alert.severity === 'serious' ? 'text-destructive' :
                          alert.severity === 'moderate' ? 'text-risk-medium' :
                          'text-primary'
                        }`} 
                      />
                      <div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{alert.location}</span>
                        </div>
                      </div>
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-3">{alert.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>{alert.timestamp}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state (hidden when alerts exist) */}
        {alerts.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-12 text-center">
              <AlertTriangle size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
              <p className="text-muted-foreground">
                You're all clear! We'll notify you when there are any travel risks in your area.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Alerts;