import { useState } from 'react'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Calendar from './components/ui/Calendar'
import TimeSlotSelector from './components/ui/TimeSlotSelector'
import CircleButton from './components/ui/CircleButton'
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import AdditionalServices from './components/ui/AdditionalServices'

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-white p-6'>
      <div className='bg-white p-6 flex justify-center'>

        {/* Calendar + TimeSlotSelector*/}
        <Calendar />
        <TimeSlotSelector />


        {/* Boutons cercles */}
        <div>
          <div className="flex justify-center gap-4 p-4">
            <CircleButton icon={GoArrowLeft} onClick={() => console.log('Left clicked')} />
            <CircleButton icon={GoArrowRight} onClick={() => console.log('Right clicked')} />
          </div>
          <Button>Reservez maintenant</Button>
        </div>

        {/* Additional services */}
        <div className="flex justify-center p-4">
          <AdditionalServices />
        </div>

      </div>

      <form className="max-w-md mx-auto p-6 rounded shadow">
        <Input
          label="Nom"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Button>Envoyer</Button>
      </form>


    </div>
  )
}

export default App
