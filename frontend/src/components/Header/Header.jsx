import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/MAQ_Cakes.png";
import Search from "../Search/Search";
import { FaRegUserCircle } from "react-icons/fa";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import useMobile from "../../hooks/useMobile";
import UserMenu from "../Atoms/userMenu";

const Header = () => {
  const [isMobile] = useMobile();
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  // For handling state change explicitly (local state)
  const token = localStorage.getItem("accessToken");

  const redirectLoginPage = () => {
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = ()=>{
    if(!token){
        navigate("/login")
        return
    }

    navigate("/user-menu")
}

  

  return (
    <header className="bg-white h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="flex items-center p-4 justify-between">
          {/* Logo */}
          <div className="hidden bg-green-300 h-20  lg:block">
            <Link to={"/"} className="">
              <img
                src={logo}
                alt="logo"
                className=" h-full w-full"
              />
            </Link>
          </div>

          {/* Location */}
          <div className="">
           Location
          </div>

          {/* Search bar */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* login and my cart */}
          <div className="">
            {/* User icon use only mobile view */}
            <button className="text-neutral-500 lg:hidden" onClick={handleMobileUser}>
              <FaRegUserCircle size={28} />
            </button>
            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-5">
                <Link to={"/"}>
                  {/* Add to cart icon */}
                  <div className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-neutral-500 hover:text-[#ffbf00]">
                    <div className="flex items-center gap-1">
                      <IoMdCart size={25} />
                      <span className="text-[17px]">Cart</span>
                    </div>
                  </div>
                </Link>

                {token ? (
                  <div className="relative">
                    <div
                      className="flex items-center gap-1 select-none"
                      onClick={() => setOpenUserMenu((prev) => !prev)}
                    >
                      <p className="text-[17px] text-neutral-500">Account</p>
                      {openUserMenu ? (
                        <GoTriangleUp size={25} className="text-neutral-500" />
                      ) : (
                        <GoTriangleDown
                          size={25}
                          className="text-neutral-500"
                        />
                      )}
                    </div>

                    {openUserMenu && (
                      <div className="absolute right-0 top-16">
                        <div className="bg-white rounded-lg p-4 min-w-52 lg:shadow-md">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button onClick={redirectLoginPage}>
                    {/* Add to cart icon */}
                    <div className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-neutral-500 hover:text-[#ffbf00]">
                      <div className="flex items-center gap-1">
                        <FaUser size={20} />
                        <span className="text-[17px]">Sign In</span>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
