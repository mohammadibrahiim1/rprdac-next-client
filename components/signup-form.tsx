/* eslint-disable @typescript-eslint/no-unused-vars */
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
import React, { useState } from "react";
import { useRegisterMutation } from "@/redux/services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ===========================
// TYPE DEFINITIONS
// ===========================
interface FormDataProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  specialChar: boolean;
  isValid: boolean;
}

interface TouchedState {
  password: boolean;
  confirmPassword: boolean;
}

interface RegisterErrorResponse {
  data?: {
    message?: string;
    errors?: FormErrors;
  };
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  // ============================
  // STATES
  // ============================
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({
    password: false,
    confirmPassword: false,
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

  // ============================
  // PASSWORD VALIDATION
  // ============================
  const validatePassword = (password: string): string => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[@$!%*?&]/.test(password);

    setPasswordValidation({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
      isValid: length && uppercase && lowercase && number && specialChar,
    });

    if (!password.trim()) return "Password is required";
    if (!length) return "Must be at least 8 characters";
    if (!uppercase) return "Include at least 1 uppercase letter";
    if (!lowercase) return "Include at least 1 lowercase letter";
    if (!number) return "Include at least 1 number";
    if (!specialChar) return "Include at least 1 special character (@$!%*?&)";

    return "";
  };

  // HANDLE INPUT CHANGE

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear field error when editing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    // Password logic
    if (name === "password") {
      const message = validatePassword(value);

      setErrors((prev) => ({
        ...prev,
        password: message || undefined,
      }));

      // confirm password check
      if (formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword:
            value === formData.confirmPassword
              ? undefined
              : "Passwords do not match",
        }));
      }
    }

    // Confirm password logic
    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.password ? undefined : "Passwords do not match",
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // SUBMIT

  const handleRegisterSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // mark all fields as touched
    // setTouched({
    //   name: true,
    //   email: true,
    //   password: true,
    //   confirmPassword: true,
    // });

    try {
      const res = await register(formData).unwrap();

      console.log(res);

      if (res.success && res.user) {
        dispatch(setUser(res.user));
        toast.success("Successful!");
        router.push("/");
      }
    } catch (error) {
      const err = error as RegisterErrorResponse;

      if (err?.data?.errors) {
        setErrors(err.data.errors);
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // ============================
  // INPUT STYLE
  // ============================
  const getInputStyle = (field: keyof FormErrors): string => {
    if (errors[field]) return "border-red-500 placeholder-red-500";

    if (
      field === "password" &&
      formData.password &&
      !passwordValidation.isValid
    )
      return "border-yellow-500 placeholder-yellow-500";

    if (
      field === "email" &&
      formData.email &&
      !/\S+@\S+\.\S+/.test(formData.email)
    )
      return "border-yellow-500 placeholder-yellow-500";

    return "border-gray-300";
  };

  const getPlaceholder = (
    field: keyof FormErrors,
    fallback: string
  ): string => {
    return errors[field] ?? fallback;
  };

  // ============================
  // RENDER
  // ============================
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
              {/* NAME */}
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  name="name"
                  placeholder={getPlaceholder("name", "Full name")}
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputStyle("name")}
                />
              </Field>

              {/* EMAIL */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  name="email"
                  placeholder={getPlaceholder("email", "m@example.com")}
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputStyle("email")}
                />
              </Field>

              {/* PASSWORD + CONFIRM */}
              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    placeholder={getPlaceholder("password", "********")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputStyle("password")}
                  />
                </Field>

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    placeholder={getPlaceholder("confirmPassword", "********")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputStyle("confirmPassword")}
                  />
                </Field>
              </Field>

              {/* PASSWORD DESCRIPTION */}
              <FieldDescription
                className={
                  errors.password
                    ? "text-red-500"
                    : passwordValidation.isValid
                    ? "text-green-600"
                    : "text-yellow-500"
                }
              >
                {!formData.password
                  ? "Password must meet all requirements"
                  : Object.entries(passwordValidation)
                      .filter(([k, v]) => k !== "isValid" && v === false)
                      .map(([k]) => {
                        switch (k) {
                          case "length":
                            return "Must be at least 8 characters";
                          case "uppercase":
                            return "Include at least 1 uppercase letter";
                          case "lowercase":
                            return "Include at least 1 lowercase letter";
                          case "number":
                            return "Include at least 1 number";
                          case "specialChar":
                            return "Include at least 1 special character (@$!%*?&)";
                          default:
                            return "";
                        }
                      })
                      .join(", ") || "✓ Password meets all requirements"}
              </FieldDescription>

              {/* SUBMIT */}
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Please wait..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
