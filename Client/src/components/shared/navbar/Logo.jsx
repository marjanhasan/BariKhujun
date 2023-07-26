import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="">
      <span className="ml-2 text-2xl font-bold tracking-wide txt-color">
        Bari<span className="text-purple-400">Khujun</span>
      </span>
    </Link>
  );
};

export default Logo;
