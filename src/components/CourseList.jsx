import React, { useState } from 'react';
import Course from './Course';
import Modal from './Modal';
import { hasTimeConflict } from '../../utils/conflicts';


const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', meets: ''});

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

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ title: course.title, meets: course.meets });
    openModal();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    closeModal();
  }

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
{editingCourse ? (
          <div>
            <h3>Edit Course</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label htmlFor="courseTitle" className="form-label">Course Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="courseTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="courseMeets" className="form-label">Meeting Time</label>
                <input
                  type="text"
                  className="form-control"
                  id="courseMeets"
                  name="meets"
                  value={formData.meets}
                  onChange={handleInputChange}
                />
              </div>
              {/* Cancel button */}
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h3>No course selected for editing</h3>
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

