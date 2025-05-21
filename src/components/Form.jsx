import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "../data/countries";

function Form() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Valid 10-digit Phone No. required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan))
      newErrors.pan = "Valid PAN is required (e.g., ABCDE1234F)";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Valid 12-digit Aadhar is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formData });
    }
  };

  const isDisabled = Object.values(formData).some((v) => v === "");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Registration</h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Input Field */}
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Username", name: "username" },
          { label: "Email", name: "email", type: "email" },
          { label: "PAN No.", name: "pan" },
          { label: "Aadhar No.", name: "aadhar" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Password Field */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-4 bg-gray-100 border border-gray-300 rounded-r-md text-sm hover:bg-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Phone No.</label>
          <div className="flex">
            <input
              name="phoneCode"
              value={formData.phoneCode}
              readOnly
              className="w-16 border border-gray-300 bg-gray-100 rounded-l-md p-2 text-center"
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="flex-grow border border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* Country Field */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* City Field */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select City</option>
            {(countries.find((c) => c.name === formData.country)?.cities || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-2 rounded-md text-white font-medium transition ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
