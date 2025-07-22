import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Page non trouvée</h2>
        <p className="text-lg text-slate-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
}
