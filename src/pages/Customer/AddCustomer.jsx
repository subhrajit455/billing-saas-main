import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";





const Addcustomer = () => {
  // Helper to get current date as YYYY-MM-DD string
  const getCurrentDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const initialCustomerData = {
    type: "B2B",
    gstin: "",
    pan: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    billingAddress: "",
    shippingAddress: "",
    creditLimit: "",
    openingBalance: {
      amount: "",
      type: "credit",
      asOf: getCurrentDateString(), // <-- Set current date as default
    },
    isActive: true,
  };

  const userId = JSON.parse(localStorage.getItem("userId"));
  const [form, setForm] = useState(initialCustomerData);
  const [loading, setLoading] = useState(false); // <-- Add loading state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("openingBalance.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        openingBalance: {
          ...prev.openingBalance,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name === "isActive") {
      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // <-- Start loading
    try {
      // Prepare data for API
      const data = {
        ...form,
        creditLimit: Number(form.creditLimit),
        openingBalance: {
          ...form.openingBalance,
          amount: Number(form.openingBalance.amount),
        },
      };

      const response = await axios.post(
        `http://192.168.0.123:3000/api/v1/customer-add/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if(response.data.success === true){
        toast.success( response.data.message || "Customer created successfully");
      }
      setForm(initialCustomerData);
    } catch (error) {
      toast.error(error.response.data.message || "Failed to create customer");
      console.log(error.response.data.message);
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  const handleReset = () => {
    setForm(initialCustomerData);
  };

  return (
    <div className="min-h-screen w-full flex flex-col px-4 py-2 items-center relative">
      <div className="w-full max-w-7xl flex flex-col gap-8  max-h-[80vh] px-2 overflow-y-auto hide-scrollbar">
        <h2 className="text-4xl mt-5 font-[700] mb-5 text-[#A16ED7] text-start tracking-tight w-full">
          Add Customer
        </h2>
        <hr className="border-t border-[#b08ed4] my-1" />
        <form
         id="add-customer-form"
          onSubmit={handleSubmit}
          className="w-full max-w-7xl flex flex-col gap-8"
        >
          {/* Name Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
                required
              />
            </div>
          </div>
          {/* Contact Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
                required
              />
            </div>
          </div>
          {/* Company/Type/IDs Group */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-[#a06ed7]  rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
                required
              >
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={form.gstin}
                onChange={handleChange}
                placeholder="Enter GSTIN"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">PAN</label>
              <input
                type="text"
                name="pan"
                value={form.pan}
                onChange={handleChange}
                placeholder="Enter PAN"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
          </div>
          {/* Address Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Billing Address</label>
              <textarea
                type="text"
                name="billingAddress"
                value={form.billingAddress}
                onChange={handleChange}
                placeholder="Enter billing address"
                className="w-full border hide-scrollbar border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              >
              </textarea>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Shipping Address</label>
              <textarea
                type="text"
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                placeholder="Enter shipping address"
                className="w-full border hide-scrollbar border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              >
                </textarea>
            </div>
          </div>
          {/* Credit/Active Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Credit Limit</label>
              <input
                type="number"
                name="creditLimit"
                value={form.creditLimit}
                onChange={handleChange}
                placeholder="Enter credit limit"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
            <div className="flex items-center gap-2 mt-8">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-5 w-5 accent-[#a06ed7]"
              />
              <label className="font-semibold text-[#7c3aed]">Is Active</label>
            </div>
          </div>
          {/* Opening Balance Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Opening Balance Amount</label>
              <input
                type="number"
                name="openingBalance.amount"
                value={form.openingBalance.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Opening Balance Type</label>
              <select
                name="openingBalance.type"
                value={form.openingBalance.type}
                onChange={handleChange}
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-[#7c3aed]">Opening Balance As Of</label>
              <input
                type="date"
                name="openingBalance.asOf"
                value={form.openingBalance.asOf}
                onChange={handleChange}
                className="w-full border border-[#a06ed7] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] text-lg"
              />
            </div>
          </div>
          <div>
            {/* Fixed bottom-right action buttons */}
            <div className="flex items-end justify-end">
            <div className=" flex gap-4 z-50">
              <Button
              variant="custom"
                type="button"
                className="text-lg py-3 mb-2 px-8  rounded-xl  "
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
              variant={"custom"}
                type="submit"
                form="add-customer-form"
                className="text-lg py-2 px-8 mb-2   rounded-xl "
                disabled={loading} // <-- Disable when loading
              >
                {loading ? (
                  <span>
                    <svg className="animate-spin h-5 w-5 inline-block mr-2 text-[#593283]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  "Save Customer"
                )}
              </Button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addcustomer;