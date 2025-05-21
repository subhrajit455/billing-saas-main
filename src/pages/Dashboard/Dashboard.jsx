import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div>
      <div className="w-full flex justify-between items-center my-2">
        <div className=" w-[40%]">
          <input
            type="text"
            placeholder="Enter your Business Name"
            className="w-2xl py-2 text-2xl bg-transparent border-0 border-b-2 border-[#7C2EEA]/30 focus:border-none focus:ring-0 rounded-none placeholder-gray-400 transition-all"
          />
        </div>
        <div className=" flex justify-center items-center gap-2">
          <Button variant="custom" className="border">
            <PlusCircle />
            Add Sales
          </Button>
          <Button variant="custom" className="border">
            <PlusCircle />
            Add Purchases
          </Button>
        </div>
      </div>
      <div className="">
        <h2 className="mt-4 font-bold text-3xl">Dashboard</h2>
        <div></div>
      </div>
    </div>
  );
}

export default Dashboard;