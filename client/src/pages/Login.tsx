import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sendDataToServer from "../utils/send-data-to-server";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    id: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app would validate credentials
    await sendDataToServer('/auth/login', formData);

    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* App branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">AAA</h1>
          <p className="text-muted-foreground">Anticipate • Adapt • Alert</p>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your travel risk dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="id">User ID</Label>
                <Input
                  id="id"
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Enter your ID (try: 12345)"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full pulse-glow"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 space-y-3 text-center">
              <div className="text-sm text-muted-foreground">
                <a href="#" className="text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <a href="#" className="text-accent hover:underline">
                  Register here
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;