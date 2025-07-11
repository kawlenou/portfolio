export default function TimeSlotSelector({ slots = [], selectedIndex, onSelect, message }) {
  return (
    <div className="flex flex-col gap-3">
      {slots.length === 0 ? (
        <p className="text-sm text-red-500">{message || "Aucun créneau disponible pour cette date."}</p>
      ) : (
        slots.map((slot, index) => {
          const isSelected = selectedIndex === index;

          return (
            <button
              key={slot.id || index}
              onClick={() => onSelect(index)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border text-lg font-medium transition space-x-3
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : "border-primary text-gray-800 hover:bg-blue-50"
                }`}
            >
              <span>{slot.debut || slot.start}</span>
              <div className="flex items-center">
                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`} />
                <span className="w-12 h-0.5 bg-gray-300" />
                <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary'}`} />
              </div>
              <span>{slot.fin || slot.end}</span>
            </button>
          );
        })
      )}
    </div>
  );
}
