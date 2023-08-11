import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";
import MobileBar from "../components/shared/sidebar/mobileBar";

const Dashboard = () => {
  const [isOwner, setIsOwner] = useState(true);
  const [isRenter, setIsRenter] = useState(false);
  return (
    <div className="lg:flex">
      <div className="basis-[30%] bg-gray-100 hidden lg:block h-screen">
        <Sidebar isOwner={isOwner} isRenter={isRenter} />
      </div>
      <MobileBar />
      <div className="basis-[70%] bg-gray-50">
        <h1>This is Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
