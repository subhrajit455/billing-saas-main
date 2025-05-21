import { BellDot, Search } from "lucide-react";
import { Input } from "./ui/input";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 h-20 w-[calc(100vw-16rem)] ml-64 flex items-center justify-between px-6 z-50 backdrop-blur-sm ">
      <nav className="w-full flex items-center justify-between gap-4">
        <div className="flex justify-center items-center gap-4 w-full max-w-3xl px-4 py-2 ">
          <Search className="text-[#7C2EEA] min-w-6 min-h-6" />
          <input
            className="w-full max-w-2xl px-2 py-2 text-lg bg-transparent border-0 border-b-2 border-[#7C2EEA]/30 focus:border-none focus:ring-0 rounded-none placeholder-gray-400 transition-all"
            placeholder="Insert something to search"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <BellDot className="text-[#7C2EEA]" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-700 to-purple-700"></div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;