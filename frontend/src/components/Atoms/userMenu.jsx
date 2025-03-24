import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/slices/userSlice";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useLogoutQuery } from "../../services/api/user/userServices";
import Divider from "./Divider";
import { toast } from "react-toastify";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const { data } =  useLogoutQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (data?.status == true) {
        if(close){
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success(data?.message)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{" "}
          <span className="text-medium text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-[#ffbf00]"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        
          
        <Link
          onClick={handleClose}
          to={"/dashboard/my-orders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>

        <button
          onClick={handleLogout}
          className=" px-2 bg-red-500 hover:bg-red-600 rounded text-center text-white py-1"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
