import Login from "./Login";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const LoginWrapper = () => {
    // initial value
  const initialValues = {
    email: "",
    password: "",
  };

//   submit fuction
  const handleSubmit = async (
    values: {
      email: string;
      password: string;
    },
    {
      setSubmitting,
      setErrors,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
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
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {
        (formikProps) => {
            return(
                <Form>
                    <Login formikProps={formikProps}/>
                </Form>
            )
        }
      }
    </Formik>
  );
};

export default LoginWrapper;
