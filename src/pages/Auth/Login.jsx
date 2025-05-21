import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authUrl } from "@/config/config";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(authUrl.login, formData);

      if (response?.data?.success) {
        localStorage.setItem("token", response.data.data.authToken);
        localStorage.setItem("userId", JSON.stringify(response.data.data.userId));
        navigate("/");
      }
    } catch (error) {
      console.log("Login error :: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm px-8 py-3 rounded-4xl md:w-xl w-xs">
      <div className="my-4">
        <div className="flex justify-center items-center p-2">Logo</div>
        <p className="text-3xl font-bold text-[#7C2EEA]">Login</p>
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
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
        <Button
          variant="custom"
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? <Loader2 className=" animate-spin" /> : "Login"}
        </Button>
      </form>
      <div className="text-center my-2">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#7C2EEA] font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;