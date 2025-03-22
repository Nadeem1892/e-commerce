import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom';
import { useUserDetailsQuery } from "./services/api/user/userServices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./services/slices/userSlice";

function App() {

  const dispatch = useDispatch()
  const { data: userData, isError } = useUserDetailsQuery();

  useEffect(() => {
    if (userData?.data && !isError) {
      dispatch(setUserDetails(userData.data));
    } else if (isError) {
      console.error('Error fetching user details');
    }
  }, [userData, isError, dispatch]);
 
  
  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
      
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
