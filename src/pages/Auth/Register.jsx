import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authUrl } from "@/config/config";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    address: "",
    pinCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(authUrl.register, formData);

      if (response?.data?.success) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.log("Register error :: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm px-8 py-3 rounded-4xl md:w-xl w-xs">
      <div className="my-4">
        <div className="flex justify-center items-center p-2">Logo</div>
        <p className="text-3xl font-bold text-[#7C2EEA]">Register</p>
      </div>
      <form onSubmit={handleRegister} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userName">Name : </Label>
          <Input
            id="userName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>
        <div className=" grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email : </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone No. : </Label>
            <Input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address : </Label>
          <Textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={4}
            placeholder="Enter your address"
          />
        </div>
        <div className=" space-y-2">
          <Label htmlFor="pinCode">Pin Code : </Label>
          <Input
            id="pinCode"
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={(e) => {
              const value = e.target.value;
              // Allow only positive integers (no leading zeroes unless zero itself)
              if (/^([1-9][0-9]*|0)?$/.test(value)) {
                handleChange(e);
              }
            }}
            pattern="^[1-9][0-9]*$"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter pin code"
          />
        </div>
        <div className=" grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password : </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 focus:outline-none cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password : </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Retype your password"
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 focus:outline-none cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="custom"
          type="submit"
          className="w-full "
          disabled={loading}
        >
          {loading ? <Loader2 className=" animate-spin" /> : "Create Account"}
        </Button>
      </form>
      <div className="text-center my-2">
        <p>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-[#7C2EEA] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;