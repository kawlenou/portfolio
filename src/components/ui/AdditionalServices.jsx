import React, { useState } from 'react';

const AdditionalServices = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { id: 'makeup1', name: 'Ingénieur son', price: 10, duration: 'heure' },
    { id: 'makeup2', name: 'Enregistement audio', price: 10, duration: 'heure' },
    { id: 'makeup3', name: 'Mixage', price: 10, duration: 'heure' },
    { id: 'makeup4', name: 'Maquillage', price: 10, duration: 'heure' },
  ];

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const totalPrice = selectedServices.reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);

  return (
    <div className="space-y-4 p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Services additionnels</h2>
      
      <div className="space-y-3">
        {services.map((service) => (
          <div 
            key={service.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors rounded-full border-secondary bg-secondary ${
              selectedServices.includes(service.id) 
                ? 'border-blue-500 ' 
                : 'hover:border-blue-300'
            }`}
            onClick={() => toggleService(service.id)}
          >
            
            <div className="flex-grow">
              <span className="font-medium text-primary">{service.name}</span>
            </div>
            <div className="text-gray-600">
              ${service.price} /{service.duration}
            </div>
            <div className="flex items-center justify-center h-5 w-5 ml-3">
              <div className={`rounded-full h-5 w-5 border-2 flex items-center justify-center ${
                selectedServices.includes(service.id)
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-primary'
              }`}>
                {selectedServices.includes(service.id) && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-2">Récapitulatif</h3>
        {selectedServices.length > 0 ? (
          <>
            <ul className="space-y-1 mb-3">
              {selectedServices.map(serviceId => {
                const service = services.find(s => s.id === serviceId);
                return (
                  <li key={serviceId} className="flex justify-between">
                    <span>{service.name}</span>
                    <span>${service.price}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>${totalPrice}</span>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Aucun service sélectionné</p>
        )}
      </div>
    </div>
  );
};

export default AdditionalServices;