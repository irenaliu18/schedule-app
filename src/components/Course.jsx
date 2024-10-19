import React from 'react';
import '../Course.css';

const Course = ({ course, selected, toggleSelected, selectable }) => (
    <div 
        className={`card m-1 p-2 ${selected ? 'selected' : ''} ${!selectable ? 'unselectable' : ''}`}
        onClick={() => selectable && toggleSelected(course)}
        style={{ backgroundColor: selectable ? 'white' : 'red'}}
    >
        <div className='card-body'>
            <div className='card-title'>{course.term} CS {course.number}</div>
            <div className='card-text'>{course.title}</div>
            <div className='card-text'>{course.meets}</div>

        </div>
    </div>
    
);
export default Course;