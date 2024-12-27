const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-night-100 p-6 text-center">
      <div className="container mx-auto">
        <p className="font-sans font-bold text-sm md:text-base dark:text-gray-200 opacity-60">
          &copy; {new Date().getFullYear()} Deox Foods. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
