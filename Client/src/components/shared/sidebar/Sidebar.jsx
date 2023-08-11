import { FaHome } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ isOwner, isRenter }) => {
  return (
    <>
      <ul className="mx-10">
        {/* logo section  */}
        <Link to="/" className="">
          <span className="ml-2 mt-6 text-2xl font-bold tracking-wide txt-color">
            House-Hunter
          </span>
        </Link>
        <li className="ml-2 mt-10 border-b-2 pb-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "default")}
          >
            <span className="flex items-center gap-2 text-lg">
              <FaHome /> Home
            </span>
          </NavLink>
        </li>
        {isOwner && (
          <>
            <li className="ml-2 mt-10 border-b-2 pb-3">
              <NavLink
                to="/dashboard/addhouse"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                <span className="flex items-center gap-2 text-lg">
                  <FaHome /> Add Your House
                </span>
              </NavLink>
            </li>
            <li className="ml-2 mt-10 border-b-2 pb-3">
              <NavLink
                to="/dashboard/myhouse"
                className={({ isActive }) => (isActive ? "active" : "default")}
              >
                <span className="flex items-center gap-2 text-lg">
                  <FaHome /> My House
                </span>
              </NavLink>
            </li>
          </>
        )}
        {isRenter && (
          <li className="ml-2 mt-10 border-b-2 pb-3">
            <NavLink
              to="/dashboard/booked"
              className={({ isActive }) => (isActive ? "active" : "default")}
            >
              <span className="flex items-center gap-2 text-lg">
                <FaHome /> Booked House
              </span>
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default Sidebar;
