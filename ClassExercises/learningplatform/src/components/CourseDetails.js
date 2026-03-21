import React from "react";

function CourseDetails() {
  console.log("CourseDetails Loaded");

  return (
    <div className="content-card">
      <h2 className="section-heading">Course Details</h2>

      <p className="section-text">
        This course covers advanced React concepts including:
      </p>

      <ul className="feature-list">
        <li>Lazy Loading</li>
        <li>Error Boundaries</li>
        <li>React Portals</li>
        <li>Performance Optimization</li>
      </ul>
    </div>
  );
}

export default CourseDetails;
