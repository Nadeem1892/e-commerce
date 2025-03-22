import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom';
import { useUserDetailsQuery } from "./services/api/user/userServices";
import { useEffect } from "react";

function App() {

   // Destructure the query result from RTK Query hook
   const { data:userData, isError } = useUserDetailsQuery();

   useEffect(() => {
     // You can add logic here to handle the fetched data
     if (userData) {
       console.log("User data fetched successfully:", userData);
     }
     if (isError) {
       console.log("Error occurred:", isError);
     }
 
   }, [userData, isError]); // This will trigger the effect when any of these values change
 
  
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
