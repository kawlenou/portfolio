import React from 'react';
import dayjs from 'dayjs';

const CalendarEvent = ({ event }) => {
  const [sh, sm] = event.start.split(':').map(Number);
  const [eh, em] = event.end.split(':').map(Number);
  const top = ((sh - 8) * 60 + sm) * 1.6;
  const height = ((eh - sh) * 60 + (em - sm)) * 1.6;

  return (
    <div
      className={`absolute left-1 right-1 rounded-lg p-3 text-black text-sm shadow border ${event.color}`}
      style={{ top: `${top}px`, height: `${height}px`, zIndex: 10 }}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div className="text-xs flex items-center gap-2 mt-1">
        <img src="https://i.pravatar.cc/20" alt="avatar" className="w-7 h-7 rounded-full" />
        <span className="truncate">{event.user}</span>
      </div>
    </div>
  );
};

export default CalendarEvent;