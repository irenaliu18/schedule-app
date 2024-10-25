// TermSelector.js
import React from 'react';

const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input type="radio" id={term} className='btn-check' checked={checked} autoComplete='off'
      onChange={() => setTerm(term)} />
    <label className='btn btn-success m-1 p-2' htmlFor={term}>
      {term}
    </label>
  </>
);

const TermSelector = ({ term, setTerm }) => {
  const terms = ['Fall', 'Winter', 'Spring'];

  return (
    <div className="btn-group">
      {terms.map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
      ))}
    </div>
  );
};

export default TermSelector;
