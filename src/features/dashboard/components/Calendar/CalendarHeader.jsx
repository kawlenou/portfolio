import React from 'react';
import dayjs from 'dayjs';

const CalendarHeader = ({ days, startDate }) => {
  return (
    <div className="grid grid-cols-8 gap-px mb-2">
      <div className="h-16"></div>
      {days.map((d, idx) => (
        <div 
          key={idx} 
          className={`h-16 flex flex-col items-center justify-center ${
            d.date === startDate.format('YYYY-MM-DD') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
          } rounded-lg`}
        >
          <div className="text-lg font-bold">{d.label}</div>
          <div className="text-xs capitalize">{d.day}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;