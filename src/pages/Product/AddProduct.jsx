import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const initialProductData = {
  productName: "",
  productDescription: "",
  productCategory: "",
  productPrice: "",
  productSku: "",
  productCostPrice: "",
  productQuantity: "",
  productType: "",
  productTag: "",
  productDiscount: "",
  productSupplierPrice: "",
  productSgst: "",
  productCgst: "",
  productIgst: "",
  productIsActive: true,
  productMinimumOrderQuantity: "",
  productWarranty: "",
};

const adminId = 145; // Replace with dynamic adminId if needed

const AddProduct = () => {
  const [form, setForm] = useState(initialProductData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...form, productIsActive: !!form.productIsActive };
      await axios.post(
        `http://192.168.0.123:3000/api/v1/product-add/${adminId}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Product created successfully!");
      setForm(initialProductData);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#f3e8ff] to-[#ede9fe] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full p-12 rounded-3xl shadow-2xl border border-white/60 bg-white/70 backdrop-blur-2xl z-0">
        <h2 className="text-4xl font-extrabold mb-10 text-[#a06ed7] drop-shadow text-center tracking-tight">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Description</label>
              <input
                type="text"
                name="productDescription"
                value={form.productDescription}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Category</label>
              <input
                type="text"
                name="productCategory"
                value={form.productCategory}
                onChange={handleChange}
                placeholder="Enter category"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                name="productPrice"
                value={form.productPrice}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">SKU</label>
              <input
                type="text"
                name="productSku"
                value={form.productSku}
                onChange={handleChange}
                placeholder="Enter SKU"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Cost Price</label>
              <input
                type="number"
                name="productCostPrice"
                value={form.productCostPrice}
                onChange={handleChange}
                placeholder="Enter cost price"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 4 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Quantity</label>
              <input
                type="number"
                name="productQuantity"
                value={form.productQuantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Type</label>
              <input
                type="text"
                name="productType"
                value={form.productType}
                onChange={handleChange}
                placeholder="Enter type"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 5 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Tags</label>
              <input
                type="text"
                name="productTag"
                value={form.productTag}
                onChange={handleChange}
                placeholder="Enter tags (comma separated)"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Discount (%)</label>
              <input
                type="number"
                name="productDiscount"
                value={form.productDiscount}
                onChange={handleChange}
                placeholder="Enter discount"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 6 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Supplier Price</label>
              <input
                type="number"
                name="productSupplierPrice"
                value={form.productSupplierPrice}
                onChange={handleChange}
                placeholder="Enter supplier price"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">SGST (%)</label>
              <input
                type="number"
                name="productSgst"
                value={form.productSgst}
                onChange={handleChange}
                placeholder="Enter SGST"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 7 */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">CGST (%)</label>
              <input
                type="number"
                name="productCgst"
                value={form.productCgst}
                onChange={handleChange}
                placeholder="Enter CGST"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">IGST (%)</label>
              <input
                type="number"
                name="productIgst"
                value={form.productIgst}
                onChange={handleChange}
                placeholder="Enter IGST"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 8 */}
          <div className="flex gap-6">
            <div className="w-1/2 flex items-center gap-2">
              <input
                type="checkbox"
                name="productIsActive"
                checked={form.productIsActive}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <label className="font-semibold">Is Active</label>
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Minimum Order Quantity</label>
              <input
                type="number"
                name="productMinimumOrderQuantity"
                value={form.productMinimumOrderQuantity}
                onChange={handleChange}
                placeholder="Enter minimum order quantity"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          {/* Row 9 */}
          <div>
            <label className="block font-semibold mb-1">Warranty</label>
            <input
              type="text"
              name="productWarranty"
              value={form.productWarranty}
              onChange={handleChange}
              placeholder="Enter warranty details"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-6 text-lg py-2 bg-gradient-to-r from-[#a06ed7] to-[#7c3aed] text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;