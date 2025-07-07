import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import fr from 'date-fns/locale/fr';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function Calendar({ selectedDate, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const generateDays = () => {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
    const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

    const dayArray = [];
    let date = startDate;

    while (date <= endDate) {
      dayArray.push(date);
      date = addDays(date, 1);
    }

    return dayArray;
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={goToPrevMonth} 
          className="w-8 h-8 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <GoArrowLeft />
        </button>
        <h3 className="text-lg font-semibold">
          {format(currentDate, "LLLL yyyy", { locale: fr })}
        </h3>
        <button 
          onClick={goToNextMonth} 
          className="w-8 h-8 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <GoArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-gray-600 font-medium mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2 text-sm">
        {generateDays().map((day, index) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDisabled = [16, 17, 18].includes(day.getDate()) && isSameMonth(day, currentDate);

          const dayClasses = `
            w-8 h-8 mx-auto flex items-center justify-center rounded-full
            ${!isSameMonth(day, currentDate) ? "text-gray-300" : ""}
            ${isDisabled ? "bg-gray-300 text-white cursor-not-allowed" : ""}
            ${isSelected ? "bg-blue-600 text-white" : ""}
            ${!isSelected && !isDisabled && isSameMonth(day, currentDate) ? "hover:bg-blue-100 cursor-pointer" : ""}
          `;

          return (
            <div
              key={index}
              className={dayClasses}
              onClick={() => {
                if (!isDisabled && isSameMonth(day, currentDate)) {
                  onDateChange(day);
                }
              }}
            >
              {format(day, "dd")}
            </div>
          );
        })}
      </div>
    </div>
  );
}