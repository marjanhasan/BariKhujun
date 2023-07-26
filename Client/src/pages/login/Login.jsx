// import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const handleLogin = () => {
  //   axios
  //     .post("http://localhost:5000/login", {
  //       name,
  //       password,
  //     })
  //     .then((user) => {
  //       localStorage.setItem("token", user.data.token);
  //       console.log("User registered");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       navigate("/login");
  //     });
  // };
  return (
    <div className="">
      <h1 className="text-4xl font-medium text-center my-3">
        Welcome to Login page
      </h1>
      <div className="w-full max-w-sm mx-auto mb-10 border-4 p-10">
        <label className="block mb-1 font-bold">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <label className="block mb-1 font-bold">Password:</label>
        <input
          type="password"
          placeholder="password*****"
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
            Please Register
          </Link>
        </p>
        {/* TODO: onClick={handleLogin} */}
        <div>
          {1 ? (
            <Button label={"Login"} type={"submit"} />
          ) : (
            <Button label={"Login"} type={"submit"} disabled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
