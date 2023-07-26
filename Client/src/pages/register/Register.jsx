// import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { Player } from "@lottiefiles/react-lottie-player";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const handleRegister = () => {
  //   axios
  //     .post("http://localhost:5000/register", {
  //       name,
  //       role,
  //       phone,
  //       email,
  //       password,
  //     })
  //     .then(() => {
  //       console.log("User registered");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       navigate("/register");
  //     });
  // };
  return (
    <div className="md:flex my-container justify-center items-center">
      <div className="basis-1/2">
        <h1 className="text-4xl font-medium text-center my-3">
          Welcome to Registration page
        </h1>
        <Player autoplay loop src="/register.json"></Player>
      </div>
      <div className="basis-1/2 w-full max-w-sm mx-auto mb-10 border-4 rounded-lg p-10">
        <label className="block mb-1 font-bold">Name:</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <label className="block mb-1 font-bold">Role:</label>
        <input
          type="text"
          placeholder="Owner/Renter"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <label className="block mb-1 font-bold">Phone Number:</label>
        <input
          type="text"
          placeholder="+880"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          required
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        <br />
        <label className="block mb-1 font-bold">Email:</label>
        <input
          type="text"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
        {/* TODO: onClick={handleRegister} */}
        <div>
          {1 ? (
            <Button label={"Register"} type={"submit"} />
          ) : (
            <Button label={"Register"} type={"submit"} disabled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
