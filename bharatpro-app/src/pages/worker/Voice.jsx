import { useState, useEffect, useRef } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { useApp } from '../../context/AppContext';

export default function Voice() {
  const { bookings, getWorkerMetrics, updateBookingStatus, currentWorkerId } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(null);
  const inputRef = useRef(null);

  const metrics = getWorkerMetrics(currentWorkerId);
  const incomingRequests = bookings.filter(b => b.workerId === currentWorkerId && b.status === 'pending');

  const processCommand = (cmd) => {
    const text = cmd.toLowerCase();
    
    if (text.includes('earnings') || text.includes('balance') || text.includes('money')) {
      setResponse(`You have earned ₹${metrics.totalEarnings} so far. You have ₹${metrics.activeJobs * 1000} (est.) in pending payouts.`);
    } else if (text.includes('job') || text.includes('request') || text.includes('work')) {
      if (incomingRequests.length > 0) {
        setResponse(`You have ${incomingRequests.length} pending requests. The closest one is ${incomingRequests[0].title}. Shall I accept it?`);
      } else {
        setResponse(`You have no pending requests right now. Would you like me to notify you when one arrives?`);
      }
    } else if (text.includes('accept')) {
      if (incomingRequests.length > 0) {
        updateBookingStatus(incomingRequests[0].id, 'active');
        setResponse(`Done. I have accepted the job for ${incomingRequests[0].title}.`);
      } else {
        setResponse(`There are no jobs to accept.`);
      }
    } else if (text.includes('complete') || text.includes('done')) {
       const activeJobs = bookings.filter(b => b.workerId === currentWorkerId && b.status === 'active');
       if(activeJobs.length > 0){
          updateBookingStatus(activeJobs[0].id, 'completed');
          setResponse(`Great! I've marked ${activeJobs[0].title} as completed. Your earnings have been updated.`);
       } else {
          setResponse(`You don't have any active jobs to complete.`);
       }
    } else {
      setResponse(`I didn't quite catch that. Try asking about your earnings or pending jobs.`);
    }
  };

  const simulateListening = () => {
    if (isListening) return;
    setIsListening(true);
    setTranscript('');
    setResponse(null);
    
    // Simulate speech to text delay
    setTimeout(() => {
      setIsListening(false);
      const fakeCommand = "Show my earnings";
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
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto flex flex-col items-center min-h-[calc(100vh-8rem)] animate-fade-in">
        {/* Header */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-2xl md:text-3xl font-headline font-bold gradient-text mb-2">
            AI Assistant
          </h1>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Speak naturally. Update jobs, check earnings, or get help hands-free.
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
                : 'bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-secondary/30'
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
            placeholder="Or type your command here..." 
            className="flex-1 bg-surface-container-low border border-white/[0.06] rounded-xl px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary/50 transition-colors"
          />
          <button type="submit" className="btn btn-secondary px-4"><span className="material-symbols-outlined">send</span></button>
        </form>

        {/* Quick Commands */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-xl">
          {[
            { icon: 'check_circle', text: 'Job done' },
            { icon: 'account_balance_wallet', text: 'My earnings' },
            { icon: 'work', text: 'Pending jobs' },
            { icon: 'check', text: 'Accept job' },
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
          <div className="w-full card p-5 md:p-6 relative overflow-hidden animate-slide-up">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
            <div className="flex items-start gap-4 pl-3">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings:"'FILL' 1"}}>graphic_eq</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Bharat AI</p>
                <p className="text-lg font-headline font-bold text-on-surface leading-snug">
                  {response}
                </p>
                {response.includes('Shall I accept it') && incomingRequests.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => processCommand('accept')} className="btn btn-primary text-sm py-2.5">Yes, accept</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
