import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../utils/utils";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast message
    toast.loading("Sending reset email...", { id: "loading" });

    try {
      // Make the actual API call using axios
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password/`,
        { email },
        { withCredentials: true }
      );

      console.log(response);
      
      // Handle success or failure based on response
      if (response.data.detail) {
        toast.success(
          "A password reset email has been sent to your email address."
        );
        setEmail('');
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
      toast.remove("loading"); // Remove the loading toast
    }
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white dark:bg-night-300 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-night-200 text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-night-400 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-night-200"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-md bg-gray-100 text-night-200 dark:text-white border border-gray-300 dark:border-night-400 focus:outline-none placeholder:text-gray-600"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md font-semibold ${
                isSubmitting
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500"
              } text-white focus:outline-none focus:ring-2 focus:ring-orange-200`}
            >
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
