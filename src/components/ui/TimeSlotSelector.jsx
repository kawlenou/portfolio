import { useState } from "react";

const slots = [
  { start: "08:00", end: "09:00" },
  { start: "10:00", end: "11:00" },
  { start: "12:00", end: "13:00" },
  { start: "14:00", end: "15:00" },
  { start: "16:00", end: "17:00" },
  { start: "18:00", end: "19:00" },
];

export default function TimeSlotSelector() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="max-w-sm mx-auto font-sans p-4">
      <h2 className="text-xl font-bold mb-1">Select a Time</h2>
      <p className="text-sm text-gray-500 mb-4">Monday, July 25</p>

      <div className="flex flex-col gap-3">
        {slots.map((slot, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-lg font-medium transition space-x-3
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "border-blue-200 text-gray-800 hover:bg-blue-50"
                }`}
            >
              <span>{slot.start}</span>
              <div className="flex items-center">
                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-900'}`} />
                <span className="w-12 h-0.5 bg-gray-300" />
                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-900'}`} />
              </div>
              <span>{slot.end}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
