import React, { useEffect, useState } from 'react';
import { FaMicrophone, FaVideo, FaLightbulb } from 'react-icons/fa';
import { getServices } from '../../../services';

const iconMap = {
    audio: <FaMicrophone className="text-xl text-gray-700" />,
    video: <FaVideo className="text-xl text-gray-700" />,
    default: <FaLightbulb className="text-xl text-gray-700" />,
};

const ListeServices = () => {
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deletingService, setDeletingService] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSousService, setSelectedSousService] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '' });

    const showAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 4000);
    };

    const handleEditClick = (service) => {
        setEditingService(service);
        setSelectedSousService(service?.sous_services?.[0]?.id || '');
        setShowEditModal(true);
    };

    const handleDeleteClick = (service) => {
        setDeletingService(service);
        setShowDeleteModal(true);
    };

    const handleUpdateService = () => {
        if (!editingService.title?.trim() || !editingService.description?.trim()) {
            showAlert('Tous les champs obligatoires doivent être remplis.', 'error');
            return;
        }

        setServices(prev =>
            prev.map(s => s.id === editingService.id ? { ...editingService } : s)
        );

        setShowEditModal(false);
        setEditingService(null);
        showAlert('Service mis à jour avec succès.', 'success');
    };

    const handleDeleteService = () => {
        if (!deletingService) return;

        setServices(prev => prev.filter(s => s.id !== deletingService.id));
        setShowDeleteModal(false);
        setDeletingService(null);
        showAlert('Service supprimé avec succès.', 'success');
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                const enriched = (response.services || []).map(service => ({
                    ...service,
                    title: service.nom,
                    // short: service.short || '',
                    // extra: service.extra || '',
                    icon: iconMap[service.type] || iconMap.default,
                }));
                setServices(enriched);
            } catch (error) {
                console.error('Erreur lors de la récupération des services:', error);
                showAlert('Erreur lors de la récupération des services.', 'error');
            }
        };

        fetchServices();
    }, []);

    return (
        <div className='p-6 pt-2'>

            {alert.message && (
                <div className={`mb-4 p-4 rounded text-sm font-medium ${
                    alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {alert.message}
                </div>
            )}

            <h2 className="text-3xl font-bold mb-6">Listes des services</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between h-full transition hover:shadow-md"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-[#0b1743] flex items-center gap-2">
                                {service.icon} {service.title}
                            </h3>
                            {/* <p className="mt-2 text-sm font-medium text-gray-600">{service.short}</p> */}
                            <p className="mt-2 text-sm text-gray-700">{service.description}</p>
                            {/* <p className="mt-4 text-xs text-blue-700 border-l-2 border-blue-600 pl-2">
                                {service.extra}
                            </p> */}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <button onClick={() => handleEditClick(service)} className="text-sm font-semibold text-blue-600 hover:underline">Modifier →</button>
                            <button onClick={() => handleDeleteClick(service)} className="text-sm font-semibold text-red-600 hover:underline">Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>

            {showEditModal && editingService && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Modifier le service</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateService(); }}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Titre *</label>
                                <input
                                    type="text"
                                    value={editingService.title}
                                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                />
                            </div>
                          
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                                <textarea
                                    value={editingService.description}
                                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                />
                            </div>
                           

                            {editingService.sous_services?.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">Services additionnels</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                        value={selectedSousService}
                                        onChange={(e) => setSelectedSousService(e.target.value)}
                                    >
                                        <option value="">-- Sélectionner un service --</option>
                                        {editingService.sous_services.map((sous) => (
                                            <option key={sous.id} value={sous.id}>
                                                {sous.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="text-red-600 hover:underline"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                >
                                    Mettre à jour
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && deletingService && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">
                            Confirmer la suppression
                        </h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Es-tu sûr de vouloir supprimer le service "{deletingService.title}" ?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-gray-600 hover:underline"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleDeleteService}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListeServices;
