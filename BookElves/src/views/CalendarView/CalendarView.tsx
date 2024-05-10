import React, { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';

const CalendarView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pagesRead, setPagesRead] = useState<number>(0);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Reset pages read when a new date is selected
    setPagesRead(0);
  };

  const handlePagesReadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagesRead(Number(event.target.value));
  };

  return (
    <div className="app">
      <h1>Book Reading Tracker</h1>
      <Calendar onDateSelect={handleDateSelect} />
      {selectedDate && (
        <div className="pages-read">
          <p>{`You've read ${pagesRead} pages on ${selectedDate.toLocaleDateString()}.`}</p>
          <input
            type="number"
            value={pagesRead}
            onChange={handlePagesReadChange}
            min="0"
            placeholder="Enter number of pages read"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarView;