import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { FaCheck } from 'react-icons/fa';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const renderCalendar = () => {
    const days = [];
    let startDate = new Date();

    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i);
      const formattedDate = format(date, 'yyyy-MM-dd');
      const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

      days.push(
        <div key={formattedDate} className={`day ${isToday ? 'today' : ''}`} onClick={() => handleDateClick(date)}>
          <span>{format(date, 'EEE')}</span>
          <span>{format(date, 'dd')}</span>
          {isToday && <span className="today-label">Today</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="week">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
