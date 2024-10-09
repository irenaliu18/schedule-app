import React from 'react';
import Course from './Course';

const CourseList = ({ courses }) => (
  <div className='course-list'>
    { Object.values(courses).map(course => <Course key ={course.number} course={course} /> )}
  </div>
)

export default CourseList;
// const CourseList = ({ courses }) => (
//   <div>
//     <ul>
//       {Object.entries(courses).map(([id, course]) => (
//         <li key={id}>
//           <h2>{course.term} {course.number} - {course.title}</h2>
//           <p>{course.meets}</p>
//         </li>
//       ))}
//     </ul>
//   </div>
// );

