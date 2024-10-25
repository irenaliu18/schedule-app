import React from 'react';
import Modal from './Modal'; // Assuming you have a Modal component

const CoursePlanModal = ({ modalOpen, closeModal, selectedCourses, selectedCourseDetails }) => {
  return (
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
  );
};

export default CoursePlanModal;
