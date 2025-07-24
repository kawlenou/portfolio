import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdditionalServices from "../components/AdditionalServices";
import { createBooking, redirectToCinetPay } from '../../../services';

const BookingRecap = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [reservationId, setReservationId] = useState(0);

  if (!state) return <p className="text-center mt-10">Aucune donnée reçue.</p>;

  const {
    service,
    selectedPackage,
    selectedAdditionalServices,
    date,
    heure,
    total
  } = state;



  const formatPrice = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };


  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const formattedDateTime = `${date} ${heure.debut}`;


      const payload = {
        service_id: service.id,
        heure_id: selectedPackage.id,
        date_reservation: formattedDateTime,
        sous_services: selectedAdditionalServices.map(s => ({
          id: s.id,
          heure_id: s.heures[0].id,
        })),
      };


      const result = await createBooking(payload);
      setReservationId(result.reservation.id)

      setSuccessModal(true);
    } catch (error) {
      alert("Erreur lors de la réservation");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-sm space-y-8 relative">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">Récapitulatif de la réservation</h1>
        <p className="text-gray-500 mt-2">Vérifiez les détails avant de procéder au paiement.</p>
      </div>

      {/* Forfait et créneau */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Forfait sélectionné */}
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Forfait sélectionné</h2>
          <div className="relative rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
            <div className="absolute top-4 right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center border-[#0053f0]">
              <div className="w-2 h-2 bg-[#0053f0] rounded-full"></div>
            </div>

            <h3 className="text-xl font-semibold text-[#0b1743]">{selectedPackage?.duree} heure(s)</h3>
            <p className="text-sm text-[#6c7a93] mt-4">Durée de la session</p>
            <div className="mt-4 text-lg font-bold text-[#0b1743]">
              {formatPrice(selectedPackage?.pivot?.prix)} <span className="text-xs font-normal">fcfa</span>
            </div>
          </div>
        </div>

        {/* Créneau sélectionné */}
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Créneau sélectionné</h2>

          <div className="relative rounded-xl p-6 bg-white shadow hover:shadow-lg transition">
            <div className="absolute top-4 right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center border-[#0053f0]">
              <div className="w-2 h-2 bg-[#0053f0] rounded-full"></div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-base font-medium text-[#0b1743]">{date}</p>
              <p className="text-sm text-gray-700 mt-1">{heure?.debut} — {heure?.fin}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services complémentaires */}
      {selectedAdditionalServices?.length > 0 && (
        <div className="space-y-4 border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-700">Services complémentaires</h2>
          <AdditionalServices
            services={selectedAdditionalServices}
            selectedServices={selectedAdditionalServices.map(s => s.id)}
            onServiceToggle={() => { }}
            disabled
          />
        </div>
      )}

      {/* Info */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-500">
          Vous serez redirigé vers notre partenaire de paiement pour finaliser votre réservation.
        </p>
      </div>


      <div className="border-t pt-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Total à payer</h3>
          <p className="text-2xl font-bold text-[#0b1743]">{formatPrice(total)} FCFA</p>
        </div>
        <button
          className="bg-[#0053f0] hover:bg-[#003bb0] text-white font-bold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
          onClick={handleConfirmBooking}
          disabled={loading}
        >
          {loading ? "Confirmation..." : "Confirmer"}
        </button>
      </div>

      {/* Modal succès */}
      {successModal && (
        <div className="fixed top-0 left-0 w-full min-h-screen bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl shadow-2xl w-[95%] max-w-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Réservation réussie 🎉</h2>
            <p className="text-gray-600 mb-6">Votre réservation a bien été enregistrée.</p>
            <button
              className="bg-[#0053f0] hover:bg-[#003bb0] text-white px-6 py-2 rounded-lg"
              onClick={async () => {
                setSuccessModal(false);
                try {
                  const result = await redirectToCinetPay(reservationId);
                  window.location.href = result.url;
                } catch (err) {
                  alert("Erreur lors de la redirection vers le paiement.");
                }
              }}
            >
              Payer maintenant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingRecap;
