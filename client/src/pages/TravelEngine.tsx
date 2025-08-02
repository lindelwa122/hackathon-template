import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Brain, TrendingUp, Clock, MapPin, AlertTriangle } from "lucide-react";

const TravelEngine = () => {
  const [timeSlider, setTimeSlider] = useState([12]); // Hour of day
  const [currentRisk, setCurrentRisk] = useState(0);

  const historicalData: any[] = [];
  const riskFactors: any[] = [];
  const predictions: any[] = [];

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { level: "Low", class: "risk-low" };
    if (risk < 60) return { level: "Medium", class: "risk-medium" };
    if (risk < 80) return { level: "High", class: "risk-high" };
    return { level: "Critical", class: "risk-critical" };
  };

  const handleTimeChange = (value: number[]) => {
    setTimeSlider(value);
    // Risk calculation will be handled by backend
    setCurrentRisk(0);
  };

  const formatTime = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${ampm}`;
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Brain className="text-primary" size={32} />
            Travel Risk Engine
          </h1>
          <p className="text-muted-foreground">
            AI-powered risk analysis and predictions for your travel routes
          </p>
        </div>

        {/* Current Risk Prediction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="text-primary" size={24} />
                Current Risk Assessment
              </CardTitle>
              <CardDescription>
                Real-time risk calculation for your location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    <span className={getRiskLevel(currentRisk).class}>{currentRisk}%</span>
                  </div>
                  <Badge className={getRiskLevel(currentRisk).class}>
                    {getRiskLevel(currentRisk).level} Risk
                  </Badge>
                </div>
                
                <div className="w-full bg-muted rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${getRiskLevel(currentRisk).class}`}
                    style={{ width: `${currentRisk}%` }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time of Day Simulation</label>
                  <Slider
                    value={timeSlider}
                    onValueChange={handleTimeChange}
                    max={23}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12:00 AM</span>
                    <span className="font-medium">{formatTime(timeSlider[0])}</span>
                    <span>11:00 PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Factors */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Factors</CardTitle>
              <CardDescription>
                Current conditions affecting your travel safety
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.length > 0 ? (
                  riskFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{factor.factor}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${factor.color}`}>{factor.impact}</span>
                          <span className="text-sm text-muted-foreground">{factor.value}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${factor.color.replace('text-', 'bg-')}`}
                          style={{ width: `${factor.value}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    <Brain size={32} className="mx-auto mb-2" />
                    <p>Risk factors will be calculated from your data</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Predictions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-primary" size={24} />
              Risk Predictions
            </CardTitle>
            <CardDescription>
              Forecasted risk levels for upcoming time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {predictions.length > 0 ? (
                predictions.map((prediction, index) => (
                  <div key={index} className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">{prediction.time}</div>
                    <div className={`text-2xl font-bold mb-1 ${getRiskLevel(prediction.risk).class}`}>
                      {prediction.risk}%
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-6 text-muted-foreground">
                  <Clock size={32} className="mx-auto mb-2" />
                  <p>Predictions will be generated from your travel data</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Historical Data */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Historical Risk Data
            </CardTitle>
            <CardDescription>
              Past 6 months of risk levels and incidents on your routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {historicalData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        `${value}${name === 'risk' ? '%' : ''}`,
                        name === 'risk' ? 'Risk Level' : 'Incidents'
                      ]}
                    />
                    <Bar dataKey="risk" fill="hsl(var(--primary))" name="risk" />
                    <Bar dataKey="incidents" fill="hsl(var(--accent))" name="incidents" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-4" />
                    <p>Historical data will be displayed as you travel</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
            <CardDescription>
              Suggestions based on current risk analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <MapPin className="text-primary mb-2" size={20} />
                <div className="text-left">
                  <div className="font-semibold">Find Alternative Route</div>
                  <div className="text-sm text-muted-foreground">
                    Discover safer paths to your destination
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                <Clock className="text-accent mb-2" size={20} />
                <div className="text-left">
                  <div className="font-semibold">Adjust Travel Time</div>
                  <div className="text-sm text-muted-foreground">
                    Travel during lower-risk periods
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TravelEngine;