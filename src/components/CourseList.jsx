import React, { useState } from 'react';
import Course from './Course';


// Function to get the term of a course
// const getCourseTerm = (course) => {
//   return course.term; // Assuming the 'term' property exists in the course object
// };

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.values(courses).filter(course => term === course.term);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className='course-list'>
        { termCourses.map(course => <Course key ={course.number} course={course} /> )}
      </div>
    </>
  );
};

const TermButton = ({term, setTerm, checked}) => (
  <>
  <input type="radio" id={term} className='btn-check' checked={checked} autoComplete='off'
    onChange={ () => setTerm(term)} />
  <label class='btn btn-success m-1 p-2' htmlFor={term}>
    {term}
    </label>
  </>
);
const TermSelector = ({term, setTerm}) => {
  const terms = ['Fall', 'Winter', 'Spring'];

  return (
  <div className="btn-group">
    {
      Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      ))
    }
  </div>
);
  };



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

