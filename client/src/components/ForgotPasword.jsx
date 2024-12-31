import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulate sending a password reset request
      console.log("Sending reset email to:", email);

      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage("A password reset email has been sent to your email address.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setMessage("Failed to send reset email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex items-center justify-center p-5">
      <div className="w-full max-w-lg bg-white dark:bg-night-300 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-night-200 dark:text-white text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-night-400 dark:text-gray-300 text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-night-200 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-md bg-gray-100 dark:bg-night-200 text-night-200 dark:text-white border border-gray-300 dark:border-night-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full p-3 rounded-md font-semibold ${isSubmitting
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-400 hover:bg-orange-500"
                } text-white focus:outline-none focus:ring-2 focus:ring-orange-200`}
            >
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-night-200 dark:text-gray-300">
            {message}
          </p>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;

