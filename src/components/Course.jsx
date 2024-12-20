import React, { useState } from 'react';
import { useAuth } from '../../utilities/firebase';
const Course = ({ course, selected, toggleSelected, selectable, isAdmin, handleEdit }) => {
    const user = useAuth();
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
                
                {isHovered && isAdmin && (
                    <button className="btn btn-primary" onClick={() => handleEdit(course)}>
                        Edit
                    </button>
                )}
            </div>
        </div>   
    );
};
export default Course;