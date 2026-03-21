import React, { useState, Suspense } from "react";

const CourseDetails = React.lazy(() => import("../components/CourseDetails"));
const InstructorProfile = React.lazy(
  () => import("../components/InstructorProfile"),
);

function Courses() {
  const [course, setCourse] = useState(false);
  const [instructor, setInstructor] = useState(false);

  return (
    <div className="container">
      <h2 className="page-title text-center "><mark>Course Modules<mark/></mark></h2>

      <div className="course-actions">
        <button
          className="btn btn-primary course-btn gap-"
          onClick={() => setCourse(true)}
        >
          📘 View Course Details
        </button>

        <button
          className="btn btn-warning course-btn ms-3"
          onClick={() => setInstructor(true)}
        >
          👨‍🏫 View Instructor
        </button>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        {course && <CourseDetails />}
        {instructor && <InstructorProfile />}
      </Suspense>
    </div>
  );
}

export default Courses;
