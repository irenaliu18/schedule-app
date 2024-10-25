import React, { useState } from 'react';
import Course from './Course';
import CourseForm from './CourseForm';
import CoursePlanModal from './CoursePlanModal';
import Modal from './Modal';
import TermSelector from './TermSelector';
import { hasTimeConflict } from '../../utilities/conflicts';
import { database, useAuth } from '../../utilities/firebase';

import { ref, update } from 'firebase/database'; // Make sure these are imported

const CourseList = ({ courses }) => {
  const user = useAuth();

  if (!courses) {
    console.error('Courses prop is not defined:', courses);
    return <div>No courses available</div>; // or any fallback UI
  }

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

  const openCoursePlanModal = () => {
    setModalOpen(true);
    console.log('Modal Opened:', modalOpen); // Debugging: Ensure modal state is changing
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
  };

  const handleEdit = (course) => {
    
    if (!user) return alert('Please sign in to edit courses.');
    console.log('Editing Course:', course);
    setEditingCourse(course);
    setFormData({ title: course.title, meets: course.meets });
    setModalOpen(true);
  }

  const handleCourseFormSubmit = (updatedCourse) => {
    const dbRef = ref(database, `courses/${updatedCourse.number}`); // Assuming number is unique
    console.log('Updated Course', updatedCourse.number);
    update(dbRef, {
      title: updatedCourse.title,
      meets: updatedCourse.meets,
    }).then(() => {
      console.log('Course updated successfully');
    }).catch((error) => {
      console.error('Error updating course:', error);
    });
  
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  }


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <TermSelector term={term} setTerm={setTerm} />
        <button className="btn btn-primary" onClick={openCoursePlanModal}>
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
            handleEdit={handleEdit}
            //user={user}
          />
        ))}
      </div>

      {/* Use CoursePlanModal for displaying selected courses */}
      <CoursePlanModal
        modalOpen={modalOpen && !editingCourse} // Open only when not editing a course
        closeModal={closeModal}
        selectedCourses={selectedCourses}
        selectedCourseDetails={termCourses.filter(course => selectedCourses.includes(course.number))}
      />

      {/* Modal for editing a course */}
      <Modal open={modalOpen && editingCourse} close={closeModal}>
        {editingCourse ? (
          <CourseForm 
            course={editingCourse}
            formData={formData}
            onSubmit={handleCourseFormSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <div>
            <h3>No course selected for editing</h3>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CourseList;