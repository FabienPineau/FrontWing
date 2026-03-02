import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Default from "../layouts/Default";

const labelClass = "block text-sm font-medium mb-1";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "u",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/api/v2/shop/customers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            gender: formData.gender,
            password: formData.password,
            subscribedToNewsletter: false,
          }),
        }
      );

      if (!response.ok) {
        const errData: { "hydra:description"?: string; message?: string } = await response.json();
        throw new Error(errData["hydra:description"] ?? errData.message ?? "Registration failed");
      }

      toast.success("Account created! You can now log in.");
      navigate("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Default>
      <div className="container my-auto">
        <div className="mx-auto my-8 w-full max-w-lg">
          <h1 className="mb-5 text-2xl font-bold">Create an account</h1>
          <form onSubmit={handleSubmit} noValidate>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="-mx-3 flex flex-wrap">
              <div className="mb-3 w-full px-3 md:w-1/2">
                <label htmlFor="firstName" className={labelClass}>
                  First name *
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3 w-full px-3 md:w-1/2">
                <label htmlFor="lastName" className={labelClass}>
                  Last name *
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3 w-full px-3 md:w-1/2">
                <label className={labelClass}>Gender *</label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => v && handleGenderChange(v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">Male</SelectItem>
                    <SelectItem value="f">Female</SelectItem>
                    <SelectItem value="u">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-3 w-full px-3 md:w-1/2">
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3 w-full px-3 md:w-1/2">
                <label htmlFor="password" className={labelClass}>
                  Password *
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-5 w-full px-3 md:w-1/2">
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password *
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="submit" className="mb-3 w-full" disabled={loading}>
              Create account
            </Button>

            <p className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Default>
  );
};

export default RegisterPage;
