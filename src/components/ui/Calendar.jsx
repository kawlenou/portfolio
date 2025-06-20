import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import fr from 'date-fns/locale/fr';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";


const daysOfWeek = ['Lun', 'Mar', 'Mer', 'jeu', 'Ven', 'Sam', 'Dim'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
    <div className="max-w-md bg-white rounded-2xl p-6 shadow font-poppins">
      <h2 className="text-xl font-bold mb-1">Select a Date</h2>
      <p className="text-sm text-gray-500 mb-4">sélectionne une date à laquelle vous souhaite enregistrer</p>

      <div className="flex justify-between items-center mb-2">
        <button onClick={goToPrevMonth} className=" w-8 h-8 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"><GoArrowLeft /></button>
        <h3 className="text-lg font-semibold">
          {format(currentDate, "LLLL yyyy", { locale: fr })}
        </h3>
        <button onClick={goToNextMonth} className="w-8 h-8 flex items-center justify-center text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"><GoArrowRight /></button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-gray-600 font-medium mb-2">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-2 text-sm">
        {generateDays().map((day, index) => {
          const isSelected = isSameDay(day, selectedDate);
          const isDisabled = [16, 17, 18].includes(day.getDate()) && isSameMonth(day, currentDate);

          const dayClasses = `
            w-8 h-8 mx-auto flex items-center justify-center rounded-full
            ${!isSameMonth(day, currentDate) ? "text-gray-300" : ""}
            ${isDisabled ? "bg-gray-300 text-white cursor-not-allowed" : ""}
            ${isSelected ? "bg-red-500 text-white" : ""}
            ${!isSelected && !isDisabled ? "hover:bg-blue-100 cursor-pointer" : ""}
          `;

          return (
            <div
              key={index}
              className={dayClasses}
              onClick={() => {
                if (!isDisabled) setSelectedDate(day);
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
