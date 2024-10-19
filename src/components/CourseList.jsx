import React, { useState } from 'react';
import Course from './Course';
import Modal from './Modal';
import { hasTimeConflict } from '../../utils/conflicts';


const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  const [modalOpen, setModalOpen] = useState(false);

  const termCourses = Object.values(courses).filter(course => term === course.term);

  const isSelectable = (course) => {
    if (selectedCourses.includes(course.number)){
      return true;
    }
    return !selectedCourses.some(selectedCourseNumber => {
      const selectedCourse = termCourses.find(c => c.number === selectedCourseNumber);
      return hasTimeConflict(course, selectedCourse);
    });
  };

  const toggleSelected = (course) => {
    if (!isSelectable(course) && !selectedCourses.includes(course.number)) {
      return;
    }
    setSelectedCourses(
      selectedCourses.includes(course.number)
      ? selectedCourses.filter(id => id !== course.number)
      : [...selectedCourses, course.number]
    );
  };

  const openModal = () => {
    setModalOpen(true);
    console.log('Modal Opened:', modalOpen); // Debugging: Ensure modal state is changing
  };
  const closeModal = () => setModalOpen(false);

  const selectedCourseDetails = termCourses.filter(course => selectedCourses.includes(course.number));

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TermSelector term={term} setTerm={setTerm} />
        <button className="btn btn-primary" onClick={openModal}>
          Course Plan
        </button>
      </div>

      <div className="course-list">
        {termCourses.map(course => (
          <Course
            key={course.number}
            course={course}
            selected={selectedCourses.includes(course.number)}
            selectable={isSelectable(course)}
            toggleSelected={() => toggleSelected(course)}
          />
        ))}
      </div>

      <Modal open={modalOpen} close={closeModal}>
        {selectedCourses.length === 0 ? (
          <div>
            <h3>No courses selected</h3>
            <p>Select courses by clicking on them from the list.</p>
          </div>
        ) : (
          <div>
            <h3>Selected Courses</h3>
            <ul>
              {selectedCourseDetails.map(course => (
                <li key={course.number}>
                  <strong>{course.number}:</strong> {course.title} - {course.meets}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
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

