import { Link } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
const ErrorElement = () => {
  return (
    <div>
      <Player
        autoplay
        loop
        src="/lonely-404.json"
        style={{ height: "80vh", width: "100vw" }}
      ></Player>
      <div className="flex justify-center">
        <Link to={"/"}>
          <div className="btn">Go Back To Home</div>
        </Link>
      </div>
    </div>
  );
};

export default ErrorElement;
