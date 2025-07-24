import React from 'react';

const AdditionalServices = ({ services, selectedServices, onServiceToggle }) => {

  return (
    <div className='flex flex-wrap gap-3'>
      
      {services.map((service) => {
        const isSelected = selectedServices.includes(service.id);
        const price = service?.heures[0]?.pivot?.prix
  

        return (
          <div 
            key={service.id}
            className={`flex items-center text-sm p-3 cursor-pointer bg-secondary transition-colors rounded-full`}
            onClick={() => onServiceToggle(service.id)}
          >
            <div className="flex-grow">
              <span className="font-medium text-primary">{service.nom}</span>
            </div>
            <div className="text-[#6c7a93] font-semibold ml-2">
              {price.toLocaleString('fr-FR')} FCFA
            </div>
            <div className="flex items-center justify-center h-5 w-5 ml-3">
              <div className={`rounded-full h-5 w-5 border-2 flex items-center justify-center ${
                isSelected ? 'border-[#0053f0] bg-[#0053f0] text-white' : 'border-primary'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdditionalServices;
