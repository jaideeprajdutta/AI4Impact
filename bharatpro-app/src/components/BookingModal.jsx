import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function BookingModal({ worker, onClose }) {
  const { addBooking } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [taskDetails, setTaskDetails] = useState('');

  const slots = [
    { id: 1, time: '10:00 AM', date: 'Today' },
    { id: 2, time: '12:00 PM', date: 'Today' },
    { id: 3, time: '03:30 PM', date: 'Today' },
    { id: 4, time: '09:00 AM', date: 'Tomorrow' },
    { id: 5, time: '11:30 AM', date: 'Tomorrow' },
  ];

  const handleConfirm = () => {
    const booking = addBooking({
      workerId: worker.id,
      workerName: worker.name,
      title: 'Plumbing Service',
      slot: selectedSlot,
      description: taskDetails,
      status: 'pending',
      amount: worker.rate ? parseInt(worker.rate.replace(/\D/g, '')) : 450,
      clientName: 'You',
    });
    navigate(`/order-tracking/${booking.id}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-3xl shadow-premium animate-reveal">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Book {worker.name}</h2>
            <p className="text-sm text-on-surface-variant mb-8">Choose a convenient time for your service.</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {slots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedSlot?.id === slot.id 
                      ? 'border-secondary bg-secondary/10' 
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">{slot.date}</p>
                  <p className={`text-lg font-headline font-bold ${selectedSlot?.id === slot.id ? 'text-secondary' : 'text-on-surface'}`}>{slot.time}</p>
                </button>
              ))}
            </div>

            <button 
              disabled={!selectedSlot}
              onClick={() => setStep(2)}
              className="btn btn-primary w-full py-4 disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">Service Details</h2>
            <p className="text-sm text-on-surface-variant mb-6">Tell us about the problem so the pro can come prepared.</p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 block">Describe your task</label>
                <textarea 
                  value={taskDetails}
                  onChange={(e) => setTaskDetails(e.target.value)}
                  placeholder="e.g. My kitchen sink is leaking and I need the pipe replaced..."
                  className="w-full h-32 rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-sm text-on-surface outline-none focus:border-secondary/40 transition-colors resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/05">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-on-surface-variant">Selected Slot</span>
                  <span className="text-on-surface font-semibold">{selectedSlot.date}, {selectedSlot.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Est. Hourly Rate</span>
                  <span className="text-secondary font-bold">{worker.rate}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn btn-secondary flex-1">Back</button>
              <button onClick={handleConfirm} className="btn btn-primary flex-[2] py-4">Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
