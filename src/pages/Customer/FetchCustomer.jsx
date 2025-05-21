import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableForm from "@/components/Form/DialogForm";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const customerFields = [
  { name: "firstName", label: "First Name", placeholder: "Enter first name" },
  { name: "lastName", label: "Last Name", placeholder: "Enter last name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  { name: "phoneNumber", label: "Phone Number", placeholder: "Enter phone number" },
  { name: "address", label: "Address", placeholder: "Enter address" },
];

const FetchCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Make pageSize stateful
  const [searchTerm, setSearchTerm] = useState(""); // <-- Add this
  const [filteredCustomers, setFilteredCustomers] = useState([]); // <-- Add this
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    // Filter customers when searchTerm changes
    if (searchTerm.trim() === "") {
      setFilteredCustomers(customers);
    } else {
      setFilteredCustomers(
        customers.filter(
          (c) =>
            c.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, customers]);

  const fetchCustomers = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    setLoading(true);
    axios
      .get(`http://192.168.0.123:3000/api/v1/customer-list-all/${userId}`)
      .then((response) => {
        setCustomers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching customers");
        setLoading(false);
      });
  };
  
  const handleViewClick = (customer) => {
    setViewCustomer(customer);
    setShowViewModal(true);
  };
  // Calculate paginated data
  const paginatedCustomers = (searchTerm.trim() ? filteredCustomers : customers).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalCount = searchTerm.trim() ? filteredCustomers.length : customers.length;
  const totalPagesCalc = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);  
    setShowModal(true);
    setModalError("");
    setModalSuccess("");

  };

  const handleDeleteClick = async (customer) => {
    try {
      console.log(customer);
      await axios.delete(`http://192.168.0.123:3000/api/v1/customer-delete/${customer._id}`);
      toast.success("Customer deleted successfully!");
      fetchCustomers();
    } catch (err) {
      toast.error("Failed to delete customer.");
    }
  };

  const handleUpdateSubmit = async (data) => {
    try {
      // console.log(selectedCustomer);
      console.log(selectedCustomer);
      await axios.put(
        // `http://192.168.0.123:3000/api/v1/customer-update/${selectedCustomer._id}`,
        `http://192.168.0.123:3000/api/v1/customer-update/${selectedCustomer._id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      
      );

      // setModalSuccess("Customer updated successfully!");
      toast.success("Customer updated successfully!");
      setModalError("");
      fetchCustomers();
      setTimeout(() => setShowModal(false), 1000);
    } catch (err) {
      // setModalError("Failed to update customer.");
      toast.error("Failed to update customer.");
      setModalSuccess("");
    }
  };

  return (

      <div className="w-full p-8  z-0">
        <h2 className="text-3xl font-bold mb-8 text-[#a06ed7] drop-shadow text-center">Customer List</h2>
        {/* Search Bar */}
        <div className="flex justify-start mb-4 ml-5">
          <input
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="border border-[#a06ed7] rounded px-2 py-1 mr-2 w-sm h-12"
          />
          <Button
            onClick={() => setSearchTerm(searchTerm)}
            className="bg-[#a06ed7] text-white h-12 w-24"
          >
            Search
          </Button>
        </div>
        {/* Page Size Selector */}
        <div className="flex justify-end mb-4">
          <label className="mr-2 font-semibold " htmlFor="pageSize">Rows per page:</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when page size changes
            }}
            className="border rounded px-2 py-1"
          >
            {[5, 10].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="text-center text-lg text-[#a06ed7]">Loading customers...</div>
        ) : error ? (
          <div className="text-center text-lg text-red-500">{error}</div>
        ) : (
          <div className="w-full overflow-x-auto h-full flex items-center justify-center ">
            <div className="max-h-[500px] overflow-y-scroll hide-scrollbar w-full lg:w-[900px] xl:w-[1200px] 2xl:w-[1500px] rounded-2xl border-[#baadcf] border-1">
              <table className="min-w-full lg:min-w-[900px] xl:min-w-[1200px] 2xl:min-w-[1500px] hide-scrollbar rounded-xl shadow bg-white/60 backdrop-blur-sm border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gradient-to-r bg-[#e7d6fa] text-[#7c3aed]">
                    <th className="px-6 py-4 font-semibold text-left">Sl. No</th>
                    <th className="px-6 py-4 font-semibold text-left">First Name</th>
                    <th className="px-6 py-4 font-semibold text-left">Last Name</th>
                    <th className="px-6 py-4 font-semibold text-left">Email</th>
                    <th className="px-6 py-4 font-semibold text-left">Phone</th>
                    <th className="px-6 py-4 font-semibold text-left">Company Name</th>
                    <th className="px-6 py-4 font-semibold text-left">Billing Address</th>
                    <th className="px-6 py-4 font-semibold text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((customer, idx) => (
                    <tr
                      key={idx}
                      className={`transition hover:bg-[#d1c4e9]/60 ${
                        idx % 2 === 0
                          ? "bg-gradient-to-r from-[#f3e8ff]/80 to-[#ede9fe]/80"
                          : "bg-gradient-to-r from-[#ede9fe]/80 to-[#f3e8ff]/80"
                      }`}
                    >
                      <td className="px-6 py-4">
                        {(currentPage - 1) * pageSize + idx + 1}
                      </td>
                      <td className="px-6 py-4">{customer.firstName}</td>
                      <td className="px-6 py-4">{customer.lastName}</td>
                      <td className="px-6 py-4">
                        {customer.email && customer.email.length > 8
                          ? customer.email.substring(0, 10) + '...'
                          : customer.email}
                      </td>
                      <td className="px-6 py-4">{customer.phoneNumber}</td>
                      <td className="px-6 py-4">
                        {customer.companyName && customer.companyName.length > 8
                          ? customer.companyName.substring(0, 10) + '...'
                          : customer.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {customer.billingAddress && customer.billingAddress.length > 8
                          ? customer.billingAddress.substring(0, 10) + '...'
                          : customer.billingAddress}
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                            {/* View Icon */}
                      <button
                          title="View"
                          className="text-[#7c3aed] hover:text-[#a06ed7] transition cursor-pointer p-1 text-md"
                          style={{ lineHeight: 1 }}
                          onClick={() => handleViewClick(customer)}
                        >
                          <Eye size={20}/>
                        </button>
                        {/* Edit Icon */}
                        <button
                          title="Edit"
                          className="text-[#4fe45b] hover:text-[#52a059] transition cursor-pointer p-1 text-md"
                          style={{ lineHeight: 1 }}
                          onClick={() => handleEditClick(customer)}
                        >
                          <Pencil size={20}/>
                        </button>
                        {/* Delete Icon */}
                        <button
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition cursor-pointer p-1 text-md"
                          style={{ lineHeight: 1 }}
                          onClick={() => handleDeleteClick(customer)}
                        >
                          <Trash2 size={20}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
{showViewModal && viewCustomer && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
    <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative">
      <button
        className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
        onClick={() => setShowViewModal(false)}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-center text-[#7C2EEA]">View Customer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-[#7c3aed]">Type</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.type} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">GSTIN</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.gstin} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">PAN</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.pan} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Company Name</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.companyName} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">First Name</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.firstName} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Last Name</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.lastName} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Email</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.email} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Phone Number</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.phoneNumber} disabled />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold text-[#7c3aed]">Billing Address</label>
          <textarea className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.billingAddress} disabled />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold text-[#7c3aed]">Shipping Address</label>
          <textarea className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.shippingAddress} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Credit Limit</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.creditLimit} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Is Active</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.isActive ? "Yes" : "No"} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Opening Balance Amount</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.openingBalance?.amount} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Opening Balance Type</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.openingBalance?.type} disabled />
        </div>
        <div>
          <label className="block font-semibold text-[#7c3aed]">Opening Balance As Of</label>
          <input className="w-full border rounded px-2 py-1 bg-gray-100" value={viewCustomer.openingBalance?.asOf} disabled />
        </div>
        </div>
        </div>
        </div>
)}
        {/* Modal for Edit */}
        {showModal && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-[#eae3f5] rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative">
              <button
                className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-[#7C2EEA]">Edit Customer</h2>
              {modalSuccess && <div className="mb-2 text-green-600 text-center">{modalSuccess}</div>}
              {modalError && <div className="mb-2 text-red-600 text-center">{modalError}</div>}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = {
                    type: formData.get("type"),
                    gstin: formData.get("gstin"),
                    pan: formData.get("pan"),
                    companyName: formData.get("companyName"),
                    firstName: formData.get("firstName"),
                    lastName: formData.get("lastName"),
                    email: formData.get("email"),
                    phoneNumber: formData.get("phoneNumber"),
                    billingAddress: formData.get("billingAddress"),
                    shippingAddress: formData.get("shippingAddress"),
                    creditLimit: formData.get("creditLimit"),
                    isActive: formData.get("isActive") === "on",
                    openingBalance: {
                      amount: formData.get("openingBalance.amount"),
                      type: formData.get("openingBalance.type"),
                      asOf: formData.get("openingBalance.asOf"),
                    },
                  };
                  await handleUpdateSubmit(data);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto hide-scrollbar bg-gradient-to-br  p-6 rounded-xl "
              >
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Type</label>
                  <select
                    name="type"
                    defaultValue={selectedCustomer.type}
                    className="w-full border-1 border-[#a06ed7]  rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition"
                  >
                    <option value="">Select Type</option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">GSTIN</label>
                  <input name="gstin" defaultValue={selectedCustomer.gstin} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">PAN</label>
                  <input name="pan" defaultValue={selectedCustomer.pan} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Company Name</label>
                  <input name="companyName" defaultValue={selectedCustomer.companyName} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">First Name</label>
                  <input name="firstName" defaultValue={selectedCustomer.firstName} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Last Name</label>
                  <input name="lastName" defaultValue={selectedCustomer.lastName} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Email</label>
                  <input name="email" type="email" defaultValue={selectedCustomer.email} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Phone Number</label>
                  <input name="phoneNumber" defaultValue={selectedCustomer.phoneNumber} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold text-[#9673d3] my-2 ">Billing Address</label>
                  <textarea name="billingAddress" defaultValue={selectedCustomer.billingAddress} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-semibold text-[#9673d3] my-2 ">Shipping Address</label>
                  <textarea name="shippingAddress" defaultValue={selectedCustomer.shippingAddress} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Credit Limit</label>
                  <input name="creditLimit" type="number" defaultValue={selectedCustomer.creditLimit} className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition" />
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input
                    name="isActive"
                    type="checkbox"
                    defaultChecked={selectedCustomer.isActive}
                    className="h-5 w-5 accent-[#a06ed7]"
                    id="isActive"
                  />
                  <label htmlFor="isActive" className="font-semibold text-[#9673d3] my-2 ">Is Active</label>
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Opening Balance Amount</label>
                  <input
                    name="openingBalance.amount"
                    type="number"
                    defaultValue={selectedCustomer.openingBalance?.amount}
                    className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Opening Balance Type</label>
                  <select
                    name="openingBalance.type"
                    defaultValue={selectedCustomer.openingBalance?.type}
                    className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition"
                  >
                    <option value="">Select Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#9673d3] my-2 ">Opening Balance As Of</label>
                  <input
                    name="openingBalance.asOf"
                    type="date"
                    defaultValue={
                      selectedCustomer.openingBalance?.asOf
                        ? new Date(selectedCustomer.openingBalance.asOf).toISOString().slice(0, 10)
                        : ""
                    }
                    className="w-full border-1 border-[#a06ed7] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a06ed7] transition"
                  />
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#a06ed7] to-[#7c3aed] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:from-[#7c3aed] hover:to-[#a06ed7] transition-all duration-200"
                  >
                    Update Customer
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
                {/* Pagination Controls */}
                <div className="flex justify-center items-center mb-4 mt-6">
          <div></div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded bg-[#a06ed7] text-white disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPagesCalc}
            </span>
            <button
              className="px-3 py-1 rounded bg-[#a06ed7] text-white disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(totalPagesCalc, prev + 1))}
              disabled={currentPage === totalPagesCalc}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      

  );
};

export default FetchCustomer;

// Add this array to define all fields for editing
const editCustomerFields = [
  { name: "type", label: "Type", type: "text", placeholder: "Enter type" },
  { name: "gstin", label: "GSTIN", type: "text", placeholder: "Enter GSTIN" },
  { name: "pan", label: "PAN", type: "text", placeholder: "Enter PAN" },
  { name: "companyName", label: "Company Name", type: "text", placeholder: "Enter company name" },
  { name: "firstName", label: "First Name", type: "text", placeholder: "Enter first name" },
  { name: "lastName", label: "Last Name", type: "text", placeholder: "Enter last name" },
  { name: "email", label: "Email", type: "email", placeholder: "Enter email" },
  { name: "phoneNumber", label: "Phone Number", type: "text", placeholder: "Enter phone number" },
  { name: "billingAddress", label: "Billing Address", type: "text", placeholder: "Enter billing address" },
  { name: "shippingAddress", label: "Shipping Address", type: "text", placeholder: "Enter shipping address" },
  { name: "creditLimit", label: "Credit Limit", type: "number", placeholder: "Enter credit limit" },
  { name: "isActive", label: "Is Active", type: "checkbox" },
  // For nested openingBalance fields, use dot notation
  { name: "openingBalance.amount", label: "Opening Balance Amount", type: "number", placeholder: "Enter amount" },
  { name: "openingBalance.type", label: "Opening Balance Type", type: "text", placeholder: "Enter type" },
  { name: "openingBalance.asOf", label: "Opening Balance As Of", type: "date", placeholder: "Select date" },
];
