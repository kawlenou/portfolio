// components/ui/AdditionalServices.jsx
import React from 'react';

const AdditionalServices = ({ services, selectedServices, onServiceToggle }) => {
  const totalPrice = selectedServices.reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);

  return (
    <div className='flex flex-wrap gap-3'>      
        {services.map((service) => (
          <div 
            key={service.id}
            className={`flex items-center text-sm p-3 cursor-pointer bg-secondary transition-colors rounded-full `}
            onClick={() => onServiceToggle(service.id)}
          >
            <div className="flex-grow">
              <span className="font-medium text-primary">{service.name}</span>
            </div>
            <div className="text-[#6c7a93] font-semibold">
              { service.price.toLocaleString()} f/{service.duration}
            </div>
            <div className="flex items-center justify-center h-5 w-5 ml-3">
              <div className={`rounded-full h-5 w-5 border-2 flex items-center justify-center ${
                selectedServices.includes(service.id)
                  ? 'border-[#0053f0] bg-[#0053f0] text-white'
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
      
  );
};

export default AdditionalServices;