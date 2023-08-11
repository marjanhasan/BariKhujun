import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <ul className="items-center hidden space-x-8 lg:flex font-medium">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/discover"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Discover
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Dashboard
        </NavLink>
      </li>
    </ul>
  );
};

export default Nav;
