import React from 'react';
import CalendarEvent from './CalendarEvent';

const CalendarDay = ({ day, hours, schedule, startDate }) => {
  return (
    <div className="relative bg-white border-l border-gray-100">
      {hours.map((_, i) => (
        <div key={i} className="h-24 border-b border-gray-100 hover:bg-gray-50" />
      ))}

      {/* Events */}
      {schedule
        .filter(s => s.day === day.date)
        .map((s, i) => (
          <CalendarEvent key={i} event={s} />
        ))}
    </div>
  );
};

export default CalendarDay;