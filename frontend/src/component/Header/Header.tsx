import React from "react";

type Props = {};

function Header({}: Props) {
  return (
    <header>
      {/* Top Sprit */}
      <div className="top-sprit py-2 bg-green-800">
        <div className="col2  flex items-center justify-end mr-20">
          <ul className="flex items-center lg:gap-3 gap-2 font-[500]  lg:text-[13px] text-[12px]">
            <li className="text-white">Cart</li>
            <li className="text-white border-l-2 border-white pl-3">Find Store</li>
            <li className="text-white border-l-2 border-white pl-3">Sign In</li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
