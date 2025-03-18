import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Reset Password Component
const ResetPassword = () => {
  const [isPasswordReset, setIsPasswordReset] = useState<boolean | null>(null);

  // Define form validation schema with Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"),], "Passwords must match")
      .required("Please confirm your password"),
  });

  // Define initial values for the form
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  // Handle form submission (password reset)
  const handleSubmit = (values: { password: string }) => {
    // In a real app, this would make an API call to reset the password
    console.log("Password reset successfully:", values.password);
    setIsPasswordReset(true);
  };

  return (
    <section className="container mx-auto flex items-center lg:px-10 px-3 justify-between">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <h2 className="text-xl font-bold text-center mb-6">Reset Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              {/* Password Field */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  New Password:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm absolute text-red-600 mt-1"
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-sm absolute text-red-600 mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative mt-5 flex items-center w-full justify-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="absolute left-2 animate-spin">
                    <svg
                      className="w-5 h-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" />
                      <path className="opacity-75" d="M4 12h16" />
                    </svg>
                  </span>
                ) : null}
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Show Password Reset Success Message */}
        {isPasswordReset !== null && (
          <div
            className={`mt-4 text-center text-sm ${
              isPasswordReset ? "text-green-500" : "text-red-600"
            }`}
          >
            {isPasswordReset
              ? "Password reset successfully!"
              : "Something went wrong. Please try again."}
          </div>
        )}
      </div>
    </section>
  );
};

export default ResetPassword;
