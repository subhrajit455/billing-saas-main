// components/ReusableForm.jsx
import React, { useState } from "react";

const ReusableForm = ({ fields, onSubmit, initialValues = {} , submitButton }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ name, label, type = "text", placeholder }, idx) => (
        <div key={idx}>
          <label className="block font-semibold">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      ))}
      {submitButton ? submitButton : (
        <button type="submit" className="bg-[#a06ed7] text-white px-4 py-2 rounded">
          Submit
        </button>
      )}
    </form>
  );
};

export default ReusableForm;
