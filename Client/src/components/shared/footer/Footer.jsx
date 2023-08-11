const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-100 to-blue-100 py-6">
      <h2 className="text-xs font-medium text-center">
        &copy; {new Date().getFullYear()} Barikhujun. All rights reserved.
      </h2>
    </div>
  );
};

export default Footer;
