import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../css/DateSelector.css'

function DateSelector({ selectedDate, setSelectedDate }) {

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  return (
    <div id='date-selector-container'>
      <DatePicker selected={selectedDate} onChange={handleDateChange} />
      {/* {selectedDate && (
        <p>You selected: {selectedDate.toLocaleDateString()}</p>
      )} */}
    </div>
  );
}

export default DateSelector;
