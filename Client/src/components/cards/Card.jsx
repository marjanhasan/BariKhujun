import { Link } from "react-router-dom";
import HeartButton from "../button/HeartButton";

const Card = ({ room }) => {
  return (
    <Link to={`/`} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full bg-gradient-to-r from-cyan-100 to-blue-100 shadow-md rounded-xl">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-t-xl
          "
        >
          <img
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={room.image}
            alt="Room"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton />
          </div>
        </div>
        <div className="font-semibold text-lg pl-3">{room.location}</div>
        <div className="font-light text-neutral-500 pl-3">
          5 nights . {room.dateRange}
        </div>
        <div className="flex flex-row items-center gap-1 pl-3 pb-3">
          <div className="font-semibold">$ {room.price}</div>
          <div className="font-light">night</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
