import Layout from '../components/Layout';

export default function VoiceAssistant() {
  return (
    <Layout hideFooter>
      <div className="absolute inset-0 ambient-glow z-0 pointer-events-none" />

      <div className="flex flex-col items-center justify-center relative z-10 px-6 pt-28 pb-24 min-h-screen max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight gradient-text mb-3">
            Listening...
          </h1>
          <p className="text-base md:text-lg text-on-surface-variant max-w-lg mx-auto">
            Speak naturally. Ask for job details, updates, or commands.
          </p>
        </div>

        {/* Orb */}
        <div className="relative w-52 h-52 md:w-64 md:h-64 flex items-center justify-center mb-14">
          <div className="absolute inset-0 rounded-full border border-secondary/10 scale-[1.35]" />
          <div className="absolute inset-0 rounded-full border border-secondary/20 scale-110" />
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-secondary to-secondary-container pulse-orb flex items-center justify-center z-10">
            <span className="material-symbols-outlined text-white text-5xl" style={{fontVariationSettings:"'FILL' 1"}}>mic</span>
          </div>
        </div>

        {/* Command Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 max-w-2xl">
          {[
            { icon: 'check_circle', text: '"Mark Complete"', accent: false },
            { icon: 'work', text: '"Show Jobs"', accent: true },
            { icon: 'schedule', text: '"Next Shift"', accent: false },
            { icon: 'support_agent', text: '"Call Support"', accent: false },
          ].map(({ icon, text, accent }) => (
            <button
              key={text}
              className={`chip ${accent ? 'chip-active' : ''} text-base px-5 py-3`}
            >
              <span className="material-symbols-outlined text-base">{icon}</span>
              {text}
            </button>
          ))}
        </div>

        {/* AI Response */}
        <div className="w-full card p-6 md:p-8 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
          <div className="flex items-start gap-5 pl-4">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings:"'FILL' 1"}}>graphic_eq</span>
            </div>
            <div className="flex-grow">
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                Bharat AI
              </p>
              <p className="text-xl md:text-2xl font-headline font-bold text-on-surface leading-snug">
                I found <span className="text-secondary">3 new jobs</span> in your area for tomorrow.
                Would you like me to read the details?
              </p>
              <div className="mt-5 flex gap-3">
                <button className="btn btn-primary">Yes, read them</button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
