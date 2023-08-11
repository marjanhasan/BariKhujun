import { Link } from "react-router-dom";
import Button from "../../button/Button";
import Logo from "./Logo";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-100">
      <div className="flex items-center justify-between relative px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <Logo />
        <Nav />

        <Link to="/login" className="hidden lg:flex w-36">
          <Button label={"Login/Register"} />
        </Link>

        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
