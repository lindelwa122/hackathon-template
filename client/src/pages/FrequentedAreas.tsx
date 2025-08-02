import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Home, Building, Heart } from "lucide-react";

const FrequentedAreas = () => {
  const [step, setStep] = useState(1);
  const [locations, setLocations] = useState({
    home: { address: "", time: "" },
    work: { address: "", time: "" },
    other: { address: "", name: "", time: "" }
  });

  const handleLocationChange = (type: keyof typeof locations, field: string, value: string) => {
    setLocations(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    // Save to localStorage or handle completion
    localStorage.setItem('frequentedAreas', JSON.stringify(locations));
    setStep(4); // Show summary
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="text-primary" size={24} />
                Home Location
              </CardTitle>
              <CardDescription>
                Tell us about your home address and typical departure times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home-address">Home Address</Label>
                <Input
                  id="home-address"
                  placeholder="Enter your home address"
                  value={locations.home.address}
                  onChange={(e) => handleLocationChange('home', 'address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="home-time">Usual Departure Time</Label>
                <Input
                  id="home-time"
                  type="time"
                  value={locations.home.time}
                  onChange={(e) => handleLocationChange('home', 'time', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="text-primary" size={24} />
                Work Location
              </CardTitle>
              <CardDescription>
                Your workplace details and typical travel times
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="work-address">Work Address</Label>
                <Input
                  id="work-address"
                  placeholder="Enter your work address"
                  value={locations.work.address}
                  onChange={(e) => handleLocationChange('work', 'address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-time">Usual Departure Time (to work)</Label>
                <Input
                  id="work-time"
                  type="time"
                  value={locations.work.time}
                  onChange={(e) => handleLocationChange('work', 'time', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="text-primary" size={24} />
                Favorite Place
              </CardTitle>
              <CardDescription>
                A third location you visit frequently (gym, store, family, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="other-name">Place Name</Label>
                <Input
                  id="other-name"
                  placeholder="e.g., Gym, Mall, Family Home"
                  value={locations.other.name}
                  onChange={(e) => handleLocationChange('other', 'name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-address">Address</Label>
                <Input
                  id="other-address"
                  placeholder="Enter the address"
                  value={locations.other.address}
                  onChange={(e) => handleLocationChange('other', 'address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-time">Usual Visit Time</Label>
                <Input
                  id="other-time"
                  type="time"
                  value={locations.other.time}
                  onChange={(e) => handleLocationChange('other', 'time', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-primary" size={24} />
                Setup Complete!
              </CardTitle>
              <CardDescription>
                Here's a summary of your frequented areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Home Summary */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Home className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold">Home</h3>
                    <p className="text-sm text-muted-foreground">{locations.home.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Usual departure: {locations.home.time || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Work Summary */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Building className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold">Work</h3>
                    <p className="text-sm text-muted-foreground">{locations.work.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Usual departure: {locations.work.time || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Other Summary */}
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Heart className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold">{locations.other.name || 'Favorite Place'}</h3>
                    <p className="text-sm text-muted-foreground">{locations.other.address}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Usual visit time: {locations.other.time || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Your locations have been saved. We'll use this information to provide 
                    personalized travel risk alerts and route recommendations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Frequented Areas Setup</h1>
          <p className="text-muted-foreground">
            Help us understand your travel patterns to provide better risk assessments
          </p>
        </div>

        {/* Progress Indicator */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum <= step 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div 
                      className={`w-12 h-1 mx-2 ${
                        stepNum < step ? 'bg-primary' : 'bg-muted'
                      }`} 
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <span className="text-sm text-muted-foreground">
                Step {step} of 3: {
                  step === 1 ? 'Home Location' :
                  step === 2 ? 'Work Location' :
                  'Favorite Place'
                }
              </span>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {renderStep()}

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button 
                onClick={step === 3 ? handleFinish : handleNext}
                className="pulse-glow"
              >
                {step === 3 ? 'Finish Setup' : 'Next'}
              </Button>
            </div>
          )}

          {/* Complete State Button */}
          {step === 4 && (
            <div className="text-center mt-6">
              <Button 
                onClick={() => setStep(1)}
                variant="outline"
              >
                Edit Locations
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FrequentedAreas;
