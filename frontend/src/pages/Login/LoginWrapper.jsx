import Login from "./Login";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/api/user/userServices";




const LoginWrapper = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  // initial value
  const initialValues = {
    email: "",
    password: "",
  };

  //   submit fuction
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Call the login function that makes the API request
      const user = await login(values); // Assuming login is an async function returning the response
      // Stop submitting (the form is no longer in submission state)
      setSubmitting(false);

      // Destructure the response
      const { data } = user;

      // Check if the status is true (successful login)
      if (data?.status === true) {
        // Show success message
        toast.success(data.message);

        // Store the access and refresh tokens in localStorage
        localStorage.setItem("accessToken", data?.data.accessToken); // Store the access token
        localStorage.setItem("refreshToken", data?.data.refreshToken); // Store the refresh token

        navigate("/");
       

      } else {
        // If login is unsuccessful, show the message from the server
        toast.error(data.message); // Display error message (from server)
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

  // Validation schema with Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter email"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Please enter password"),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <Form>
            <Login formikProps={formikProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginWrapper;
