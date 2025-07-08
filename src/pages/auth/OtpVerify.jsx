import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Images } from '../../themes/image';
import { Link} from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmRegistration } from '../../services';

export default function OtpVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromState = searchParams.get('email') || '';
  const [email, setEmail] = useState(emailFromState);
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');


  useEffect(() => {
    if (!email) {
      navigate('/login-with-mail');
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      // Focus sur l’input suivant uniquement si val non vide et pas dernier input
      if (val && index < code.length - 1) {
        e.target.nextElementSibling?.focus();
      }
      // Permet aussi de revenir en arrière avec backspace
      else if (!val && index > 0) {
        e.target.previousElementSibling?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const verificationCode = code.join('');
    if (verificationCode.length < 4) {
      setError('Veuillez saisir le code complet à 4 chiffres.');
      return;
    }
    if (!email) {
      setError('Adresse email manquante.');
      return;
    }

    setLoading(true);
    try {
      await confirmRegistration(email, verificationCode);
      setSuccess('Votre compte a été confirmé avec succès !');
      setTimeout(() => navigate('/login-with-mail'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la confirmation.');
    } finally {
      setLoading(false);
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
            Confirmez votre email
          </h1>
          <p className="text-slate-600 text-base mb-6 max-w-md">
            Entrez le code de vérification envoyé à <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4" autoComplete="off">
            <div className="flex space-x-7 my-5 justify-start">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  tabIndex={idx + 1}
                  maxLength={1}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  aria-label={`Chiffre ${idx + 1} du code de vérification`}
                  className="w-12 h-12 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-start text-sm">{error}</p>}
            {success && <p className="text-green-600 text-start text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Confirmation en cours...' : "Confirmer l'email"}
            </button>

            <p className="text-[10px] mt-4 text-center">
              Vous n’avez pas reçu de code ?{' '}
              <Link to="/" className="text-primary font-bold">
                Renvoyer le code
              </Link>
            </p>
          </form>
        </div>

        <div className="relative flex-1 p-6 md:p-0 w-full z-10 flex justify-center items-center">
          <div className="rounded-[40px] overflow-hidden relative z-20 w-3/4">
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
