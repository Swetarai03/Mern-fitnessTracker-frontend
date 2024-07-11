import { useState } from "react";
import UserForm from "./UserForm";
import Axios from "axios";

export default function UserDashboard() {

  const [formData, setFormData] = useState({
    Name: "",
    Activity: "",
    Duration: "",
    Date: "",
    User: ""
  });

  const getState = (childData) => {
    setFormData(childData);
  };

  const handleSubmit = (event) => {

    formData.User = sessionStorage.getItem("token");
    Axios.post("https://mern-fitnesstracker-project.onrender.com/fitRoute/create-fitness", formData)
      .then((res) => {
        console.log(formData);
        if (res.status === 200) {
          alert("New record added successfully");
        } else {
          console.error("Unexpected response:", res);
          alert("Failed to add new record: Unexpected response");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
          console.error("Server responded with status:", err.response.status);
          // alert("Failed to add new record: Server error");
        } else if (err.request) {
          console.error("No response received:", err.request);
          // alert("Failed to add new record: No response received");
        } else {
          console.error("Error setting up request:", err.message);
          // alert("Failed to add new record: Request setup error");
        }
      });

    event.target.reset(); // Reset the form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserForm getState={getState} />
    </form>
  );
}

