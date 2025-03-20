import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Search from "../Search/Search";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import useMobile from "../../hooks/useMobile";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state)=> state?.user)

  // console.log(user,"user me")

  const redirectLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className=" bg-white h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className=" container mx-auto flex items-center  lg:px-10 px-3 justify-between">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className=" hidden lg:block"
              />
              <img
                src={logo}
                width={120}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/* Search bar */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and my card */}
          <div className="">
            {/* User icon use only mobile viwe */}
            <button className="text-neutral-500 lg:hidden">
              <FaRegUserCircle size={28} />
            </button>
            {/* desktop */}
            <div className="hidden lg:block ">
              <div className="flex items-center">
                <Link to={"/"}>
                  {/* add to cart icon */}
                  <div className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-neutral-500 hover:text-[#ffbf00]">
                    <div className="flex items-center gap-1">
                      <IoMdCart size={25} />
                      <span className="text-[17px]">Cart</span>
                    </div>
                  </div>
                </Link>
                <button onClick={redirectLoginPage}>
                  {/* add to cart icon */}
                  <div className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-neutral-500 hover:text-[#ffbf00]">
                    <div className="flex items-center gap-1">
                      <FaUser size={20} />
                      <span className="text-[17px]">Sign In</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search  */}
      <div className=" container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
