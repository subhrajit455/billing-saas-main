import { Outlet } from "react-router";
import "./App.css";
import bgImage from "/background.png";
import { Navbar, Sidebar } from "./components";
import { Toaster } from "sonner";
function App() {
  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-full flex bg-white/50">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <Navbar />
          <main
            className="flex-1 px-6 py-8 mt-20 rounded-tl-4xl backdrop-blur-md border shadow-2xl overflow-hidden bg-white/20"
            style={{
              boxShadow:
                "0px -6px 50px rgba(0,0,0,0.1), 0px 6px 50px rgba(0,0,0,0.1)",
            }}
          >
            <Outlet />
            <Toaster position="top-right" />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
