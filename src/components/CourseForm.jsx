import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseForm = ({ courses }) => {
  const { id } = useParams(); // get course ID from the route
  const course = courses[id]; // find course by ID (in edit mode)

  const [title, setTitle] = useState(course ? course.title : '');
  const [term, setTerm] = useState(course ? course.term : '');
  const [meets, setMeets] = useState(course ? course.meets : '');
  
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/'); // return to the course list when cancel is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we will handle form submission logic later
    // For now, it does nothing
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Term</label>
        <input 
          type="text" 
          className="form-control"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Meeting Times</label>
        <input 
          type="text" 
          className="form-control"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
        />
      </div>

      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CourseForm;
