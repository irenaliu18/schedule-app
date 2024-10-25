import React, { useState, useEffect } from 'react';

const CourseForm = ({ course, onSubmit, onCancel }) => {

  const [title, setTitle] = useState(course ? course.title : '');
  const [meets, setMeets] = useState(course ? course.meets : '');
  const [errors, setErrors] = useState({});
  
  // Initialize form data when course is passed in
  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setMeets(course.meets || '');
    }
  }, [course]);

  const validateForm = () => {
    const newErrors = {};

    // Validate title (must be at least 2 characters)
    if (title.length < 2) {
      newErrors.title = "Title must be at least 2 characters long.";
    }

    // Validate meeting time
    const meetsPattern = /^[MTWRF]{1,5}\s+\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (meets && !meetsPattern.test(meets)) {
      newErrors.meets = "Meeting time must be in format, e.g., 'MWF 12:00-13:20'.";
    }

    setErrors(newErrors);

    // If no errors, return true, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedCourse = { ...course, title, meets };
      onSubmit(updatedCourse); // Pass updated course data back to parent
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label>Meeting Times</label>
        <input 
          type="text" 
          className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
        />
        {errors.meets && <div className="invalid-feedback">{errors.meets}</div>}
      </div>

      <div className="d-flex justify-content-between mt-3">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseForm;