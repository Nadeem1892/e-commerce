import { Form, Formik } from "formik";
import Register from "./Register";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../services/api/user/userServices";

const RegisterWrapper = () => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Simulate an API request
      const registerUser = await register(values);
      // Stop submitting (the form is no longer in submission state)
      setSubmitting(false);

      // Destructure the response
      const { data } = registerUser;

      if (data?.status === true) {
        // Show success message
        toast.success(data.message);
        navigate("/login", { replace: true });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      // If an error occurs, stop submitting and set error state
      setSubmitting(false);
      setErrors({ general: "Something went wrong. Please try again." });
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
    name: Yup.string().required("Please enter your name"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match") // Remove the null here
      .required("Please confirm your password"),
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
            <Register formikProps={formikProps} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterWrapper;
