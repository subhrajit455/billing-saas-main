import ReusableForm from "@/components/Form/Form";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const categoryFields = [
  { name: "categoryName", label: "Category Name", placeholder: "Enter category name" },
  { name: "categoryDescription", label: "Description", placeholder: "Enter description" },
];

const initialCategoryData = {
  categoryName: "",
  categoryDescription: ""
};

const adminId = 145; // Replace with dynamic adminId if needed

const AddCategory = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        `http://192.168.0.123:3000/api/v1/product-category-add/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API response:", response.data);
      toast.success("Category created successfully!");
      // Optionally reset form or redirect
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-br p-3 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl bg-white/40 border w-full h-full p-8 rounded-3xl shadow-2xl backdrop-blur-5xl border-white/40 z-0">
        <h2 className="text-3xl font-bold mb-8 text-[#a06ed7] drop-shadow text-center">Add Category</h2>
        <ReusableForm
          fields={categoryFields}
          onSubmit={handleSubmit}
          initialValues={initialCategoryData}
          submitButton={
            <Button
              type="submit"
              className="w-full mt-4 text-lg py-1 bg-[#a06ed7] text-white"
            >
              Save Category
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default AddCategory;