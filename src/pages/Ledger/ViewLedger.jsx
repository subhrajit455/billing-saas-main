import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { House , Download} from 'lucide-react';
import { FiUpload } from "react-icons/fi";
import { FileText } from 'lucide-react';
const ledgerData = [
  { name: "Money HoiMANUS", balance: 74480, negative: false },
  { name: "Money HoiMANUS", balance: 74480, negative: false },
  { name: "Money HoiMANUS", balance: 74480, negative: false },
  { name: "Money HoiMANUS", balance: -74480, negative: true },
];

const ViewLedger=()=> {
  return (
    <div className="p-4  min-h-screen ml-10 mr-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">Ledger Master Report</h2>
        </div>
        <Button className="bg-[#4fd18b] text-white text-lg px-6 py-2 rounded-lg">Create</Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-2 mb-2 mt-10">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-400 px-2 py-1 rounded-3xl w-xl"
        />
        <select className="border border-gray-400 px-2 py-1 rounded-3xl">
          <option>Search in all</option>
        </select>
        <Button className="border border-gray-300 rounded-3xl">Filter</Button>
        <div className="ml-auto flex gap-2">
          <span className="cursor-pointer"><House/></span> |
          <span className="cursor-pointer"><Download/></span>
          <span className="cursor-pointer text-2xl"><FiUpload/></span>
          <span className="cursor-pointer"><FileText/></span>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto mt-10">
        <table className="w-full border border-black">
          <thead>
            <tr className="bg-[#a9d08e] text-lg">
              <th className="border border-black px-4 py-2 text-left">Ledger Name</th>
              <th className="border border-black px-4 py-2 text-left">Balance</th>
              <th className="border border-black px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ledgerData.map((ledger, idx) => (
              <tr key={idx} className="text-lg">
                <td className="border border-black px-4 py-2">{ledger.name}</td>
                <td className={`border border-black px-4 py-2 ${ledger.negative ? "text-red-600 font-semibold" : ""}`}>
                  {ledger.balance < 0
                    ? `₹ ${ledger.balance.toLocaleString("en-IN")}.00`
                    : `₹ ${ledger.balance.toLocaleString("en-IN")}.00`}
                </td>
                <td className="border border-black px-4 py-2">
                  <button className="mr-2 text-gray-700 hover:text-blue-600">
                    <Pencil size={18} />
                  </button>
                  <button className="text-gray-700 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Info Section */}
      <div className="grid grid-cols-4 gap-4 mt-60">
        <div className="border rounded p-2">
          <div className="font-semibold mb-1">Address</div>
          <div>56/4, MoneHoiMANUS, Side Road,722150</div>
          <div className="mt-2">Contact details: 9846196460</div>
          <div>A/C Group: Mone Hoi MANUS</div>
        </div>
        <div className="border rounded p-2">
          <div className="font-semibold mb-1">License info</div>
          <div>D.L No:</div>
          <div>GSTIN:</div>
          <div className="font-semibold mt-2">Other info</div>
          <div>State: Kolkata</div>
          <div>Type: unregistered</div>
        </div>
        <div className="border rounded p-2 col-span-2">
          <div className="font-semibold mb-1">Current Status</div>
          <div>Opening: 9654514</div>
          <div>Debit: 6854618</div>
          <div>Credit: 35611158</div>
          <div>Balance: 48411841</div>
        </div>
      </div>
    </div>
  );
}
export default ViewLedger;