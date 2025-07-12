import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      Swal.fire("Oops!", "Passwords do not match", "error");
      return;
    }

    // Final Submit Action
    Swal.fire({
      title: "Success!",
      text: "Your account has been created",
      icon: "success",
      confirmButtonText: "Continue",
    }).then(() => {
      navigate("/landing"); // redirect to your landing page
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl"
      >
        {/* Progress Bar */}
        {/* Full-width Progress Bar */}
        <div className="flex flex-col items-center mb-10 w-full">
          {/* Dots and Lines */}
          <div className="flex items-center justify-between w-full max-w-md">
            {[1, 2, 3].map((s, i) => (
              <React.Fragment key={s}>
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold z-10 
          ${
            step >= s ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
          }`}
                >
                  {s}
                </div>
                {s !== 3 && (
                  <div
                    className={`flex-1 h-1 transition-all duration-300 
            ${step > s ? "bg-blue-600" : "bg-gray-300"}`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Labels */}
          <div className="flex justify-between w-full max-w-md text-sm text-gray-500 mt-2 px-1">
            <span className={step === 1 ? "font-medium text-blue-600" : ""}>
              Personal
            </span>
            <span className={step === 2 ? "font-medium text-blue-600" : ""}>
              Account
            </span>
            <span className={step === 3 ? "font-medium text-blue-600" : ""}>
              Submit
            </span>
          </div>
        </div>

        {/* Headings */}
        <h2 className="text-2xl font-bold text-blue-800 mb-1">
          {step === 1
            ? "Personal Information"
            : step === 2
            ? "Account Creation"
            : "Confirm & Submit"}
        </h2>
        <p className="text-sm from-blue-500 mb-6">
          {step === 1
            ? "Let's start with your basic details"
            : step === 2
            ? "Set up your login credentials"
            : "Ready to complete your signup"}
        </p>

        {/* Form Inputs */}
        <div className="space-y-4">
          {step === 1 && (
            <>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </>
          )}

          {step === 3 && (
            <div className="text-gray-700 text-sm space-y-2">
              <p>
                <strong>First Name:</strong> {form.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {form.lastName}
              </p>
              <p>
                <strong>Mobile:</strong> {form.mobile}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p>
                <strong>DOB:</strong> {form.dob}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:from-blue-600 hover:to-blue-600 transition"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:from-blue-600 hover:to-blue-600 transition"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
