import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

const trades = [
  { icon: 'plumbing', label: 'Plumbing' },
  { icon: 'electrical_services', label: 'Electrical' },
  { icon: 'carpenter', label: 'Carpentry' },
  { icon: 'format_paint', label: 'Painting' },
  { icon: 'cleaning_services', label: 'Cleaning' },
  { icon: 'home_repair_service', label: 'Appliance Repair' },
  { icon: 'ac_unit', label: 'AC / HVAC' },
  { icon: 'roofing', label: 'Roofing' },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedTrades, setSelectedTrades] = useState([]);

  const toggleTrade = (label) => {
    setSelectedTrades(prev =>
      prev.includes(label) ? prev.filter(t => t !== label) : [...prev, label]
    );
  };

  return (
    <Layout hideBottomNav>
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? 'bg-secondary' : 'bg-surface-variant'}`} />
              </div>
            ))}
            <span className="text-xs text-on-surface-variant ml-2">Step {step}/3</span>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-2">
                Join as a Professional
              </h1>
              <p className="text-on-surface-variant mb-8">
                Start earning on India's most trusted worker platform.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant block mb-1.5">Full Name</label>
                  <input className="w-full h-12 rounded-xl bg-surface-container-high border border-white/[0.06] px-4 text-on-surface text-sm outline-none focus:border-secondary/40 transition-colors" placeholder="Rajesh Kumar" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant block mb-1.5">Phone Number</label>
                  <div className="flex items-center h-12 rounded-xl bg-surface-container-high border border-white/[0.06] px-4">
                    <span className="text-sm text-on-surface-variant mr-2">+91</span>
                    <input className="flex-1 bg-transparent text-on-surface text-sm outline-none" placeholder="98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-on-surface-variant block mb-1.5">City</label>
                  <input className="w-full h-12 rounded-xl bg-surface-container-high border border-white/[0.06] px-4 text-on-surface text-sm outline-none focus:border-secondary/40 transition-colors" placeholder="Mumbai" />
                </div>
              </div>

              <button onClick={() => setStep(2)} className="btn btn-primary w-full mt-8 py-3.5">
                Continue
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          )}

          {/* Step 2: Trade Selection */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-2">
                What do you do?
              </h1>
              <p className="text-on-surface-variant mb-8">
                Select one or more trades you specialize in.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {trades.map(({ icon, label }) => {
                  const selected = selectedTrades.includes(label);
                  return (
                    <button
                      key={label}
                      onClick={() => toggleTrade(label)}
                      className={`card p-4 flex items-center gap-3 text-left transition-all ${
                        selected ? '!border-secondary/40 !bg-secondary/5' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        selected ? 'bg-secondary/15 text-secondary' : 'bg-surface-container-high text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-[20px]">{icon}</span>
                      </div>
                      <span className={`text-sm font-medium ${selected ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(1)} className="btn btn-secondary flex-1 py-3.5">Back</button>
                <button onClick={() => setStep(3)} disabled={selectedTrades.length === 0} className="btn btn-primary flex-1 py-3.5 disabled:opacity-40">
                  Continue <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="animate-fade-in text-center">
              <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-tertiary text-4xl" style={{fontVariationSettings:"'FILL' 1"}}>verified</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-2">
                Almost there!
              </h1>
              <p className="text-on-surface-variant mb-8 max-w-sm mx-auto">
                Upload your Aadhaar and a selfie for KYC verification. We'll review within 24 hours.
              </p>

              <div className="space-y-3 mb-8">
                <label className="card p-4 flex items-center gap-4 cursor-pointer hover:!border-secondary/30">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">badge</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-on-surface">Aadhaar Card</p>
                    <p className="text-xs text-on-surface-variant">Upload front & back</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">upload</span>
                  <input type="file" className="hidden" />
                </label>

                <label className="card p-4 flex items-center gap-4 cursor-pointer hover:!border-secondary/30">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">photo_camera</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-on-surface">Selfie Photo</p>
                    <p className="text-xs text-on-surface-variant">Clear face photo for verification</p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">upload</span>
                  <input type="file" className="hidden" />
                </label>
              </div>

              <Link to="/worker/dashboard" className="btn btn-primary w-full py-3.5">
                Submit & Enter Portal
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              <button onClick={() => setStep(2)} className="btn btn-ghost w-full mt-2 py-3">Back</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
