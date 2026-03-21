import React from "react";

function InstructorProfile() {
  console.log("InstructorProfile Loaded");

  return (
    <div className="content-card">
      <h2 className="section-heading">Instructor Profile</h2>

      <div className="profile-info">
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Experience:</strong> 10 years in React Development
        </p>
        <p>
          <strong>Specialization:</strong> Frontend Architecture
        </p>
      </div>
    </div>
  );
}

export default InstructorProfile;
