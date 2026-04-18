import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function VoiceAssistant() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(null);
  const inputRef = useRef(null);

  const processCommand = (text) => {
    setResponse(`Looking for the best professionals for "${text}"...`);
    
    // Simulate AI thinking and then redirecting
    setTimeout(() => {
      navigate('/search');
    }, 2500);
  };

  const simulateListening = () => {
    if (isListening) return;
    setIsListening(true);
    setTranscript('');
    setResponse(null);
    
    // Simulate speech to text delay
    setTimeout(() => {
      setIsListening(false);
      const fakeCommand = "My kitchen sink is leaking, I need a plumber";
      setTranscript(fakeCommand);
      processCommand(fakeCommand);
    }, 2500);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      setTranscript(inputRef.current.value);
      processCommand(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <Layout hideFooter>
      <div className="absolute inset-0 ambient-glow z-0 pointer-events-none" />

      <div className="flex flex-col items-center justify-center relative z-10 px-6 pt-28 pb-24 min-h-screen max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-3">
            AI Assistant
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto">
            Describe your problem naturally. Let AI find the perfect professional for you.
          </p>
        </div>

        {/* Orb */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-8">
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border border-secondary/30 scale-[1.5] animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 rounded-full border border-secondary/40 scale-[1.2] animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.2s' }} />
            </>
          )}
          <button 
            onClick={simulateListening}
            className={`w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-secondary to-secondary-container shadow-[0_0_40px_rgba(245,158,11,0.6)] scale-110' 
                : 'bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-secondary/30 pulse-orb'
            }`}
          >
            <span className={`material-symbols-outlined text-5xl transition-colors ${isListening ? 'text-white' : 'text-secondary'}`} style={{fontVariationSettings:"'FILL' 1"}}>
              {isListening ? 'graphic_eq' : 'mic'}
            </span>
          </button>
        </div>

        <p className="h-6 text-sm font-medium text-secondary mb-8">{isListening ? 'Listening...' : transcript ? `"${transcript}"` : ''}</p>

        {/* Manual Input Fallback */}
        <form onSubmit={handleManualSubmit} className="w-full max-w-md mb-10 flex gap-2">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Or type your problem here..." 
            className="flex-1 bg-surface-container-low border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary/50 transition-colors"
          />
          <button type="submit" className="btn btn-secondary px-4"><span className="material-symbols-outlined">send</span></button>
        </form>

        {/* Command Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-2xl">
          {[
            { icon: 'plumbing', text: 'My sink is leaking' },
            { icon: 'electrical_services', text: 'AC is not cooling' },
            { icon: 'cleaning_services', text: 'Deep clean my 2BHK' },
            { icon: 'carpenter', text: 'Fix broken chair' },
          ].map(({ icon, text }) => (
            <button
              key={text}
              onClick={() => {
                setTranscript(text);
                processCommand(text);
              }}
              className="chip text-sm px-4 py-2.5 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30"
            >
              <span className="material-symbols-outlined text-sm">{icon}</span>
              {text}
            </button>
          ))}
        </div>

        {/* AI Response */}
        {response && (
          <div className="w-full card p-6 md:p-8 relative overflow-hidden animate-slide-up">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
            <div className="flex items-start gap-5 pl-4">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary animate-pulse" style={{fontVariationSettings:"'FILL' 1"}}>graphic_eq</span>
              </div>
              <div className="flex-grow">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Bharat AI
                </p>
                <p className="text-xl md:text-2xl font-headline font-bold text-on-surface leading-snug">
                  {response}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-on-surface-variant">Redirecting to verified matches...</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
