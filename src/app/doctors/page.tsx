"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import doctors from "@/data/doctors.json";
import users from "@/data/users.json";

const DoctorPortal = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [doctorData, setDoctorData] = useState<any>(null);
  const [pendingReports, setPendingReports] = useState<any[]>([]);

  const handleLogin = () => {
    const doctor = doctors.doctors.find(
      (d) => d.username === username && d.password === password
    );

    if (doctor) {
      setIsLoggedIn(true);
      setDoctorData(doctor);
      // In a real app, fetch pending reports from backend
      setPendingReports([]);
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

  const handleApproveReport = (reportId: string) => {
    // In a real app, update report status in backend
    setPendingReports((prev) =>
      prev.filter((report) => report.id !== reportId)
    );
    toast({
      title: "Success",
      description: "Report approved successfully",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <Card className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Doctor Login</h1>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Doctor Portal</h1>
          <p className="text-gray-600">Welcome, {doctorData.name}</p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Pending Reports</h2>
            {pendingReports.length > 0 ? (
              <div className="space-y-4">
                {pendingReports.map((report) => (
                  <Card key={report.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{report.patientName}</h3>
                        <p className="text-sm text-gray-600">
                          Disease: {report.disease}
                        </p>
                        <p className="text-sm text-gray-600">
                          Severity: {report.severity}%
                        </p>
                        <p className="mt-2">{report.diagnosis}</p>
                      </div>
                      <Button
                        onClick={() => handleApproveReport(report.id)}
                        className="ml-4"
                      >
                        Approve
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No pending reports</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DoctorPortal;