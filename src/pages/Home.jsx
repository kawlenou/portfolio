import React, { useState, useEffect } from 'react';
import { GoArrowRight } from "react-icons/go";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../services';

export default function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices();
        setServices(data.services || []);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des services");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleDiscoverClick = (serviceId) => {
    navigate(`/booking?service_id=${serviceId}`);
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur : {error}</div>;

  return (
    <div className="overflow-hidden bg-white min-h-screen flex items-center justify-center px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full"
      >
        <div className="max-w-6xl mx-auto">
          <div className="md:flex md:justify-between md:items-start">
            <div className="mb-10">
              <h2 className="text-3xl md:text-5xl font-bold text-[#0b1743]">
                Libérez votre potentiel créatif avec nos services de studio audio-vidéo
              </h2>
            </div>
            <p className="text-[#6c7a93]">
              Profitez d'un espace équipé et d'une équipe expérimentée pour donner vie à vos projets audio et vidéo, du simple enregistrement à la production complète.
            </p>
          </div>

          <div className="mt-16 grid gap-6 grid-cols-1 md:grid-cols-3">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="bg-white rounded-xl shadow-sm p-6 relative overflow-hidden h-96 flex flex-col justify-center space-y-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-md"
              >
                <h3 className="text-3xl font-bold text-[#0b1743] mb-2">{service.nom}</h3>

                <div className="flex items-start gap-2">
                  <div className="w-1 h-8 rounded-full bg-[#0b1743] mt-1"></div>
                  <p className="text-[#6c7a93] text-[12px]">
                    {service.description?.length > 100
                      ? service.description.slice(0, 100) + "..."
                      : service.description || "Aucune description fournie."}
                  </p>
                </div>

                <div
                  onClick={() => handleDiscoverClick(service.id)}
                  className="absolute bottom-0 left-0 w-[140px] h-16 bg-[#0053f0] rounded-t-full flex items-center justify-center gap-1 cursor-pointer transform transition-transform duration-300 hover:scale-125"
                >
                  <span className="text-white font-medium text-sm">
                    Choisir
                  </span>
                  <GoArrowRight className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
