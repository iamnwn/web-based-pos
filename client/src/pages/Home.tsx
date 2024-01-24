import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const Home = () => {
  return (
    <div className="home bg-black h-dvh flex text-white">
      <Toaster />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
