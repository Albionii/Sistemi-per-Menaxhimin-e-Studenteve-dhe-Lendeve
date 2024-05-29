import React from 'react';

const CurrentDay = () => {
  // Get the current date
  const currentDate = new Date();

  // Get the day of the week in Albanian (e.g., "E Hënë" for Monday)
  const currentDay = new Intl.DateTimeFormat('sq-AL', { weekday: 'long' }).format(currentDate);

  return (
    <div>
      <h2>Sot është {currentDay}</h2>
    </div>
  );
};

export default CurrentDay;
