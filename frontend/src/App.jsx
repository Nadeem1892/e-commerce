import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { useUserDetailsQuery } from './services/api/user/userServices';

function App() {
  // Fetch user details using the useUserDetailsQuery hook
  const { data, error, isLoading } = useUserDetailsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false, // Make sure to fetch the data
  });

  // Log the data for debugging purposes
  console.log("Fetched data:", data);
  console.log("Error:", error);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    console.error("Error fetching user details:", error);
    // Display a user-friendly error message
    return <div>Error: {error.message || "Something went wrong!"}</div>;
  }

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
