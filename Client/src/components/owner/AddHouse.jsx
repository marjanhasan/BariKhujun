// import axios from "axios";
import { useState } from "react";

const AddHouse = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [img, setImg] = useState("");
  const [available, setAvailable] = useState("");
  const [rent, setRent] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDecription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setbathrooms] = useState("");
  const [room, setRoom] = useState("");
  const handleSubmit = () => {
    const addData = {
      name: name,
      address: address,
      city: city,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      size: room,
      picture: img,
      available: available,
      rent: parseInt(rent),
      phone: parseInt(phone),
      description: description,
    };
    // axios
    //   .post("http://localhost:5000/addhouse", addData)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
  };
  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-4">
        Add your house
      </h1>
      <div className="grid lg:grid-cols-2 mx-5 lg:gap-4">
        <div className="">
          <label className="block mb-1 font-bold">Name:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Address:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Address..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">City:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="City..."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
        </div>
        <div className="my-4">
          <label className="block mb-1 font-bold">Bedrooms:</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Select bedrooms...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="my-4">
          <label className="block mb-1 font-bold">Bathrooms:</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={bathrooms}
            onChange={(e) => setbathrooms(e.target.value)}
          >
            <option value="">Select bathrooms...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>

        <div className="my-4">
          <label className="block mb-1 font-bold">Room Size:</label>
          <select
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">Select room size...</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-bold">Picture:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="House Image..."
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Available Date:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Available Date..."
            value={available}
            onChange={(e) => {
              setAvailable(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Rent per month:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Rent per month..."
            value={rent}
            onChange={(e) => {
              setRent(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Phone Number:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Phone Number..."
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Description:</label>
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Description..."
            value={description}
            onChange={(e) => {
              setDecription(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold w-full">Submit:</label>
          <button type="submit" onClick={handleSubmit} className="btn w-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;
