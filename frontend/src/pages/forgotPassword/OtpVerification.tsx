import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// OTP Verification Component
const OtpVerification = () => {
  const [otp, setOtp] = useState<string>("123456"); // Mock OTP value (In a real app, this would come from an API)
  const [isOtpValid, setIsOtpValid] = useState<boolean | null>(null);

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
  const handleSubmit = (values: { otp: string }) => {
    // Validate the entered OTP
    if (values.otp === otp) {
      setIsOtpValid(true);
      alert("OTP Verified successfully!");
    } else {
      setIsOtpValid(false);
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      // Manually handle OTP value update
                      const otpValue = e.target.value;
                      setFieldValue("otp", values.otp.slice(0, index) + otpValue + values.otp.slice(index + 1));
                      // Auto focus the next input when a digit is entered
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
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Show OTP validation result */}
        {isOtpValid !== null && (
          <div
            className={`mt-4 text-center text-sm ${isOtpValid ? "text-green-500" : "text-red-600"}`}
          >
            {isOtpValid ? "OTP Verified successfully!" : "Invalid OTP. Please try again."}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtpVerification;
