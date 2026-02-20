import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");

    try {
      await api.post("/auth/register", formData);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100">
      <Card className="w-[400px]">
        <CardHeader><CardTitle>Register</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>
          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input type="password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleRegister} className="w-full">Create Account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}