import React, { useState, useEffect } from 'react';
import {
    addService,
    addAdditionalService,
    getHeures,
    getServices
} from '../../../services';

const Service = () => {
    const [service, setService] = useState({ nom: '', description: '', heures: [] });
    const [servicesList, setServicesList] = useState([]);
    const [additionalService, setAdditionalService] = useState({
        nom: '',
        description: '',
        heures: [],
        services: [],
    });

    const [heures, setHeures] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const fetchHeures = async () => {
        try {
            const fetchedHeures = await getHeures();
            setHeures(fetchedHeures.heures || []);
        } catch (error) {
            setAlert({ message: 'Erreur lors de la récupération des heures.', type: 'error' });
        }
    };

    const fetchServices = async () => {
        try {
            const response = await getServices();
            setServicesList(response.services || []);
        } catch (error) {
            setAlert({ message: "Erreur lors de la récupération des services.", type: 'error' });
        }
    };

    useEffect(() => {
        fetchHeures();
        fetchServices();
    }, []);


    const handleAddService = async () => {
        if (!service.nom || !service.description || !service.heures) return;
        try {
            await addService(service);
            setAlert({ message: 'Service ajouté avec succès', type: 'success' });
            setService({ nom: '', description: '', heures: [] });
        } catch (error) {
            console.log(error)
            setAlert({ message: "Erreur lors de l'ajout du service.", type: 'error' });
        }
    };

    const handleAddAdditionalService = async () => {

        if (!additionalService.nom || !additionalService.description || !additionalService.heures || !additionalService.services) return;
        try {
            await addAdditionalService(additionalService);
            setAlert({ message: 'Service additionnel ajouté avec succès', type: 'success' });
            setAdditionalService({ nom: '', description: '', heures: [], services: [] });
        } catch (error) {
            setAlert({ message: "Erreur lors de l'ajout du service additionnel.", type: 'error' });
        }
    };

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ message: '', type: '' }), 4000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const renderHeuresInput = (target, setTarget) => (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 text-sm">Ajouter une heure avec prix</label>
            {target.heures.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <select
                        value={item.heure_id}
                        onChange={(e) => {
                            const newHeures = [...target.heures];
                            newHeures[index].heure_id = parseInt(e.target.value);
                            setTarget({ ...target, heures: newHeures });
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 text-sm"
                    >
                        <option value="" >-- Choisir une heure --</option>
                        {heures.map((heure) => (
                            <option key={heure.id} value={heure.id}>
                                {heure.id}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        value={item.prix}
                        onChange={(e) => {
                            const newHeures = [...target.heures];
                            newHeures[index].prix = e.target.value;
                            setTarget({ ...target, heures: newHeures });
                        }}
                        placeholder="Prix"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-1/2 text-sm"
                    />

                    <button
                        type="button"
                        onClick={() => {
                            const newHeures = target.heures.filter((_, i) => i !== index);
                            setTarget({ ...target, heures: newHeures });
                        }}
                        className="text-red-500 font-bold text-lg"
                    >
                        &times;
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => {
                    setTarget({ ...target, heures: [...target.heures, { heure_id: '', prix: '' }] });
                }}
                className="mt-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm"
            >
                + Ajouter une heure
            </button>
        </div>
    );

    return (
        <>
            {alert.message && (
                <div className={`mb-4 p-4 rounded text-sm font-medium ${
                    alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                    {alert.message}
                </div>
            )}

            <div className="flex-1 overflow-auto p-6 pt-2">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-center items-start md:space-x-5 space-y-8 md:space-y-0">
                        {/* Service principal */}
                        <div className="bg-white shadow-sm rounded-lg p-6 w-full max-w-xl">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Ajouter un nouveau service <span className="text-blue-500 text-3xl">+</span>
                            </h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleAddService(); }}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1 text-sm">Nom</label>
                                    <input
                                        type="text"
                                        value={service.nom}
                                        onChange={(e) => setService({ ...service, nom: e.target.value })}
                                        placeholder="Entrez le nom du service ..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
                                    <textarea
                                        value={service.description}
                                        onChange={(e) => setService({ ...service, description: e.target.value })}
                                        placeholder="Entrez une description du service ..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                    ></textarea>
                                </div>

                                {/* Champ heure + prix */}
                                {renderHeuresInput(service, setService)}

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Service additionnel */}
                        <div className="bg-white shadow-sm rounded-lg p-6 w-full max-w-xl">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                Ajouter un service additionnel <span className="text-blue-500 text-3xl">+</span>
                            </h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleAddAdditionalService(); }}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1 text-sm">Nom</label>
                                    <input
                                        type="text"
                                        value={additionalService.nom}
                                        onChange={(e) => setAdditionalService({ ...additionalService, nom: e.target.value })}
                                        placeholder="Entrez le nom du service additionnel ..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1 text-sm">Description</label>
                                    <textarea
                                        value={additionalService.description}
                                        onChange={(e) => setAdditionalService({ ...additionalService, description: e.target.value })}
                                        placeholder="Entrez une description ..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1 text-sm">Service principal lié</label>
                                    <select
                                        value={additionalService.services}
                                        onChange={(e) =>
                                            setAdditionalService({ ...additionalService, services: [parseInt(e.target.value)] })
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                    >
                                        <option value="">-- Choisir un service principal --</option>
                                        {servicesList.map((service) => (
                                            <option key={service.id} value={service.id}>
                                                {service.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Champ heure + prix */}
                                {renderHeuresInput(additionalService, setAdditionalService)}

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Service;
