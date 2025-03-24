import { useState } from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../../components/Atoms/UserProfileAvatarEdit";

const Profile = ({ formikProps }) => {
  const user = useSelector(state => state.user);

  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);

  const { values, setFieldValue, errors, isSubmitting, touched } = formikProps;

  // Toggle edit state for each field
  const toggleEditName = () => setIsEditingName(prev => !prev);
  const toggleEditEmail = () => setIsEditingEmail(prev => !prev);
  const toggleEditMobile = () => setIsEditingMobile(prev => !prev);

  // Handle updating form fields
  const handleUpdateField = (field, value) => {
    setFieldValue(field, value);
  };

  return (
    <div className="p-4">

      {/* Profile Image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit setProfileAvatarEdit={setProfileAvatarEdit} close={() => setProfileAvatarEdit(false)} />
      )}

      {/* Editable Name */}
      <div className="my-4 grid gap-4">
      <div className="flex flex-col gap-2">
          <label className="block text-2xl font-medium  text-gray-700" htmlFor="name">
          Personal Information :
          </label>
          {isEditingName ? (
            <div>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => handleUpdateField("name", e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                placeholder="Enter your name"
              />
              <button
                type="button"
                onClick={() => {
                  toggleEditName();
                  formikProps.handleSubmit(); // Submit the form to update user
                }}
                className="text-blue-500 mt-2"
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <span>{values.name}</span>
              <button
                type="button"
                onClick={toggleEditName}
                className="text-blue-500 ml-2"
              >
                Edit
              </button>
            </div>
          )}
          {touched.name && errors.name && (
            <div className="text-sm text-red-600">{errors.name}</div>
          )}
        </div>

        {/* Editable Email */}
        <div className="flex flex-col gap-2">
          <label className="block text-2xl font-medium text-gray-700" htmlFor="email">
          Email Address :
          </label>
          {isEditingEmail ? (
            <div>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => handleUpdateField("email", e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                placeholder="Enter your email"
              />
              <button
                type="button"
                onClick={() => {
                  toggleEditEmail();
                  formikProps.handleSubmit(); // Submit the form to update user
                }}
                className="text-blue-500 mt-2"
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <span>{values.email}</span>
              <button
                type="button"
                onClick={toggleEditEmail}
                className="text-blue-500 ml-2"
              >
                Edit
              </button>
            </div>
          )}
          {touched.email && errors.email && (
            <div className="text-sm text-red-600">{errors.email}</div>
          )}
        </div>

        {/* Editable Mobile */}
        <div className="flex flex-col gap-2">
          <label className="block text-2xl font-medium text-gray-700" htmlFor="mobile">
          Mobile Number :
          </label>
          {isEditingMobile ? (
            <div>
              <input
                id="mobile"
                name="mobile"
                type="text"
                value={values.mobile}
                onChange={(e) => handleUpdateField("mobile", e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00]"
                placeholder="Enter your mobile"
              />
              <button
                type="button"
                onClick={() => {
                  toggleEditMobile();
                  formikProps.handleSubmit(); // Submit the form to update user
                }}
                className="text-blue-500 mt-2"
              >
                Update
              </button>
            </div>
          ) : (
            <div>
              <span>{values.mobile}</span>
              <button
                type="button"
                onClick={toggleEditMobile}
                className="text-blue-500 ml-2"
              >
                Edit
              </button>
            </div>
          )}
          {touched.mobile && errors.mobile && (
            <div className="text-sm text-red-600">{errors.mobile}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
