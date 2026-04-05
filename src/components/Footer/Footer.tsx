const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-1 h-8 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} New--Manage.. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
