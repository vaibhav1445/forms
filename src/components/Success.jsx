import { useLocation, useNavigate } from "react-router-dom";
function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>No form data found!</h2>
        <button onClick={() => navigate("/")}>Go back to Form</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Form Submitted Successfully 🎉</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li><strong>First Name:</strong> {state.firstName}</li>
        <li><strong>Last Name:</strong> {state.lastName}</li>
        <li><strong>Username:</strong> {state.username}</li>
        <li><strong>Email:</strong> {state.email}</li>
        <li><strong>Phone:</strong> {state.phoneCode} {state.phoneNumber}</li>
        <li><strong>Country:</strong> {state.country}</li>
        <li><strong>City:</strong> {state.city}</li>
        <li><strong>PAN No.:</strong> {state.pan}</li>
        <li><strong>Aadhar No.:</strong> {state.aadhar}</li>
      </ul>
      <button onClick={() => navigate("/")}>Back to Form</button>
    </div>
  );
}

export default Success;
