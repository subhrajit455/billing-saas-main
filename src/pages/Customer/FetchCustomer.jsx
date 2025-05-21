import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableForm from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
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

      <div className="w-[1600px] p-8  z-0">
        <h2 className="text-3xl font-bold mb-8 text-[#a06ed7] drop-shadow text-center">Customer List</h2>
        {/* Search Bar */}
        <div className="flex justify-start mb-4 ">
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
          <div className="w-full overflow-x-auto">
            <div className="h-96 overflow-y-auto">
              <table className="min-w-[1200px] hide-scrollbar rounded-xl overflow-hidden shadow bg-white/60 backdrop-blur-sm border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gradient-to-r bg-[#e7d6fa] text-[#7c3aed]">    
                    <th className="px-6 py-4 font-semibold text-left">Action</th>
                    <th className="px-6 py-4 font-semibold text-left">First Name</th>
                    <th className="px-6 py-4 font-semibold text-left">Last Name</th>
                    <th className="px-6 py-4 font-semibold text-left">Email</th>
                    <th className="px-6 py-4 font-semibold text-left">Phone</th>
                    <th className="px-6 py-4 font-semibold text-left">Company Name</th>
                    <th className="px-6 py-4 font-semibold text-left">GSTIN</th>
                    <th className="px-6 py-4 font-semibold text-left">PAN</th>
                    <th className="px-6 py-4 font-semibold text-left">Billing Address</th>
                    <th className="px-6 py-4 font-semibold text-left">Shipping Address</th>
                    <th className="px-6 py-4 font-semibold text-left">Credit Limit</th>
                    <th className="px-6 py-4 font-semibold text-left">Type</th>
                    <th className="px-6 py-4 font-semibold text-left">Is Active</th>
                    <th className="px-6 py-4 font-semibold text-left">Opening Balance Amount</th>
                    <th className="px-6 py-4 font-semibold text-left">Opening Balance Type</th>
                    <th className="px-6 py-4 font-semibold text-left">Opening Balance As Of</th>
               
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
                       <td className="px-6 py-4 flex gap-4">
                        {/* Edit Icon */}
                        <button
                          title="Edit"
                          className="text-[#7c3aed] hover:text-[#a06ed7] transition"
                          onClick={() => handleEditClick(customer)}
                        >
                        <Pencil/>
                        </button>
                        {/* Delete Icon */}
                        <button
                          title="Delete"
                          className="text-red-500 hover:text-red-700 transition"
                          onClick={() => handleDeleteClick(customer)}
                        >
                          <Trash2 />
                        </button>
                      </td>
                      <td className="px-6 py-4">{customer.firstName}</td>
                      <td className="px-6 py-4">{customer.lastName}</td>
                      <td className="px-6 py-4">{customer.email}</td>
                      <td className="px-6 py-4">{customer.phoneNumber}</td>
                      <td className="px-6 py-4">{customer.companyName}</td>
                      <td className="px-6 py-4">{customer.gstin}</td>
                      <td className="px-6 py-4">{customer.pan}</td>
                      <td className="px-6 py-4">{customer.billingAddress}</td>
                      <td className="px-6 py-4">{customer.shippingAddress}</td>
                      <td className="px-6 py-4">{customer.creditLimit}</td>
                      <td className="px-6 py-4">{customer.type}</td>
                      <td className="px-6 py-4">{customer.isActive ? "Yes" : "No"}</td>
                      <td className="px-6 py-4">{customer.openingBalance?.amount}</td>
                      <td className="px-6 py-4">{customer.openingBalance?.type}</td>
                      <td className="px-6 py-4">
                        {customer.openingBalance?.asOf
                          ? new Date(customer.openingBalance.asOf).toLocaleDateString()
                          : ""}
                      </td>
                     
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}

        {/* Modal for Edit */}
        {showModal && selectedCustomer && (
          <div className="fixed inset-0 flex items-center justify-center   ">
            <div className=" rounded-3xl shadow-2xl p-8 max-w-xl w-full relative bg-white z-50">
              <button
                className="absolute top-2 right-4 text-2xl text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center text-[#7C2EEA]">Edit Customer</h2>
              {modalSuccess && <div className="mb-2 text-green-600 text-center">{modalSuccess}</div>}
              {modalError && <div className="mb-2 text-red-600 text-center">{modalError}</div>}
              <ReusableForm
                fields={customerFields}
                onSubmit={handleUpdateSubmit}
                initialValues={selectedCustomer}
                submitButton={
                  <Button type="submit" className="w-full mt-4">
                    Update Customer
                  </Button>
                }
              />
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