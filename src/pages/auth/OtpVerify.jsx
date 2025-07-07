import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Images } from '../../themes/image';
import { Link } from 'react-router-dom';

export default function OtpVerify() {
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
                        Créez votre compte gratuit
                    </h1>
                    <p className="text-slate-600 text-base mb-6 max-w-md">Aucune carte de crédit requise. Passer à un forfait supérieur</p>

                    <form className="w-full max-w-sm space-y-4">
                        <div className='flex space-x-7 my-5'>
                            <input
                            tabIndex={1}
                            type="text"
                            className="w-12 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                            tabIndex={2}
                            type="text"
                            className="w-12 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                            tabIndex={3}
                            type="text"
                            className="w-12 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                            tabIndex={4}
                            type="text"
                            className="w-12 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                       
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition">
                            Confirmer l'email
                        </button>

                         <p className='text-[10px] mt-4 text-center'>Vous n’avez pas reçu de code  ? <Link to='/' className='text-primary font-bold'>Renvoyer le code</Link></p>
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
