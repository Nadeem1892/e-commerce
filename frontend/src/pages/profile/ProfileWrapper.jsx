import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  useUpdateUserMutation,
  useUserDetailsQuery,
} from "../../services/api/user/userServices";
import { setUserDetails } from "../../services/slices/userSlice";
import Profile from "./Profile";

const ProfileWrapper = () => {
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { data: userData, isLoading } = useUserDetailsQuery(); // Added isLoading to check data state

  // Avoid rendering the form before user data is loaded
  if (isLoading) {
    return <div>Loading...</div>; // Optional: Show loading state until user data is fetched
  }

  // initial value
  const initialValues = {
    name: userData?.data?.name || '',
    email: userData?.data?.email || '',
    mobile: userData?.data?.mobile || '',
  };

  // Submit function
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const user = await updateUser(values);
      setSubmitting(false);
      const { data } = user;
      if (data?.status === true) {
        toast.success(data.message);
        dispatch(setUserDetails(data?.data)); // Dispatching user data from API
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setSubmitting(false);
      setErrors({ api: error.message || "An error occurred. Please try again." });
    }
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string().required("Mobile number is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form>
          <Profile formikProps={formikProps} />
        </Form>
      )}
    </Formik>
  );
};

export default ProfileWrapper;
