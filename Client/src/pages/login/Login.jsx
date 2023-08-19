import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Player } from "@lottiefiles/react-lottie-player";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    const value = {
      user,
      password,
    };
    axios
      .post("http://localhost:8000/login", value)
      .then((res) => {
        // console.log(res.data.data["access-token"]);
        localStorage.setItem("access-token", res.data.data["access-token"]);
        console.log("User login succesfully", res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  };
  return (
    <div className="md:flex flex-row-reverse my-container justify-center items-center">
      <div className="basis-1/2">
        <h1 className="text-4xl font-medium text-center my-3">
          Welcome to Login page
        </h1>
        <Player autoplay loop src="/login.json"></Player>
      </div>
      <div className="basis-1/2 w-full max-w-sm mx-auto mb-10 border-4 rounded-lg p-10">
        <label className="block mb-1 font-bold">User Name/Email:</label>
        <input
          type="text"
          placeholder="name/example@email.com"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <label className="block mb-1 font-bold">Password:</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <p className="my-4">
          Don&apos;t have account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
        {/* TODO: onClick={handleLogin} */}
        <div>
          {1 ? (
            <Button onClick={handleLogin} label={"Login"} type={"submit"} />
          ) : (
            <Button label={"Login"} type={"submit"} disabled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
