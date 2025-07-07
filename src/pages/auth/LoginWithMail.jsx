import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Images } from '../../themes/image';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services';


export default function LoginWithMail() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Échec de la connexion");
            console.error("Erreur de connexion:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="overflow-hidden bg-white min-h-screen flex items-center justify-center px-4 md:px-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full"
            >
                <div className="flex-1 p-6 md:p-12 z-20 flex flex-col justify-center items-start text-center md:text-left">
                    <h1 className="text-2xl md:text-5xl font-bold text-slate-900 mb-6">
                        Commencez à réserver dès maintenant.
                    </h1>
                    <p className="text-slate-600 text-base mb-6 max-w-md">
                        Accédez à un espace de réservation simple, rapide et conçu pour vos projets professionnels.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition ${
                                isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>

                        <div className="flex items-center justify-center space-x-2">
                            <span className="flex-1 h-px bg-gray-300"></span>
                            <span className="text-sm text-gray-500">ou avec</span>
                            <span className="flex-1 h-px bg-gray-300"></span>
                        </div>

                        <Link 
                            to='/login-with-google' 
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition text-gray-700 font-medium"
                        >
                            <FaGoogle className="text-lg" />
                            Google
                        </Link>

                        <p className="text-[10px] text-slate-500 mt-4 text-center">
                            Votre studio vous attend 😉
                        </p>
                    </form>
                </div>

                <div className="relative flex-1 p-6 md:p-0 w-full z-10 flex justify-center items-center">
                        <div className="rounded-[40px] overflow-hidden  relative z-20 w-3/4">
                            <img src={Images.pre} alt="Présentation" className="w-full object-cover" />
                        </div>

                    
                        <motion.div
                            className="hidden md:block absolute -left-20 top-[10%] w-80 h-80 bg-primary rounded-full z-10"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 0.7,
                                scale: 1,
                                x: [0, 20, 0],
                                y: [0, 10, 0],
                            }}
                            whileHover={{ scale: 1.1, opacity: 1 }}
                            transition={{
                                opacity: { duration: 0.8, ease: 'easeOut' },
                                scale: { duration: 0.8, ease: 'easeOut' },
                                x: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        />

                
                        <motion.div
                            className="hidden md:block absolute -right-20 bottom-0 w-80 h-80 bg-primary rounded-full z-10"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: 0.7,
                                scale: 1,
                                x: [0, -20, 0],
                                y: [0, -10, 0],
                            }}
                            whileHover={{ scale: 1.1, opacity: 1 }}
                            transition={{
                                opacity: { duration: 1, ease: 'easeOut' },
                                scale: { duration: 1, ease: 'easeOut' },
                                x: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                                y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                            }}
                        />
                    </div>
            </motion.div>
        </div>
    );
}
