export const CalendarGrid = ({ days, hours, schedule, startDate }) => (
  <>
    <div className="grid grid-cols-8 gap-px mb-2">
      <div className="h-16"></div>
      {days.map((d, idx) => (
        <div key={idx} className={`h-16 flex flex-col items-center justify-center ${d.label === startDate.format('D') ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'} rounded-lg`}>
          <div className="text-lg font-bold">{d.label}</div>
          <div className="text-xs capitalize">{d.day}</div>
        </div>
      ))}
    </div>
    <div className="relative grid grid-cols-8 gap-px">
      <div className="flex flex-col">
        {hours.map((hour, idx) => (
          <div key={idx} className="h-24 pr-2 text-right font-bold flex items-start justify-end border-t border-gray-200">
            {hour}
          </div>
        ))}
      </div>
      {days.map((day, idx) => (
        <div key={idx} className="relative bg-white border-l border-gray-100">
          {hours.map((_, i) => (
            <div key={i} className="h-24 border-b border-gray-100 hover:bg-gray-50" />
          ))}
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