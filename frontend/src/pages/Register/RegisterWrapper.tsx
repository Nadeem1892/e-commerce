import { Form, Formik } from "formik";
import Register from "./Register";
import * as Yup from 'yup';

const RegisterWrapper = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  },
  { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: any) => void }
) => {
    // Set loading state
    setSubmitting(true);

    try {
      // Simulate an API request
      console.log(values);

      // If everything is good, reset submitting state
      setSubmitting(false);
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {
        (formikProps) => {
        return (
        <Form>
            <Register formikProps={formikProps}/>
        </Form>
         )
        }
      }
    </Formik>
  );
};

export default RegisterWrapper;
