import { Link, NavLink } from "react-router-dom";
import { FaBars, FaWindowClose } from "react-icons/fa";
import { useState } from "react";
const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="lg:hidden">
      {/* dropdown open button  */}
      <button
        aria-label="Open Menu"
        title="Open Menu"
        onClick={() => setIsMenuOpen(true)}
      >
        <FaBars className="w-5 text-gray-600" />
      </button>
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="p-5 bg-gray-50 border rounded shadow-sm">
            {/* logo & button section  */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <Link to="/" className="inline-flex items-center">
                  <span className="ml-2 text-xl font-bold tracking-wide txt-color">
                    Barikhujun
                  </span>
                </Link>
              </div>
              {/* dropdown menu close button  */}
              <div>
                <div>
                  <button
                    aria-label="Close Menu"
                    title="Close Menu"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaWindowClose className="w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
            {/* mobile nav items section  */}
            <nav className="ml-2">
              <ul className="space-y-4 font-medium">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/discover"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Discover
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "active" : "default"
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
