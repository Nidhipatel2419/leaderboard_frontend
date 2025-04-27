import React, { useState, useEffect } from "react";
import axios from 'axios';
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState("day");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, userId]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const res = await axios(
      `http://localhost:8080/users?filter=${filter}&userId=${userId}`,
      {
        method: "GET", // Specify the request method
        headers: {
          "Content-Type": "application/json", // Specify the content type
        }
      }
    );
    setLeaderboard(res.data?.data);
    setLoading(false);
  };

  const handleRecalculate = async () => {
    await fetch("http://localhost:8080/recalculate", { method: "POST" });
    fetchLeaderboard();
  };

  const handleOptionChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div style={{    "background": "#ebe8ef",
        "borderStyle": "solid",
        "marginRight": "200px",
        "marginTop": "100px",
        "marginLeft": "100px"}}>
      <h1>Leaderboard</h1>
      <label>User ID : </label>
      <input
        type="text"
        placeholder="Search by User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div>
        <label>Filter By : </label>
      <select value={filter} onChange={handleOptionChange}>
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
      <br/>
        <button onClick={handleRecalculate}>Recalculate</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User ID</th>
              <th>Name</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
