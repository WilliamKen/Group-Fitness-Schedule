import React, { useState, useEffect } from 'react';
import Airtable from 'airtable';
import Modal from 'react-modal';
import ClassDetails from './ClassDetails';
import './Schedule.css';
import getClassColor from './ClassColor';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    base('Classes').select({ view: 'Classes' }).eachPage((records, fetchNextPage) => {
      const fetchedClasses = records.map(record => ({
        id: record.id,
        day: record.get('Day'),
        className: record.get('Class Name'),
        instructor: record.get('Instructor'),
        time: record.get('Time'),
        location: record.get('Location'),
        description: record.get('Description'),
      }));
      setClasses(fetchedClasses);
      fetchNextPage();
    }, (err) => {
      if (err) {
        console.error(err);
        setError(err);
      }
      setLoading(false);
    });
  }, []);

  const handleClick = (fitnessClass) => {
    setSelectedClass(fitnessClass);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  const locations = [
    { name: 'MP 1', color: getClassColor('MP 1').full },
    { name: 'MP 2', color: getClassColor('MP 2').full },
    { name: 'MAC Gym', color: getClassColor('MAC Gym').full },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="schedule-container">
      <h1 className="title">Group Fitness Schedule</h1>
      <div className="legend">
        {locations.map((location, index) => (
          <div key={index} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: location.color }}></span>
            {location.name}
          </div>
        ))}
      </div>
      <div className="schedule">
        {days.map(day => (
          <div key={day} className="day-column">
            <h2>{day}</h2>
            {classes.filter(fitnessClass => fitnessClass.day === day).map(fitnessClass => {
              const colors = getClassColor(fitnessClass.location);
              return (
                <div
                  key={fitnessClass.id}
                  className="class-cell"
                  data-location={fitnessClass.location}
                  style={{
                    '--full-color': colors.full,
                  }}
                  onClick={() => handleClick(fitnessClass)}
                >
                  <div className="class-name">{fitnessClass.className}</div>
                  <div className="instructor">{fitnessClass.instructor}</div>
                  <div className="time">{fitnessClass.time}</div>
                  <div className="location">{fitnessClass.location}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {selectedClass && (
        <Modal
          isOpen={!!selectedClass}
          onRequestClose={closeModal}
          contentLabel="Class Details"
          className="modal"
          overlayClassName="overlay"
        >
          <button onClick={closeModal} className="close-button">X</button>
          <ClassDetails fitnessClass={selectedClass} />
        </Modal>
      )}
    </div>
  );
};

export default Schedule;
