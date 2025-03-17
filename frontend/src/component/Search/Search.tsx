import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile()

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-12 rounded-md border p-1 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-[#ffbf00] transition-all duration-300">
    <div >
    

    {
      (isMobile && isSearchPage) ? (
        <Link to={"/"} className="flex justify-center items-center h-full p-3 text-neutral-700 group-focus-within:text-[#ffbf00] transition-colors duration-300 ">
        <FaArrowLeft size={22}/>
        </Link>
      ) : (
       <button className="flex justify-center items-center h-full p-3 text-neutral-700 group-focus-within:text-[#ffbf00] transition-colors duration-300">
       <IoSearchSharp size={22} />
       </button> 
      )
    }

   
    </div>

      <div className="w-full h-full flex items-center">
        {!isSearchPage ? (
          // not in search page
          <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "butter"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // when i was search page
          <div className="w-full h-full">
            <input type="text" placeholder="Search atta dal and more." className=" bg-transparent w-full h-full outline-none" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
