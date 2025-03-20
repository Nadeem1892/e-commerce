import { useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Link } from "react-router-dom";




const Login = ({ formikProps }) => {
    const { values, setFieldValue, errors, isSubmitting, touched } = formikProps;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <section className="container mx-auto flex items-center lg:px-10 px-3 justify-between">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-lg p-4 shadow">
          <div className=" flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl text-gray-800 mb-2">Logo</h1>
          <h1 className="font-bold text-3xl text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 font-semibold text-[12px]">Please login to your account</p>
          </div>
          
          <div className="flex flex-col gap-7 mt-10">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email :
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setFieldValue("email", e.target?.value)}
                value={values.email}
                className={`block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00] ${
                  touched.email && errors.email ? "border-red-500" : ""
                }`}
                placeholder="you@example.com"
              />
              {touched.email && errors.email ? (
                <div className="text-sm absolute text-red-600">{errors.email}</div>
              ) : null}
            </div>
  
            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password :
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setFieldValue("password", e.target?.value)}
                value={values.password}
                className={`block w-full px-3 py-2 mt-1 text-sm bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#ffbf00] focus:ring-1 focus:ring-[#ffbf00] ${
                  touched.password && errors.password ? "border-red-500" : ""
                }`}
                placeholder="*********"
              />
              {touched.password && errors.password ? (
                <div className="text-sm absolute text-red-600">{errors.password}</div>
              ) : null}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <BiSolidHide className="text-[25px]" />
                ) : (
                  <BiSolidShow className="text-[25px]" />
                )}
              </button>
              <Link to={"/forgot-password"} className="flex justify-end mt-1 hover:text-[#ffbf00]">Forgot password?</Link>
            </div>
  
          </div>
  
          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative mt-7 flex items-center w-full justify-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting && (
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
            )}
            {isSubmitting ? "Login..." : "Login"}
          </button>

          <p className="mt-2 mb-5">Don't have account ? <Link to={"/register"} className=" font-semibold text-green-700">Register</Link></p>
        </div>
      </section>
    )
}

export default Login