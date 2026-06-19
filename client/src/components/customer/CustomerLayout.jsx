import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import CustomerSidebar from "./CustomerSidebar";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Persistent Sidebar */}
        <CustomerSidebar />

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
}