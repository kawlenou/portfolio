import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';
import { format } from 'date-fns';
import TimeSlotSelector from '../components/TimeSlotSelector';
import { motion } from 'framer-motion';
import { getAvailableTimeSlots } from '../../../services';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [message, setMessage] = useState('');
  const [heure_id, setHeureId] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    service,
    selectedPackage,
    selectedAdditionalServices,
    total
  } = location.state || {};

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotIndex) => {
    setSelectedSlot(slotIndex);
  };

  const handleReservation = () => {
    if (selectedDate && selectedSlot !== null) {
      const slot = slots[selectedSlot];
      const reservation = {
        service,
        selectedPackage,
        selectedAdditionalServices,
        total,
        date: format(selectedDate, 'yyyy-MM-dd'),
        heure: {
          debut: slot.debut,
          fin: slot.fin
        }
      };

      navigate('/booking-recap', { state: reservation });
    } else {
      alert("Veuillez sélectionner une date et un créneau horaire");
    }
  };


  useEffect(() => {
    if (!service || !selectedPackage) {

      navigate('/booking');
    }

    const loadSlots = async () => {
      setHeureId(selectedPackage.id)
      if (!selectedDate) return;

      setLoadingSlots(true);
      try {
        const dateString = format(selectedDate, 'yyyy-MM-dd');
        const data = await getAvailableTimeSlots(dateString, heure_id);
        setMessage(data.message);
        setSlots(data.disponibilites);
      } catch (err) {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }


    };

    loadSlots();


  }, [selectedDate, heure_id, service, selectedPackage]);



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
          </div>

          {loadingSlots ? (
            <p>Chargement des créneaux...</p>
          ) : (
            <div className="max-h-96 overflow-auto">
              <TimeSlotSelector
                slots={slots}
                selectedIndex={selectedSlot}
                onSelect={handleSlotSelect}
                date={selectedDate}
                message={message}
              />
            </div>
          )}

          <button
            onClick={handleReservation}
            className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-lg hover:bg-[#08102e] transition"
            disabled={!selectedDate || selectedSlot === null}
          >
            Réserver
          </button>
        </div>

      </motion.div>
    </div>
  );
}
