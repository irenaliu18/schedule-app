import React from 'react';

const CourseList = ({ courses }) => (
  <div>
    <ul>
      {Object.entries(courses).map(([id, course]) => (
        <li key={id}>
          <h2>{course.term} {course.number} - {course.title}</h2>
          <p>{course.meets}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default CourseList;
