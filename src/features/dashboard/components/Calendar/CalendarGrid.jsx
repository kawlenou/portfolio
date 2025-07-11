import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';

const CalendarGrid = ({ days, hours, schedule, startDate }) => {
  return (
    <div className="relative grid grid-cols-8 gap-px">
      {/* Hours */}
      <div className="flex flex-col">
        {hours.map((hour, idx) => (
          <div key={idx} className="h-24 pr-2 text-right font-bold flex items-start justify-end border-t border-gray-200">
            {hour}
          </div>
        ))}
      </div>

      {/* Columns */}
      {days.map((day, idx) => (
        <CalendarDay 
          key={idx} 
          day={day} 
          hours={hours} 
          schedule={schedule} 
          startDate={startDate} 
        />
      ))}
    </div>
  );
};

export default CalendarGrid;