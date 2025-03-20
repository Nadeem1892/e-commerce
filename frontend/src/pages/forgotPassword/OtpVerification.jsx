import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyForgotPasswordOtpMutation } from "../../services/api/user/userServices";

// OTP Verification Component
const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyForgotPasswordOtp, { isLoading, error }] =
    useVerifyForgotPasswordOtpMutation(); // Hook for API call

  // Ensure email is passed from previous page
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
      alert("Email not found. Redirecting to Forgot Password.");
    }
  }, [location, navigate]);

  // Define form validation schema with Yup
  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, "OTP must be 6 digits long")
      .matches(/^[0-9]{6}$/, "OTP must contain only digits")
      .required("Please enter the OTP"),
  });

  // Define initial values for the form
  const initialValues = {
    otp: "",
  };

  // Handle form submission (OTP verification)
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
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
      const response = await verifyForgotPasswordOtp({
        otp: values.otp, // Use values.otp here
        email: email, // Pass the email along with the OTP
      }).unwrap();


      setSubmitting(false);

      // Destructure the response
      const { message, status } = response;

      if (status === true) {
        // Show success message
        toast.success(message);
        navigate("/reset-password",  { 
          state: { email }
        });
      } else {
        toast.error(message);
      }
    } catch (err) {
      setSubmitting(false);
      console.error("OTP verification failed:", err);
      setErrors({ otp: "Failed to verify OTP. Please try again." }); // Show error if request fails
    } finally {
      setSubmitting(false); // Reset submitting state
    }
  };

  return (
    <section className="container mx-auto flex items-center lg:px-10 px-3 justify-between">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <h2 className="text-xl font-bold text-center mb-6">OTP Verification</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex justify-between gap-2">
                {/* 6 OTP input boxes */}
                {[...Array(6)].map((_, index) => (
                  <Field
                    key={index}
                    type="text"
                    id={`otp-${index}`}
                    name="otp"
                    maxLength={1}
                    className="w-12 h-12 text-center border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffbf00] focus:border-[#ffbf00]"
                    onChange={(e) => {
                      const otpValue = e.target.value;
                      setFieldValue(
                        "otp",
                        values.otp.slice(0, index) +
                          otpValue +
                          values.otp.slice(index + 1)
                      );

                      // Auto-focus the next input when a digit is entered
                      if (otpValue && index < 5) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }}
                    value={values.otp[index] || ""}
                  />
                ))}
              </div>

              <ErrorMessage
                name="otp"
                component="div"
                className="text-sm absolute top-[214px] text-red-600 mt-1"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading} // Disable while submitting or loading
                className={`relative mt-5 flex items-center w-full justify-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 ${
                  isSubmitting || isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? (
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
                {isSubmitting || isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </Form>
          )}
        </Formik>

       

        {/* Show error message if any */}
        {error && (
          <div className="mt-4 text-center text-sm text-red-600">
            {error?.data?.message || "Something went wrong, please try again."}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpVerification;
