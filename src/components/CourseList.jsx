import React, { useState } from 'react';
import Course from './Course';


// Function to get the term of a course
// const getCourseTerm = (course) => {
//   return course.term; // Assuming the 'term' property exists in the course object
// };

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const termCourses = Object.values(courses).filter(course => term === course.term);

  const toggleSelected = (course) => {
    setSelectedCourses(
      selectedCourses.includes(course.number)
      ? selectedCourses.filter(id => id !== course.number)
      : [...selectedCourses, course.number]
    );
  };

  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className='course-list'>
        { termCourses.map(course => (
        <Course 
          key ={course.number} 
          course={course}
          selected={selectedCourses.includes(course.number)}
          toggleSelected={toggleSelected} /> 
          ))}
      </div>
    </>
  );
};

const TermButton = ({term, setTerm, checked}) => (
  <>
  <input type="radio" id={term} className='btn-check' checked={checked} autoComplete='off'
    onChange={ () => setTerm(term)} />
  <label className='btn btn-success m-1 p-2' htmlFor={term}>
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