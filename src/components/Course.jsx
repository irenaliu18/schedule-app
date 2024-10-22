import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Course.css';

const Course = ({ course, selected, toggleSelected, selectable }) => {

    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <div 
            className={`card m-1 p-2 ${selected ? 'selected' : ''} ${!selectable ? 'unselectable' : ''}`}
            onClick={() => selectable && toggleSelected(course)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ backgroundColor: selectable ? 'white' : 'red'}}
        >
            <div className='card-body'>
                <div className='card-title'>{course.term} CS {course.number}</div>
                <div className='card-text'>{course.title}</div>
                <div className='card-text'>{course.meets}</div>

                {isHovered && (
                    <Link to={`/courses/${course.number}/edit`} className="btn btn-primary">
                        Edit
                    </Link>
                )}
            </div>
        </div>   
    );
};
export default Course;