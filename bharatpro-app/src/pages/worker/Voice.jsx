import WorkerLayout from '../../components/worker/WorkerLayout';

export default function Voice() {
  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-3xl mx-auto flex flex-col items-center min-h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-2xl md:text-3xl font-headline font-bold gradient-text mb-2">
            Voice Assistant
          </h1>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Speak naturally. Update jobs, check earnings, or get help hands-free.
          </p>
        </div>

        {/* Orb */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-12">
          <div className="absolute inset-0 rounded-full border border-secondary/10 scale-[1.4]" />
          <div className="absolute inset-0 rounded-full border border-secondary/20 scale-[1.15]" />
          <button className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-secondary to-secondary-container pulse-orb flex items-center justify-center z-10 hover:scale-105 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-white text-5xl" style={{fontVariationSettings:"'FILL' 1"}}>mic</span>
          </button>
        </div>

        {/* Quick Commands */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10 max-w-xl">
          {[
            { icon: 'check_circle', text: '"Job done"' },
            { icon: 'navigation', text: '"Navigate to client"' },
            { icon: 'account_balance_wallet', text: '"My earnings"' },
            { icon: 'schedule', text: '"Next job"' },
            { icon: 'support_agent', text: '"Call support"' },
            { icon: 'edit_note', text: '"Add notes"' },
          ].map(({ icon, text }) => (
            <button key={text} className="chip text-sm px-4 py-2.5">
              <span className="material-symbols-outlined text-sm">{icon}</span>
              {text}
            </button>
          ))}
        </div>

        {/* AI Response */}
        <div className="w-full card p-5 md:p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-tertiary rounded-full" />
          <div className="flex items-start gap-4 pl-3">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings:"'FILL' 1"}}>graphic_eq</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">Bharat AI</p>
              <p className="text-lg font-headline font-bold text-on-surface leading-snug">
                You have <span className="text-secondary">2 pending jobs</span> nearby. The closest is a kitchen sink repair in Andheri, 2.3 km away.
                Shall I accept it?
              </p>
              <div className="mt-4 flex gap-2">
                <button className="btn btn-primary text-sm py-2.5">Yes, accept</button>
                <button className="btn btn-secondary text-sm py-2.5">Show details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Commands */}
        <div className="w-full mt-6">
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Recent</p>
          <div className="space-y-2">
            {[
              { text: '"Mark water heater job complete"', time: '2 min ago', icon: 'check' },
              { text: '"How much did I earn today?"', time: '15 min ago', icon: 'payments' },
              { text: '"Navigate to Raj Sharma\'s address"', time: '1 hr ago', icon: 'navigation' },
            ].map((cmd, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant/50 text-base">{cmd.icon}</span>
                <span className="text-sm text-on-surface-variant flex-1">{cmd.text}</span>
                <span className="text-xs text-outline shrink-0">{cmd.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkerLayout>
  );
}
