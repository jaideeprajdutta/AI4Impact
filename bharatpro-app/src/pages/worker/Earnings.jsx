import { useState, useEffect } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';
import { getWorkerJobs } from '../../api';

const WORKER_ID = 1;
const periods = ['Today', 'This Week', 'This Month', 'All Time'];

const weekData = [
  { day: 'Mon', value: 2400 },
  { day: 'Tue', value: 1800 },
  { day: 'Wed', value: 3200 },
  { day: 'Thu', value: 2800 },
  { day: 'Fri', value: 4100 },
  { day: 'Sat', value: 3600 },
  { day: 'Sun', value: 1200 },
];

export default function Earnings() {
  const [period, setPeriod] = useState('This Week');
  const [withdrawn, setWithdrawn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const maxVal = Math.max(...weekData.map(d => d.value));

  useEffect(() => {
    getWorkerJobs(WORKER_ID)
      .then(data => setJobs(data.jobs || []))
      .catch(console.error);
  }, []);

  const completedJobs = jobs.filter(j => j.status === 'completed');
  const activeJobs = jobs.filter(j => j.status === 'assigned');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + (j.price || 0), 0);
  const pendingPayout = activeJobs.reduce((sum, j) => sum + (j.price || 0), 0);

  const transactions = jobs
    .filter(j => j.status === 'completed' || j.status === 'assigned')
    .map(j => ({
      id: j.id,
      title: j.required_skill || 'Service',
      client: j.location || 'Client',
      amount: j.status === 'completed' ? `+₹${j.price}` : `+₹${j.price} (Est)`,
      date: 'Recent',
      status: j.status,
    }));

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-headline font-bold text-on-surface">Earnings</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">Track your income and payouts.</p>
        </div>

        {/* Period Tabs */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {periods.map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`chip ${period === p ? 'chip-active' : ''}`}>{p}</button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5 relative overflow-hidden shadow-glow">
            <div className="absolute top-3 right-3 opacity-[0.06]">
              <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
            </div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Earned</p>
            <p className="text-3xl font-headline font-bold text-on-surface">₹{totalEarnings.toLocaleString()}</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="badge badge-success text-xs">
                <span className="material-symbols-outlined text-xs">trending_up</span> +12%
              </span>
              <span className="text-xs text-on-surface-variant">vs last month</span>
            </div>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Completed Jobs</p>
            <p className="text-3xl font-headline font-bold text-on-surface">{completedJobs.length}</p>
            <p className="text-xs text-on-surface-variant mt-3">All time</p>
          </div>
          <div className="card p-5 border-secondary/20 bg-secondary/5">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Pending Payout</p>
            <p className="text-3xl font-headline font-bold text-secondary">₹{withdrawn ? 0 : pendingPayout.toLocaleString()}</p>
            <p className="text-xs text-on-surface-variant mt-3">{withdrawn ? 'Transfer initiated' : 'Next payout: Tomorrow'}</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="card p-5 md:p-6">
          <h2 className="text-base font-headline font-bold text-on-surface mb-5">Weekly Overview</h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full max-w-[40px] rounded-t-lg bg-secondary/20 hover:bg-secondary/40 transition-colors relative group" style={{height: `${(value / maxVal) * 100}%`}}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 bg-surface px-2 py-1 rounded shadow-premium border border-white/10">
                    ₹{value.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction List */}
        <div>
          <h2 className="text-base font-headline font-bold text-on-surface mb-4">Recent Transactions</h2>
          {transactions.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-on-surface-variant">No recent earnings to display.</p>
            </div>
          ) : (
            <div className="card overflow-hidden divide-y divide-white/[0.04]">
              {transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.status === 'fee' ? 'bg-error-container/30' : 'bg-tertiary/10'
                    }`}>
                      <span className={`material-symbols-outlined text-base ${tx.status === 'fee' ? 'text-error' : 'text-tertiary'}`}>
                        {tx.status === 'fee' ? 'receipt_long' : 'check_circle'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-on-surface truncate">{tx.title}</p>
                      <p className="text-xs text-on-surface-variant">{tx.client} • {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className={`text-sm font-headline font-bold ${tx.status === 'fee' ? 'text-error' : 'text-tertiary'}`}>{tx.amount}</p>
                    {tx.status === 'assigned' && <p className="text-xs text-secondary">Pending</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdraw */}
        <div className="card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-on-surface">Ready to withdraw?</p>
            <p className="text-xs text-on-surface-variant mt-0.5">Instant transfer to your bank account.</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setWithdrawn(true)}
            disabled={withdrawn || pendingPayout === 0}
          >
            <span className="material-symbols-outlined text-base">{withdrawn ? 'check' : 'account_balance'}</span>
            {withdrawn ? 'Transferred' : `Withdraw ₹${pendingPayout.toLocaleString()}`}
          </button>
        </div>
      </div>
    </WorkerLayout>
  );
}
