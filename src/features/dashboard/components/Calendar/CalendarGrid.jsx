import React from 'react';
import dayjs from 'dayjs';
import CalendarEvent from './CalendarEvent';

const CalendarGrid = ({ days, hours, schedule }) => {

  const timeToMinutes = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    return hour * 60 + minute;
  };

  const renderEvents = (day) => {
    const dayEvents = schedule.filter(event => event.day === day.date);
    const dayStartMinutes = timeToMinutes(hours[0]); // Heure de début de la journée (ex: 08:00 -> 480 min)

    return dayEvents.map((event, index) => {
      const eventStartMinutes = timeToMinutes(event.start);
      const eventEndMinutes = timeToMinutes(event.end);

      const top = ((eventStartMinutes - dayStartMinutes) / 60) * 64; // 64px est la hauteur d'une heure
      const height = ((eventEndMinutes - eventStartMinutes) / 60) * 64;

      return (
        <div
          key={index}
          className="absolute w-full pr-2"
          style={{ top: `${top}px`, height: `${height}px` }}
        >
          <CalendarEvent event={event} />
        </div>
      );
    });
  };

  return (
    <div className="grid grid-cols-7 h-full">
      {days.map(day => (
        <div key={day.date} className="relative border-r border-gray-200">
          {hours.map(hour => (
            <div key={hour} className="h-16 border-b border-gray-200"></div>
          ))}
          <div className="absolute top-0 left-0 w-full h-full">
            {renderEvents(day)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
