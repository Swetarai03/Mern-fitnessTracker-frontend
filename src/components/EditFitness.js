import UserForm from "./UserForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";

export default function EditFitness() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState({ Name: "", Activity: "", Duration: "", Date: "" ,Token: ""});
  const [newData, setNewData] = useState(initialValue);

  useEffect(() => {
    Axios.get("https://mern-fitnesstracker-project.onrender.com/fitRoute/update-fitness/" + id)
      .then((res) => {
        if (res.status === 200) {
          const { Name, Activity, Duration, Date } = res.data;
          
          setInitialValue({ Name, Activity, Duration, Date });
          setNewData({ Name, Activity, Duration, Date });
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
  }, [id]);

  const getState = (childData) => {
    setNewData(childData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newData.Token = sessionStorage.getItem("token");
    console.log(newData);
    Axios.put("https://mern-fitnesstracker-project.onrender.com/fitRoute/update-fitness/" + id, newData)
      .then((res) => {
        if (res.status === 200) {
          alert("Record updated successfully");
          navigate("/user-list"); // Redirect to the dashboard after update
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <UserForm
        getState={getState}
        NameValue={initialValue.Name}
        ActivityValue={initialValue.Activity}
        DurationValue={initialValue.Duration}
        DateValue={initialValue.Date}
      />
    </form>
  );
}
