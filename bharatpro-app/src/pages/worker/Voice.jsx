import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { sendVoiceCommand, sendAudioCommand } from '../../api';

const WORKER_ID = 1; // Simulated logged-in worker ID

export default function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleIntent = (data) => {
    setResponse(data.response || data.message || 'Command received.');
    setTranscript(data.text || transcript);

    if (data.intent === 'show_jobs' || data.intent === 'accept_job' || data.intent === 'reject_job') {
      setTimeout(() => {
        navigate('/worker/jobs');
      }, 1500);
    }
  };

  const processCommand = async (cmd) => {
    if (!cmd.trim()) return;
    setLoading(true);
    setResponse(null);
    try {
      const data = await sendVoiceCommand(WORKER_ID, cmd);
      handleIntent(data);
    } catch (e) {
      setResponse('Sorry, I could not process that command. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processAudio = async (audioBlob) => {
    setLoading(true);
    setResponse(null);
    try {
      const data = await sendAudioCommand(WORKER_ID, audioBlob);
      handleIntent(data);
    } catch (e) {
      setResponse('Sorry, failed to transcribe audio. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = async () => {
    if (isListening) {
      // STOP listening
      setIsListening(false);
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    } else {
      // START listening
      setTranscript('');
      setResponse(null);
      audioChunksRef.current = [];

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          processAudio(audioBlob);
          // Clean up stream
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setResponse("Microphone access denied or unavailable.");
      }
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      const cmd = inputRef.current.value.trim();
      setTranscript(cmd);
      processCommand(cmd);
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
            onClick={toggleListening}
            className={`w-36 h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${isListening
                ? 'bg-gradient-to-br from-secondary to-secondary-container shadow-[0_0_40px_rgba(245,158,11,0.6)] scale-110'
                : 'bg-surface-container hover:bg-surface-container-high border border-white/10 hover:border-secondary/30'
              }`}
          >
            <span className={`material-symbols-outlined text-5xl transition-colors ${isListening ? 'text-white' : 'text-secondary'}`} style={{ fontVariationSettings: "'FILL' 1" }}>
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
        {loading && (
          <div className="w-full card p-5 md:p-6 relative overflow-hidden animate-slide-up">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
            <div className="flex items-start gap-4 pl-3">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-base animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>progress_activity</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Bharat AI</p>
                <p className="text-lg font-headline font-bold text-on-surface leading-snug">Processing your command...</p>
              </div>
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="w-full card p-5 md:p-6 relative overflow-hidden animate-slide-up">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
            <div className="flex items-start gap-4 pl-3">
              <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Bharat AI</p>
                <p className="text-lg font-headline font-bold text-on-surface leading-snug">
                  {response}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkerLayout>
  );
}
