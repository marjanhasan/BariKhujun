import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center ml-2 ">
      <img src="/logo.png" alt="" className="h-6 w-6" />
      <div className="text-2xl font-bold tracking-wide txt-color">
        Bari<span className="text-purple-400">Khujun</span>
      </div>
    </Link>
  );
};

export default Logo;
