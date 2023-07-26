import { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";
const MobileBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="lg:hidden block">
      <div className="ml-6 w-fit h-fit">
        <button
          aria-label="Open Menu"
          title="Open Menu"
          onClick={() => setIsMenuOpen(true)}
          className="bg-blue-600 p-2 rounded-md text-white"
        >
          <FaBars size="24" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full z-10 bg-gray-300 space-x-10">
          <div className="ml-10 my-4">
            <button
              aria-label="Close Menu"
              title="Close Menu"
              onClick={() => setIsMenuOpen(false)}
              className="btn"
            >
              <FaWindowClose size="24" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileBar;
