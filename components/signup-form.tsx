"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "@/redux/services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface ValidationState {
  name: "default" | "valid" | "warning" | "error";
  email: "default" | "valid" | "warning" | "error";
  password: "default" | "valid" | "warning" | "error";
  confirmPassword: "default" | "valid" | "warning" | "error";
}

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
  isValid: boolean;
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});

  console.log(errors);

  const [validation, setValidation] = useState<ValidationState>({
    name: "default",
    email: "default",
    password: "default",
    confirmPassword: "default",
  });

  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
      isValid: false,
    });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validateField = (name: keyof FormErrors, value: string) => {
    const newErrors = { ...errors };

    // Name
    if (name === "name") {
      if (!value.trim()) newErrors.name = "Name is required";
      else delete newErrors.name;
    }

    // Email
    if (name === "email") {
      if (!value.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value))
        newErrors.email = "Invalid email format";
      else delete newErrors.email;
    }

    // Password
    if (name === "password") {
      const length = value.length >= 8;
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);
      const number = /[0-9]/.test(value);
      const specialChar = /[@$!%*?&]/.test(value);

      setPasswordValidation({
        length,
        uppercase,
        lowercase,
        number,
        specialChar,
        isValid: length && uppercase && lowercase && number && specialChar,
      });

      if (!length)
        newErrors.password = "Password must be at least 8 characters";
      else if (!uppercase)
        newErrors.password = "Include at least 1 uppercase letter";
      else if (!lowercase)
        newErrors.password = "Include at least 1 lowercase letter";
      else if (!number) newErrors.password = "Include at least 1 number";
      else if (!specialChar)
        newErrors.password = "Include at least 1 special character (@$!%*?&)";
      else delete newErrors.password;

      // Confirm password also check
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    // Confirm password
    if (name === "confirmPassword") {
      if (value !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log(errors);

  const [register, { isLoading }] = useRegisterMutation();

  //real time validation effect
  useEffect(() => {
    const newValidation: ValidationState = { ...validation };

    //update validation state based on backend
    Object.keys(errors).forEach((field) => {
      if (newValidation.hasOwnProperty(field)) {
        newValidation[field as keyof ValidationState] = "error";
      }
    });

    Object.keys(formData).forEach((field) => {
      const key = field as keyof typeof formData;
      const value = formData[key];

      if (!errors[key] && value) {
        newValidation[key] = "valid";
      } else if (!errors[key] && !value && touched[key]) {
        newValidation[key] = "warning";
      }
    });

    // Only update if validation actually changed
    setValidation((prev) => {
      const hasChanged = JSON.stringify(prev) !== JSON.stringify(newValidation);
      return hasChanged ? newValidation : prev;
    });
  }, [errors, formData, touched, validation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const getInputStyle = (field: keyof FormErrors) => {
    if (errors[field]) {
      return "placeholder-red-500 border-red-500"; // backend / mismatch error
    }

    // yellow for live validation warning
    if (field === "password" && formData.password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password))
        return "placeholder-yellow-500 border-yellow-500";
    }

    if (
      field === "email" &&
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      return "placeholder-yellow-500 border-yellow-500";
    }

    return "border-gray-300"; // normal state
  };

  const getPlaceholder = (field: keyof FormErrors, defaultText: string) => {
    if (errors[field]) return errors[field] as string; // show error as placeholder
    return defaultText;
  };

  const getFieldDescription = (field: keyof FormErrors) => {
    if (errors[field]) {
      return (
        <FieldDescription className="text-red-500 text-sm">
          ⚠️ {errors[field]}
        </FieldDescription>
      );
    }

    if (validation[field] === "valid") {
      return (
        <FieldDescription className="text-green-600 text-sm">
          ✓ Looks good
        </FieldDescription>
      );
    }

    return null;
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      console.log("API RESPONSE:", res);

      if (res.success && res.user) {
        dispatch(setUser(res.user));
        toast.success("Successful!");
        router.push("/");
      }
    } catch (error: any) {
      console.log("API ERROR:", error.data);
      // if backend returns filed-level errors
      if (error?.data?.errors) {
        setErrors(error?.data?.errors);
      } else if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegisterSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder={getPlaceholder("name", "Full name")}
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyle("name")}
                />
                {/* {errors?.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )} */}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={getPlaceholder("email", "m@example.com")}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyle("email")}
                />
                {/* {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )} */}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder={getPlaceholder("password", "********")}
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputStyle("password")}
                    />
                    {/* {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )} */}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      name="confirmPassword"
                      placeholder={getPlaceholder(
                        "confirmPassword",
                        "********"
                      )}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputStyle("confirmPassword")}
                    />
                    {/* {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )} */}
                  </Field>
                </Field>
                <FieldDescription
                  className={
                    errors.password
                      ? "text-red-500 text-sm" // backend or mismatch errors
                      : passwordValidation.isValid
                      ? "text-green-600 text-sm" // all good
                      : "text-yellow-500 text-sm" // warning while typing
                  }
                >
                  {!formData.password
                    ? "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number, and 1 special character"
                    : [
                        !passwordValidation.length &&
                          "Must be at least 8 characters",
                        !passwordValidation.uppercase &&
                          "Include at least 1 uppercase letter",
                        !passwordValidation.lowercase &&
                          "Include at least 1 lowercase letter",
                        !passwordValidation.number &&
                          "Include at least 1 number",
                        !passwordValidation.specialChar &&
                          "Include at least 1 special character (@$!%*?&)",
                      ]
                        .filter(Boolean)
                        .join(", ") || "✓ Password meets all requirements"}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Please wait" : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
