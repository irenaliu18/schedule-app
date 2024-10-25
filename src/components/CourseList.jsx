import React, { useState, useEffect} from 'react';
import Course from './Course';
import CourseForm from './CourseForm';
import CoursePlanModal from './CoursePlanModal';
import Modal from './Modal';
import TermSelector from './TermSelector';
import { hasTimeConflict } from '../../utilities/conflicts';
import { database, useAuth } from '../../utilities/firebase';

import { ref, update, onValue } from 'firebase/database'; 

const CourseList = ({ courses }) => {
  const user = useAuth();
  const [term, setTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', meets: ''});
  const [course, setCourses] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      const adminRef = ref(database, `admin/${user.uid}`);
      onValue(adminRef, (snapshot) => {
        console.log("Admin path snapshot:", snapshot.val()); 
        setIsAdmin(!!snapshot.val());
        console.log("admin status", isAdmin);
      });
    }
  }, [user]);
  
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
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCourse(null);
  };

  const handleEdit = (course) => {

    setEditingCourse({ ...course});
    setFormData({ title: course.title, meets: course.meets });
    setModalOpen(true);
  }

  const handleCourseFormSubmit = (updatedCourse) => {
    
    const matchedKey = Object.keys(courses).find(key => key.includes(updatedCourse.number));

    if (!matchedKey) {
      console.error(`Course with ID ${updatedCourse.number} not found.`);
      return;
    }
  
    const dbRef = ref(database, `courses/${matchedKey}`);

    update(dbRef, {
      title: updatedCourse.title,
      meets: updatedCourse.meets,
    }).then(() => {
      console.log('Course updated successfully');
      setCourses((prevCourses) => ({
        ...prevCourses,
        [matchedKey]: {
          ...prevCourses[matchedKey],
          ...updatedCourse
        }
      }));
    }).catch((error) => {
      console.error('Error updating course:', error);
    });
  
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  }

  const selectedCourseDetails = Object.values(courses).filter(course => 
    selectedCourses.includes(course.number)
  );

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
            isAdmin={isAdmin}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      {/* Displaying selected courses */}
      <CoursePlanModal
        modalOpen={modalOpen && !editingCourse}
        closeModal={closeModal}
        selectedCourses={selectedCourses}
        selectedCourseDetails={selectedCourseDetails}
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