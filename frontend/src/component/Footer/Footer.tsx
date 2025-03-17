import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="border-t">
      <div className=" container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>© All Rights Reserved 2025.</p>

        <div className="flex items-center gap-4 justify-center text-2xl">
          <a href="">
            <FaFacebook className="hover:text-[#ffc929]"/>
          </a>
          <a href="">
            <FaInstagram className="hover:text-[#ffc929]"/>
          </a>
          <a href="">
            <FaLinkedin className="hover:text-[#ffc929]"/>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
