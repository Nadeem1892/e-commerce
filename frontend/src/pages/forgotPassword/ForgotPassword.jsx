import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFogotPasswordMutation } from "../../service/api/user/userService";
import { toast } from "react-toastify";

// Forgot Password Component
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [forgotPassword] = useFogotPasswordMutation()
  
  // Define form validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter your email address"),
  });

  // Define initial values for the form
  const initialValues = {
    email: "",
  };

  // Handle form submission
  const handleSubmit = async (values,{setSubmitting,setErrors}) => {
    
     try {
        // Call the login function that makes the API request
        const userForgotPassword = await forgotPassword(values); // Assuming login is an async function returning the response
        // Stop submitting (the form is no longer in submission state)
        setSubmitting(false);
    
        
        // Destructure the response
        const { data } = userForgotPassword;

        
        // Check if the status is true (successful login)
       if (data?.status === true) {
               // Show success message
               toast.success(data.message);
       
               navigate("/verification-otp", { state: values });
             } else {
               toast.error(data?.message);
             }
      } catch (error) {
        setSubmitting(false);
                if (error.user) {
                  // Server responded with a status other than 200 range
                  setErrors({ api: error.message });
                } else {
                  // Network error or other issues
                  setErrors({ api: "An error occurred. Please try again." });
                }
      }
  };

  return (
    <section className="container mx-auto flex items-center lg:px-10 px-3 justify-between">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-4">
        <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email Address:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="text-sm absolute text-red-600 mt-1" />
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
                {isSubmitting ? "Sending..." : "Send OTP"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ForgotPassword;
