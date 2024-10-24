import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CourseForm = ({ courses }) => {
  const { id } = useParams(); // get course ID from the route
  const course = courses[id]; // find course by ID (in edit mode)

  const [title, setTitle] = useState(course ? course.title : '');
  const [term, setTerm] = useState(course ? course.term : '');
  const [meets, setMeets] = useState(course ? course.meets : '');

  const [titleError, setTitleError] = useState('');
  const [meetsError, setMeetsError] = useState('');
  
  const navigate = useNavigate();

  const isValidMeetingTime = (meets) => {
    if (meets === '') return true;
    const meetsRegex = /^[MTWRF]{1,5} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
    return meetsRegex.test(meets);
  };

  const validateForm = () => {
    let valid = true;

    if (title.length < 2) {
      setTitleError('Title must be at least 2 characters.');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!isValidMeetingTime(meets)){
      setMeetsError('Must contain days and start-end, e.g., MWF 12:00 - 13:20');
      valid = false;
    } else {
      setMeetsError('');
    }
    return valid;
  };

  
  const handleCancel = () => {
    navigate('/'); // return to the course list when cancel is clicked
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted with:', { title, term, meets });
      navigate('/');
    }
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
        {titleError && <div className="text-danger">{titleError}</div>} {/* Display error */}
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
        {meetsError && <div className="text-danger">{meetsError}</div>} {/* Display error */}
      </div>

      <div className="button-group" style={{ marginTop: '20px' }}>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
    Cancel
  </button>
</div>
    </form>
  );
};

export default CourseForm;
