import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../service/api/user/userService";
import { toast } from "react-toastify";

// Reset Password Component
const ResetPassword = () => {
  
   const navigate = useNavigate();
    const location = useLocation();
    const [resetPassword, { isLoading, error }] =
      useResetPasswordMutation();


       // Ensure email is passed from previous page
        useEffect(() => {
          if (!location?.state?.email) {
            navigate("/forgot-password");
            alert("Email not found. Redirecting to Forgot Password.");
          }
        }, [location, navigate]);



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
  const handleSubmit =  async (values,{ setSubmitting, setErrors }) => {
    setSubmitting(true); // Set form submission state

    // Get the email from location state
    const email = location?.state?.email;
    

    if (!email) {
      setSubmitting(false);
      toast.error("Email is missing. Please try again.");
      return;
    }

        try {
          // Send the OTP to the server for verification
          const response = await resetPassword({
            email: email, // Pass the email along with the OTP
            password: values.password,
            confirmPassword: values.confirmPassword,
          }).unwrap();
    
          console.log(response)
          setSubmitting(false);
    
          // Destructure the response
          const { message, status } = response;
    
          if (status === true) {
            // Show success message
            toast.success(message);
            navigate("/login");
          } else {
            toast.error(message);
          }
        } catch (err) {
          setSubmitting(false);
          console.error("Reset Password failed:", err);
          setErrors({ otp: "Failed to Reset Password. Please try again." }); // Show error if request fails
        } finally {
          setSubmitting(false); // Reset submitting state
        }
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

       
      </div>
    </section>
  );
};

export default ResetPassword;
