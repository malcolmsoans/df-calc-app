import React, { useState } from "react";

const CalculatorForm: React.FC = () => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleRecaptcha = (token: string) => {
    setRecaptchaToken(token);
    setIsVerified(true); // Enable submission
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please verify you are human.");
      return;
    }

    // Send token to backend for verification
    const response = await fetch("/api/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: recaptchaToken }),
    });

    const data = await response.json();
    if (data.success) {
      alert("Calculation successful!");
    } else {
      alert("reCAPTCHA verification failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
      <button type="submit" disabled={!isVerified}>
        Calculate
      </button>
      <div
        className="g-recaptcha"
        data-sitekey="your-site-key"
        data-callback="handleRecaptcha"
      ></div>
    </form>
  );
};

export default CalculatorForm;