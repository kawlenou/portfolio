import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { getReservations } from '../../../services';

dayjs.locale('fr');

const Calendar = () => {
  const { startDate } = useOutletContext();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getReservations()
      .then(response => {
        const reservations = response.reservations || [];

        
        const formatted = reservations.map(r => {
          const start = r.jour?.heure_ouverture?.slice(0, 5) || '08:00';
          const end = r.jour?.heure_fermeture?.slice(0, 5) || '09:00';

          return {
            title: r.service?.nom || 'Service',
            start,
            end,
            day: dayjs(r.date_reservation).format('YYYY-MM-DD'),
            color: 'bg-blue-100',
            user: `${r.user?.prenom || ''} ${r.user?.nom || ''}`.trim() || 'Inconnu',
          };
        });

        setSchedule(formatted);
        
      })
      .catch(err => {
        console.error('Erreur chargement réservations:', err);
      });

       
  }, []);


  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = startDate.add(i, 'day');
      return {
        date: date.format('YYYY-MM-DD'),
        label: date.format('D'),
        day: date.format('dddd'),
      };
    });
  };

  const days = getWeekDays();
  const hours = Array.from({ length: 13 }, (_, i) => `${(8 + i).toString().padStart(2, '0')}:00`);

  return (
    <>
      {/* Days Header */}
      <div className="grid grid-cols-8 gap-px mb-2">
        <div className="h-16" />
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`h-16 flex flex-col items-center justify-center ${d.label === startDate.format('D') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'} rounded-lg`}
          >
            <div className="text-lg font-bold">{d.label}</div>
            <div className="text-xs capitalize">{d.day}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="relative grid grid-cols-8 gap-px">
        {/* Hours */}
        <div className="flex flex-col">
          {hours.map((hour, idx) => (
            <div
              key={idx}
              className="h-24 pr-2 text-right font-bold flex items-start justify-end border-t border-gray-200"
            >
              {hour}
            </div>
          ))}
        </div>

        {/* Columns */}
        {days.map((day, idx) => (
          <div key={idx} className="relative bg-white border-l border-gray-100">
            {hours.map((_, i) => (
              <div key={i} className="h-24 border-b border-gray-100 hover:bg-gray-50" />
            ))}

            {/* Events */}
            {schedule
              .filter(s => s.day === day.date)
              .map((s, i) => {
                const [sh, sm] = s.start.split(':').map(Number);
                const [eh, em] = s.end.split(':').map(Number);
                const top = ((sh - 8) * 60 + sm) * 1.6;
                const height = ((eh - sh) * 60 + (em - sm)) * 1.6;

                return (
                  <div
                    key={i}
                    className={`absolute left-1 right-1 rounded-lg p-3 text-black text-sm shadow border ${s.color}`}
                    style={{ top: `${top}px`, height: `${height}px`, zIndex: 10 }}
                  >
                    <div className="font-medium truncate">{s.title}</div>
                    <div className="text-xs flex items-center gap-2 mt-1">
                      <img src="https://i.pravatar.cc/20" alt="avatar" className="w-7 h-7 rounded-full" />
                      <span className="truncate">{s.user}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
