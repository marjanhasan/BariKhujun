import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import DiscoverPageContent from "./DiscoverPageContent";
// import axios from "axios";

const Discover = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("");
  const [available, setAvailable] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setbathrooms] = useState("");
  const [room, setRoom] = useState("");
  const [houseData, setHouseData] = useState([]);
  const [query, setQuery] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const { searchQ, cityQ, availableQ, rentQ, bedroomsQ, bathroomsQ, roomQ } =
      query;
    // axios
    //   .get(
    //     `http://localhost:5000/houses?page=${page}&search=${searchQ}&city=${cityQ}&available=${availableQ}&rent=${rentQ}&bedrooms=${bedroomsQ}&bathrooms=${bathroomsQ}&room=${roomQ}`
    //   )
    //   .then((data) => setHouseData(data.data.data))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setLoading(true);
    setTimeout(() => {
      fetch("./room.json")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setHouseData(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setHouseData("");
        });
    }, 3000);
  }, [query]);
  return (
    <div className="lg:flex">
      {/* desktop sidebar */}
      <div className="basis-[30%] bg-gradient-to-r from-cyan-100 to-blue-100 hidden lg:block ">
        <div className="flex ml-10 mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
          />
          <button
            onClick={() =>
              setQuery({
                searchQ: searchQuery,
                cityQ: city,
                availableQ: available,
                rentQ: rent,
                bedroomsQ: bedrooms,
                bathroomsQ: bathrooms,
                roomQ: room,
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        <div className="ml-10">
          <div className="my-4">
            <label className="block mb-1 font-bold">City:</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select city...</option>
              <option value="New York">Dhaka</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Bedrooms:</label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={bathrooms}
              onChange={(e) => setbathrooms(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select room size...</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Availability:</label>
            <select
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select availability...</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>
          <div className="my-4">
            <label className="block mb-1 font-bold">Rent Range:</label>
            <input
              type="range"
              min={0}
              max={20000}
              step={1000}
              value={rent}
              onChange={(e) => setRent(parseInt(e.target.value))}
              className="w-40"
            />
            <div className="flex justify-between">
              <span>From 0 To {rent}</span>
            </div>
          </div>
        </div>
      </div>
      {/* mobile dropdown */}
      <div className="lg:hidden block">
        <div className="w-full flex justify-center">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            onClick={() => setIsSearchOpen(true)}
            className="btn my-6"
          >
            Search
          </button>
        </div>
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full z-10 bg-gray-300 space-x-10">
            <div className="flex justify-around items-center my-4">
              <div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-2 py-1 lg:px-4 lg:py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />
                <button
                  onClick={() =>
                    setQuery({
                      searchQ: searchQuery,
                      cityQ: city,
                      availableQ: available,
                      rentQ: rent,
                      bedroomsQ: bedrooms,
                      bathroomsQ: bathrooms,
                      roomQ: room,
                    })
                  }
                  className="px-2 py-1 lg:px-4 lg:py-2 bg-blue-500 text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Search
                </button>
              </div>
              <button
                aria-label="Close Menu"
                title="Close Menu"
                onClick={() => setIsSearchOpen(false)}
                className="w-6 h-6"
              >
                <FaWindowClose className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">City:</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
              >
                <option value="">Select city...</option>
                <option value="New York">Dhaka</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Bedrooms:</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms("bedrooms", e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={bathrooms}
                onChange={(e) => setbathrooms(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select room size...</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Availability:</label>
              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select availability...</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-1 font-bold">Rent Range:</label>
              <input
                type="range"
                min={0}
                max={20000}
                step={1000}
                value={rent}
                onChange={(e) => setRent(parseInt(e.target.value))}
                className="w-40"
              />
              <div className="flex justify-between">
                <span>From 0 To {rent}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Discover page content  */}
      <DiscoverPageContent
        loading={loading}
        houseData={houseData}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Discover;
