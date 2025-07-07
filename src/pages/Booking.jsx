import React, { useState, useEffect } from 'react';
import AdditionalServices from '../components/ui/AdditionalServices';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { getServiceWithDetails } from '../services';

export default function Booking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPack, setSelectedPack] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [bookingStep, setBookingStep] = useState(1);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const serviceId = searchParams.get('service_id');

        if (!serviceId) {
            navigate('/');
            return;
        }

        const loadServiceDetails = async () => {
            try {
                const data = await getServiceWithDetails(serviceId);
                setServiceDetails(data.services);
                // Sélectionner le premier forfait par défaut
                if (data.services.base_packages?.length > 0) {
                    setSelectedPack(data.services.base_packages[0].id);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadServiceDetails();
    }, [location, navigate]);

    const selectedPackage = serviceDetails?.base_packages?.find(p => p.id === selectedPack);
    const total = selectedPackage 
        ? Number(selectedPackage.price) + selectedServices.reduce((sum, serviceId) => {
  const service = serviceDetails?.additional_services?.find(s => s.id === serviceId);
  return sum + Number(service?.price || 0);
}, 0)
        : 0;

    const handleServiceToggle = (serviceId) => {
        setSelectedServices(prev =>
            prev.includes(serviceId)
                ? prev.filter(id => id !== serviceId)
                : [...prev, serviceId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBookingStep(2);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div>Chargement des détails du service...</div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen text-red-500">
            <div>Erreur: {error}</div>
        </div>
    );

    if (!serviceDetails) return (
        <div className="flex justify-center items-center h-screen">
            <div>Service non trouvé</div>
        </div>
    );

    return (
        <div className="overflow-hidden bg-white min-h-screen flex items-center justify-center px-4 md:px-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full"
            >
                <form onSubmit={handleSubmit}>
                    {/* Titre */}
                    <div className="mb-10">
                        <h2 className="text-2xl md:text-5xl font-bold text-[#0b1743]">
                        Réservez votre session <br />
                        <span className="text-primary">{serviceDetails.title}</span>
                        </h2>
                        <p className="text-[#6c7a93] max-w-xl mt-2">
                            {serviceDetails.description}
                        </p>
                    </div>

                    <div className="md:flex md:gap-8">
                        {/* Section Forfaits */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-[#0b1743] mb-6">Forfaits de base</h3>

                            {serviceDetails.base_packages?.length > 0 ? (
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {serviceDetails.base_packages.map(p => (
                                        <div
                                            key={p.id}
                                            onClick={() => setSelectedPack(p.id)}
                                            className={`relative rounded-xl p-6 h-50 cursor-pointer transition-transform duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg bg-white`}
                                        >
                                            {/* Bouton radio à droite */}
                                            <div className={`absolute top-4 right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${selectedPack === p.id ? 'border-[#0053f0]' : 'border-gray-400'}`}>
                                                {selectedPack === p.id && (
                                                    <div className="w-2 h-2 bg-[#0053f0] rounded-full"></div>
                                                )}
                                            </div>

                                            {/* Contenu */}
                                            <div className="flex flex-col justify-between h-full">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-[#0b1743]">{p.nbHours}</h3>
                                                    <p className="text-sm text-[#6c7a93] mt-4">{p.description}</p>
                                                    {/* {p.features && (
                                                        <ul className="mt-2 text-xs text-[#6c7a93]">
                                                            {p.features.map((feature, index) => (
                                                                <li key={index} className="mb-1">• {feature}</li>
                                                            ))}
                                                        </ul>
                                                    )} */}
                                                </div>

                                                <div className="mt-4 flex items-center gap-2">
                                                    <span className="text-lg font-bold text-[#0b1743]">
                                                        {formatPrice(p.price)}<span className='text-xs underline font-normal'>fcfa</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[#6c7a93]">Aucun forfait disponible pour ce service</p>
                            )}

                            {/* Section Services Additionnels */}
                            {serviceDetails.additional_services?.length > 0 && (
                                <div className="mt-12">
                                    <div className='mb-4'>
                                        <h4 className="text-3xl font-bold text-[#0b1743]">Ajoutez des services complémentaires</h4>
                                        <p className="text-[#6c7a93] max-w-xl mt-2">Personnalisez votre session selon vos besoins</p>
                                    </div>
                                    <AdditionalServices
                                        services={serviceDetails.additional_services}
                                        selectedServices={selectedServices}
                                        onServiceToggle={handleServiceToggle}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Récapitulatif */}
                        <div className="md:w-96 mt-10 md:mt-0">
                            <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
                                <div className='mb-4'>
                                    <h4 className="text-3xl font-bold text-[#0b1743]">Votre réservation</h4>
                                    <p className='text-xs text-[#6c7a93]'>Résumé de votre réservation en un clin d'œil.</p>
                                </div>

                                <div className="space-y-4">
                                    {selectedPackage && (
                                        <div>
                                            <p className="text-sm text-gray-500">Forfait sélectionné</p>
                                            <div className="flex justify-between mt-1">
                                                <span className="flex justify-center items-center space-x-3">
                                                    <div className="w-2 h-2 bg-[#0053f0] rounded-full"></div>
                                                    <span className="font-medium">{selectedPackage.nbHours}</span>
                                                </span>
                                                <span className="font-medium">{formatPrice(selectedPackage.price)} fcfa</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedServices.length > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-500">Services additionnels</p>
                                            <ul className="mt-1 space-y-2">
                                                {selectedServices.map(serviceId => {
                                                    const service = serviceDetails.additional_services?.find(s => s.id === serviceId);
                                                    return service ? (
                                                        <li key={serviceId} className="flex items-center p-3 bg-secondary transition-colors rounded-full text-sm">
                                                            <div className="flex-grow">
                                                                <span className="font-medium text-primary">{service.name}</span>
                                                            </div>
                                                            <div className="text-[#6c7a93] font-semibold">
                                                                {formatPrice(service.price)} fcfa
                                                            </div>
                                                        </li>
                                                    ) : null;
                                                })}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{formatPrice(total)} fcfa</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/booking-calendar', {
                                            state: {
                                                service: serviceDetails,
                                                selectedPackage,
                                                selectedAdditionalServices: selectedServices.map(id => 
                                                    serviceDetails.additional_services.find(s => s.id === id)
                                                )
                                            }
                                        })}
                                        className="w-full mt-4 bg-[#0053f0] hover:bg-[#0040c1] transition text-white py-2 rounded-lg font-medium"
                                        disabled={!selectedPackage}
                                    >
                                        Continuer la réservation
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}