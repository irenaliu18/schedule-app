import React from 'react';
import '../Course.css';

const Course = ({ course, selected, toggleSelected }) => (
    <div 
        className={`card m-1 p-2 ${selected ? 'selected' : ''}`}
        onClick={() => toggleSelected(course)}
    >
        <div className='card-body'>
            <div className='card-title'>{course.term} CS {course.number}</div>
            <div className='card-text'>{course.title}</div>
            <div className='card-text'>{course.meets}</div>

        </div>
    </div>
    
);
export default Course;