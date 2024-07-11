import Axios from "axios";
import UserDashboardRow from "./UserDashboardRow";
import './UserDashboard.css';

import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    var token = {"token" : sessionStorage.getItem("token")};
    if(sessionStorage.getItem("token") != undefined){
    Axios.post("https://mern-fitnesstracker-project.onrender.com/fitRoute/",token)
      .then((res) => {
        if (res.status === 200)
        {
          setArr(res.data);
        }
        else
          Promise.reject();
      })
      .catch((err) => alert(err));}
  }, []);

  const ListItems = () => {
    return arr.map((val, ind) => {
      return <UserDashboardRow key={ind} obj={val} />;
    });
  };

  if(sessionStorage.getItem("token") != undefined){
  return (
    <div className="dashboard-container">
      <h1 className="text-center">Fitness Dashboard</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Activity</th>
              <th className="text-center">Duration</th>
              <th className="text-center">Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {ListItems()}
          </tbody>
        </table>
      </div>
    </div>
  );}
  else
  {
    return (
      <div className="dashboard-container">
        <h1 className="text-center">Fitness Dashboard</h1>
        <div className="table-responsive">
          Please Login to Access your Dashboard
        </div>
      </div>
    );
  }
}
