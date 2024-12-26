"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import users from "@/data/users.json";

const Profile = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<any>(null);

  const handleLogin = () => {
    const user = users.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <Card className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">User Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <p className="text-gray-700">{userData.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p className="text-gray-700">{userData.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact</label>
            <p className="text-gray-700">{userData.contact}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <p className="text-gray-700">{userData.location}</p>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Medical Reports</h2>
            {userData.reports.length > 0 ? (
              <div className="space-y-4">
                {userData.reports.map((report: any, index: number) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-medium">{report.disease}</h3>
                    <p className="text-sm text-gray-600">
                      Severity: {report.severity}%
                    </p>
                    <p className="text-sm text-gray-600">
                      Approved by: {report.doctor}
                    </p>
                    <p className="mt-2">{report.diagnosis}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reports available</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;