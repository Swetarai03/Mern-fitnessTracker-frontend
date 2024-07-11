import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UserDashboardRow = ({ obj }) => {
  const { _id, Name, Activity, Duration, Date } = obj;
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleClick = () => {
    Axios.delete(`https://mern-fitnesstracker-project.onrender.com/fitRoute/delete-fitness/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Record deleted successfully");
          window.location.reload(); // Refreshing the page after deletion
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        if (err.response) {
          console.error("Server responded with status:", err.response.status);
          alert("Failed to delete record: Server error");
        } else if (err.request) {
          console.error("No response received:", err.request);
          alert("Failed to delete record: No response received");
        } else {
          console.error("Error setting up request:", err.message);
          alert("Failed to delete record: Request setup error");
        }
      });
  };

  const toggleAnalysis = () => {
    setShowAnalysis(!showAnalysis);
  };

  return (
    <>
      <tr>
        <td>{Name}</td>
        <td>{Activity}</td>
        <td>{Duration}</td>
        <td>{Date}</td>
        <td>
          <button className="btn btn-success">
            <Link className="text-decoration-none text-light" to={`/edit-fitness/${_id}`}>
              Edit
            </Link>
          </button>
          <button onClick={handleClick} className="btn btn-danger">
            Delete
          </button>
          <button onClick={toggleAnalysis} className="btn btn-info ml-2"> {/* Added ml-2 class */}
            {showAnalysis ? "Hide Analysis" : "Analyze"}
          </button>
        </td>
      </tr>
      {showAnalysis && (
        <tr>
          <td colSpan="5">
            <div className="analysis-container">
              <h3>Analysis for {Name}</h3>
              <p>Activity: {Activity}</p>
              <p>Duration: {Duration} minutes</p>
              <p>Date: {Date}</p>
              {/* Add more analysis details here */}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UserDashboardRow;
