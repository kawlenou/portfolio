import React, { useState, useEffect } from 'react';
import AdditionalServices from '../components/AdditionalServices';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { getServiceWithDetails } from '../../services';

export default function Booking() {
    const navigate = useNavigate();
    const location = useLocation();
    const [serviceDetails, setServiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPack, setSelectedPack] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

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
                setServiceDetails(data.service);

                if (data.service.heures?.length > 0) {
                    setSelectedPack(data.service.heures[0].id);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadServiceDetails();
    }, [location, navigate]);

    const selectedPackage = serviceDetails?.heures?.find(p => p.id === selectedPack);

    const total = selectedPackage
        ? Number(selectedPackage.pivot.prix) + selectedServices.reduce((sum, serviceId) => {
            const service = serviceDetails?.sous_services?.find(s => s.id === serviceId);
            return sum + Number(service?.pivot?.prix || 0);
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
        navigate('/booking-calendar', {
            state: {
                service: serviceDetails,
                selectedPackage,
                selectedAdditionalServices: selectedServices.map(id =>
                serviceDetails.sous_services.find(s => s.id === id)
                ),
                total
            }
        });
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;
    if (!serviceDetails) return <div className="flex justify-center items-center h-screen">Service non trouvé</div>;

    return (
        <div className="overflow-hidden bg-white min-h-screen flex items-center justify-center px-4 md:px-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="flex flex-col w-full max-w-6xl"
            >
                <form onSubmit={handleSubmit}>
                    <div className="mb-10">
                        <h2 className="text-2xl md:text-5xl font-bold text-[#0b1743]">
                            Réservez votre session <br />
                            <span className="text-primary">{serviceDetails.nom}</span>
                        </h2>
                        <p className="text-[#6c7a93] max-w-xl mt-2">{serviceDetails.description}</p>
                    </div>

                    <div className="md:flex md:gap-8">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-[#0b1743] mb-6">Forfaits disponibles</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {serviceDetails.heures.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => setSelectedPack(p.id)}
                                        className={`relative rounded-xl p-6 h-50 cursor-pointer transition-transform duration-300 transform hover:scale-105 shadow-sm hover:shadow-lg bg-white`}
                                    >
                                        <div className={`absolute top-4 right-4 w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors duration-300 ${selectedPack === p.id ? 'border-[#0053f0]' : 'border-gray-400'}`}>
                                            {selectedPack === p.id && <div className="w-2 h-2 bg-[#0053f0] rounded-full"></div>}
                                        </div>
                                        <h3 className="text-xl font-semibold text-[#0b1743]">{p.duree} heure(s)</h3>
                                        <p className="text-sm text-[#6c7a93] mt-4">Durée de la session</p>
                                        <div className="mt-4 text-lg font-bold text-[#0b1743]">
                                            {formatPrice(p.pivot.prix)} <span className="text-xs font-normal">fcfa</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {serviceDetails.sous_services?.length > 0 && (
                                <div className="mt-12">
                                    <h4 className="text-3xl font-bold text-[#0b1743]">Ajoutez des services complémentaires</h4>
                                    <p className="text-[#6c7a93] max-w-xl mt-2">Personnalisez votre session selon vos besoins</p>
                                    <AdditionalServices
                                        services={serviceDetails.sous_services}
                                        selectedServices={selectedServices}
                                        onServiceToggle={handleServiceToggle}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="md:w-96 mt-10 md:mt-0">
                            <div className="bg-white rounded-xl p-6 shadow-md sticky top-6">
                                <h4 className="text-3xl font-bold text-[#0b1743]">Votre réservation</h4>
                                <p className='text-xs text-[#6c7a93] mb-4'>Récapitulatif de vos choix</p>

                                {selectedPackage && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500">Forfait choisi</p>
                                        <div className="flex justify-between mt-1">
                                            <span>{selectedPackage.duree} heure(s)</span>
                                            <span>{formatPrice(selectedPackage.pivot.prix)} fcfa</span>
                                        </div>
                                    </div>
                                )}

                                {selectedServices.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500">Services additionnels</p>
                                        <ul className="mt-1 space-y-2">
                                            {selectedServices.map(serviceId => {
                                                const service = serviceDetails.sous_services.find(s => s.id === serviceId);
                                                return service ? (
                                                    <li key={serviceId} className="flex justify-between">
                                                        <span>{service.nom}</span>
                                                        <span>{formatPrice(service.pivot?.prix || 0)} fcfa</span>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    </div>
                                )}

                                <div className="border-t pt-3 font-bold text-lg flex justify-between">
                                    <span>Total</span>
                                    <span>{formatPrice(total)} fcfa</span>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-[#0053f0] hover:bg-[#0040c1] transition text-white py-2 rounded-lg font-medium"
                                    disabled={!selectedPackage}
                                >
                                    Continuer la réservation
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}