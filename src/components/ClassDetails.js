import React from 'react';

const ClassDetails = ({ fitnessClass }) => {
  return (
    <div>
      <h2>Class Details</h2>
      <p><strong>Class Name:</strong> {fitnessClass.className}</p>
      <p><strong>Instructor:</strong> {fitnessClass.instructor}</p>
      <p><strong>Time:</strong> {fitnessClass.time}</p>
      <p><strong>Location:</strong> {fitnessClass.location}</p>
      <p><strong>Description:</strong> {fitnessClass.description}</p>
    </div>
  );
};

export default ClassDetails;
