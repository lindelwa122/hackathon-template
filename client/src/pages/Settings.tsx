import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, User, Bell, Shield, LogOut } from "lucide-react";

const Settings = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('frequentedAreas');
    window.location.href = '/login';
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <SettingsIcon className="text-primary" size={32} />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and app settings
          </p>
        </div>

        {/* User Profile */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="text-primary" size={24} />
              User Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-foreground">{userInfo.name || 'User'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-foreground">{userInfo.email || 'user@email.com'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">User ID</Label>
                <p className="text-foreground">{userInfo.id || 'N/A'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Member Since</Label>
                <p className="text-foreground">January 2024</p>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="text-primary" size={24} />
              Notification Preferences
            </CardTitle>
            <CardDescription>Configure how you receive alerts and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Risk Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about travel risks</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Weather Updates</Label>
                <p className="text-sm text-muted-foreground">Get weather-related travel warnings</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Route Suggestions</Label>
                <p className="text-sm text-muted-foreground">Receive alternative route recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Badge Achievements</Label>
                <p className="text-sm text-muted-foreground">Notifications when you earn new badges</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="text-primary" size={24} />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Location Tracking</Label>
                <p className="text-sm text-muted-foreground">Allow location tracking for better risk assessment</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Data Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve our service with anonymous usage data</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Third-party Integration</Label>
                <p className="text-sm text-muted-foreground">Allow integration with external services</p>
              </div>
              <Switch />
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-refresh Dashboard</Label>
                <p className="text-sm text-muted-foreground">Automatically update risk data every 5 minutes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Compact View</Label>
                <p className="text-sm text-muted-foreground">Show more information in less space</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Animation Effects</Label>
                <p className="text-sm text-muted-foreground">Enable smooth animations and transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Export My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Delete Account
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;