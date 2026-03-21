import React from "react";

const StatsCard = React.memo(({ title, value, lastUpdated }) => {
  console.log(title, "re-rendered");

  return (
    <div className="stats-card">
      <h3>{title}</h3>

      <div className="stat-number">{value}</div>

      <p className="stat-time">Updated {lastUpdated}</p>
    </div>
  );
});

export default StatsCard;
