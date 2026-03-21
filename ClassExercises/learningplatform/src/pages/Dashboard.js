import { useState } from "react";
import StatsCard from "../components/StatsCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 120,
    sales: 75,
  });

  const updateUsers = () => {
    setStats({ ...stats, users: stats.users + 1 });
  };

  return (
    <div className="container">
      <h2 className="page-title">Dashboard Widgets</h2>

      <div className="card-grid">
        <StatsCard
          title="Users"
          value={stats.users}
          lastUpdated={new Date().toLocaleTimeString()}
        />

        <StatsCard
          title="Sales"
          value={stats.sales}
          lastUpdated={new Date().toLocaleTimeString()}
        />
      </div>

      <button className="btn btn-warning" onClick={updateUsers}>
        Simulate Update
      </button>
    </div>
  );
};

export default Dashboard;
