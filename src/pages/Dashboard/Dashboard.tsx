import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#f8fbfd_0%,#f2f6fb_100%)]">
      {/* Sidebar*/}
      <div className="fixed top-0 left-0 h-screen w-[280px] z-50 bg-[#FFF] border-r border-[#F3F4F6] hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        {/* Header*/}
        <header className="fixed top-0 right-0 left-0 lg:left-[280px] z-40 bg-white">
          <Header />
        </header>

        {/* Content Wrapper*/}
        <div className="p-4 md:p-6 lg:p-8 flex-1 pt-[80px] lg:pt-[88px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
