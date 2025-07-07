import { useEffect, useState } from 'react';
import Calendar from '../components/ui/Calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TimeSlotSelector from '../components/ui/TimeSlotSelector';
import { motion } from 'framer-motion';
import { getAvailableTimeSlots } from '../services';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [duration, setDuration] = useState(1); // durée choisie (1h, 2h ou 3h)

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotIndex) => {
    setSelectedSlot(slotIndex);
  };

  const handlePayment = () => {
    if (selectedDate && selectedSlot !== null) {
      const formattedDate = format(selectedDate, "EEEE d MMMM yyyy", { locale: fr });
      const slot = slots[selectedSlot];
      alert(`Réservation confirmée pour le ${formattedDate} entre ${slot.start_time} et ${slot.end_time}`);
    } else {
      alert("Veuillez sélectionner une date et un créneau horaire");
    }
  };

  // 🔁 Chargement des créneaux disponibles quand la date change
  useEffect(() => {
    const loadSlots = async () => {
      if (!selectedDate) return;

      setLoadingSlots(true);
      try {
        const dateString = format(selectedDate, 'yyyy-MM-dd');
        const data = await getAvailableTimeSlots(dateString, duration);
        setSlots(data);
      } catch (err) {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    loadSlots();
  }, [selectedDate, duration]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col-reverse md:flex-row gap-12 w-full max-w-6xl p-6 md:p-10"
      >
        {/* Calendrier */}
        <div className="flex-1">
          <div className="mb-7">
            <h2 className="text-3xl font-bold mb-1">Choisissez une date</h2>
            <div className="flex space-x-2 items-center">
              <div className="w-1 h-6 rounded-full bg-[#0b1743]"></div>
              <p className="text-sm text-gray-500">Sélectionnez une date à laquelle vous souhaitez enregistrer</p>
            </div>
          </div>

          <Calendar
            selectedDate={selectedDate}
            onDateChange={handleDateSelect}
          />
        </div>

        {/* Créneaux */}
        <div className="flex-1 max-w-xs w-full mx-auto">
          <div className="mb-7">
            <h2 className="text-3xl font-bold mb-1">Choisissez un créneau</h2>
            <div className="flex space-x-2 items-center mb-2">
              <div className="w-1 h-6 rounded-full bg-[#0b1743]"></div>
              <p className="text-sm text-gray-500">Sélectionnez le créneau horaire qui vous convient.</p>
            </div>
            {/* Choix de durée */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#0b1743]">Durée souhaitée :</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1 w-full p-2 border rounded-md text-sm"
              >
                <option value={1}>1 heure</option>
                <option value={2}>2 heures</option>
                <option value={3}>3 heures</option>
              </select>
            </div>
          </div>

          {loadingSlots ? (
            <p>Chargement des créneaux...</p>
          ) : (
            <TimeSlotSelector
              slots={slots}
              selectedIndex={selectedSlot}
              onSelect={handleSlotSelect}
              date={selectedDate}
            />
          )}

          <button
            onClick={handlePayment}
            className="w-full mt-6 bg-[#0b1743] text-white py-2 px-4 rounded-lg hover:bg-[#08102e] transition"
            disabled={!selectedDate || selectedSlot === null}
          >
            Réserver
          </button>
        </div>
      </motion.div>
    </div>
  );
}
