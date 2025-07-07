import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Images } from '../../themes/image';
import { Link } from 'react-router-dom';

export default function LoginWithGoogle() {
    return (
        <div className='overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="min-h-screen flex items-center justify-center bg-white px-4 md:px-10"
            >
                <div className="flex flex-col-reverse md:flex-row items-center max-w-6xl w-full relative">

                    <div className="flex-1 p-6 md:p-12 z-20">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Réservez en toute simplicité,<br /> où que vous soyez.
                        </h1>
                        <p className="text-slate-600 text-base mb-6 max-w-md">
                            Profitez d’un espace professionnel prêt à l’emploi pour tous vos projets audio et vidéo.
                            Réservation simple, matériel de qualité, disponibilité en temps réel : vous vous
                            concentrez sur la création, on s’occupe du reste.
                        </p>

                        <button className="flex items-center gap-3 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-blue-700 transition mb-2 w-fit">
                            <FaGoogle className="text-white text-lg" />
                            Continue avec Google
                        </button>

                        <p className="text-sm text-slate-500 mt-2">
                            Connectez-vous à votre compte Google pour commencer.
                        </p>

                        <div className="text-sm text-slate-500 mt-4">
                            <span className="text-slate-400">ou</span><br />
                            <Link to="/login-with-mail" className="text-primary font-medium hover:underline">Continuez avec votre email.</Link>
                        </div>
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

                        {/* Cercle droit */}
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
                </div>
            </motion.div>
        </div>

    );
}
