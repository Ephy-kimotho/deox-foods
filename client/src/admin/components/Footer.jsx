import { MdEmail } from "react-icons/md";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-800 flex flex-col justify-center items-center px-2 py-4">
      <div className="container text-center">
        <p className="font-sans font-bold text-sm md:text-base text-white">
          &copy; {new Date().getFullYear()} Deox Foods. All rights reserved.
        </p>
        <p className="font-sans font-bold text-sm md:text-base text-white  my-1">
          You can reach to us at:
        </p>
      </div>

      {/* SOCIAL LINKS */}
      <div className="space-x-6">
        <a
          href="mailto:deoxmarket@gmail.com"
          target="_blank"
          className="  inline-block"
        >
          <MdEmail className="text-lg text-gray-200 hover:text-orange-300 dark:hover:text-orange-300" />
        </a>
        <a
          href="https://x.com/pinakle_org?t=ZJy4xVxglY_2w0eJ4DyyZw&s=09"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <FaXTwitter className="text-lg text-gray-200 hover:text-orange-300 dark:hover:text-orange-300" />
        </a>
        <a
          href="https://www.instagram.com/pinakle_org?igsh=YzljYTk1ODg3Zg=="
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <FaInstagram className="text-lg text-gray-200 hover:text-orange-300 dark:hover:text-orange-300" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
