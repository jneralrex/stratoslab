"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useLoadingStore from "@/utils/store/useLoading";
import { regStudent } from "@/utils/axios/endPoints";

function RegisterForm() {
  const searchParams = useSearchParams();
  const selectedCourse = searchParams.get("course");
  const ref = searchParams.get("ref");

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [phoneCode, setPhoneCode] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      course: selectedCourse || "",
      ref: ref || ""
    }
  });



  const { loading } = useLoadingStore();
  const router = useRouter();

  // ✅ Watch form values
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  useEffect(() => {
    if (ref) {
      setValue("ref", ref); // auto-fill referral
    }
  }, [ref, setValue]);

  // Pre-fill course if selected from prev page
  useEffect(() => {
    if (selectedCourse) {
      setValue("course", selectedCourse);
    }
  }, [selectedCourse, setValue]);


  // Fetch countries
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,idd"
        );
        const data = await res.json();

        const formatted = data.map((c) => ({
          name: c.name.common,
          flag: c.flags?.png,
          code: c.idd?.root ? c.idd.root + (c.idd.suffixes?.[0] || "") : "",
        }));

        formatted.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formatted);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      } finally {
        setLoadingCountries(false);
      }
    }

    fetchCountries();
  }, []);

  const onSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      console.log(formData)
      await regStudent({ ...formData, course: formData.course || selectedCourse, ref: ref });
      router.push("/trustedtek/student/verify-otp");
    } catch (error) {
      console.log(error)
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  //  Handle country selection → auto-fill phone code
  const handleCountryChange = (e) => {
    const selected = countries.find((c) => c.name === e.target.value);
    if (selected?.code) {
      setPhoneCode(selected.code);
      setValue("phoneNumber", selected.code + " "); // Pre-fill with code
    }
  };

  // Password rules
  const passwordRules = [
    { label: "At least 8 characters", test: /.{8,}/ },
    { label: "1 uppercase letter", test: /[A-Z]/ },
    { label: "1 lowercase letter", test: /[a-z]/ },
    { label: "1 number", test: /\d/ },
    { label: "1 special character", test: /[^a-zA-Z0-9]/ },
  ];
  const passedRules = passwordRules.filter((r) => r.test.test(password)).length;

  const strengthPercent = (passedRules / passwordRules.length) * 100;
  let strengthLabel = "Weak";
  let strengthColor = "bg-red-500";
  if (passedRules >= 3) {
    strengthLabel = "Medium";
    strengthColor = "bg-yellow-500";
  }
  if (passedRules === passwordRules.length) {
    strengthLabel = "Strong";
    strengthColor = "bg-green-500";
  }

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;
  const isFormValid = passedRules === passwordRules.length && isPasswordMatch;

  // Courses list
  const courses = [
    "social-media-management",
    "business-management",
    "ai-building",
    "web-development",
    "community-management",
    "web3-marketing",
    "forex",
    "animation-and-illustration",
  ];
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Create Your Account
        </h2>


        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            {...register("fullName")}
            placeholder="Your Full Name"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            {...register("username")}
            placeholder="Your Username"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>


        {/* Country of Residence */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Country of Residence
          </label>
          {loadingCountries ? (
            <p className="text-gray-500">Loading countries...</p>
          ) : (
            <select
              {...register("countryOfResidence")}
              required
              onChange={handleCountryChange}
              className="w-full px-4 py-2 rounded-md border"
            >
              <option value="">Select your country</option>
              {countries.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name} ({c.code || "N/A"})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            {...register("phoneNumber")}
            placeholder="e.g. +234 8012345678"
            className="w-full px-4 py-2 rounded-md border"
            required
          />
        </div>


        {/* ✅ Course Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Course
          </label>
          <select {...register("course")} 
          className="w-full px-4 py-2 rounded-md border border-gray-300 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:text-white" required>
            <option value="">Select Course</option>
            {courses.map((course, i) => (
              <option key={i} value={course}>
                {course}
              </option>
            ))}
          </select>


        </div>

        {/* Referral */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Referral Code</label>
          <input
            type="text"
            readOnly
            {...register("ref")}
            className="w-full px-4 py-2 rounded-md border"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Your Password"
            className="w-full px-4 py-2 rounded-md border"
            required
          />

          {/* Strength meter */}
          {password && (
            <div className="mt-2">
              <div className="w-full bg-gray-300 h-2 rounded">
                <div
                  className={`h-2 rounded ${strengthColor}`}
                  style={{ width: `${strengthPercent}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                Strength: <span>{strengthLabel}</span>
              </p>
            </div>
          )}

          {/* Inline checklist */}
          <ul className="mt-2 text-sm">
            {passwordRules.map((rule, i) => {
              const valid = rule.test.test(password);
              return (
                <li
                  key={i}
                  className={`flex items-center gap-2 ${valid ? "text-green-500" : "text-red-500"
                    }`}
                >
                  {valid ? "✅" : "❌"} {rule.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-md border"
            required
          />
          {confirmPassword && (
            <p className={`mt-2 text-sm ${isPasswordMatch ? "text-green-500" : "text-red-500"}`}>
              {isPasswordMatch ? "✅ Passwords match" : "❌ Passwords do not match"}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`font-semibold px-6 py-3 rounded-lg w-full ${isFormValid && !loading
            ? "bg-green-500 hover:bg-green-600 text-black"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/trustedtek/student/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
