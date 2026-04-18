import { useState } from 'react';
import WorkerLayout from '../../components/worker/WorkerLayout';

const periods = ['Today', 'This Week', 'This Month', 'All Time'];

const transactions = [
  { id: 1, title: 'Kitchen Sink Repair', client: 'Amit Patel', amount: '+₹800', date: 'Today, 11:30 AM', status: 'completed' },
  { id: 2, title: 'Water Heater Install', client: 'Raj Sharma', amount: '+₹3,500', date: 'Today, 2:00 PM', status: 'pending' },
  { id: 3, title: 'Bathroom Plumbing', client: 'Vikram Desai', amount: '+₹12,000', date: 'Yesterday', status: 'completed' },
  { id: 4, title: 'Pipe Leakage Fix', client: 'Nisha Gupta', amount: '+₹1,200', date: '2 days ago', status: 'completed' },
  { id: 5, title: 'Washing Machine Setup', client: 'Arjun Reddy', amount: '+₹900', date: '3 days ago', status: 'completed' },
  { id: 6, title: 'Platform Fee', client: 'Bharat Pro', amount: '-₹1,840', date: '3 days ago', status: 'fee' },
];

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
  const maxVal = Math.max(...weekData.map(d => d.value));

  return (
    <WorkerLayout>
      <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col gap-6">
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
          <div className="card p-5 relative overflow-hidden">
            <div className="absolute top-3 right-3 opacity-[0.06]">
              <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
            </div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Earned</p>
            <p className="text-3xl font-headline font-bold text-on-surface">₹1,24,500</p>
            <div className="mt-3 flex items-center gap-1.5">
              <span className="badge badge-success text-xs">
                <span className="material-symbols-outlined text-xs">trending_up</span> +18.5%
              </span>
              <span className="text-xs text-on-surface-variant">vs last month</span>
            </div>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">This Week</p>
            <p className="text-3xl font-headline font-bold text-on-surface">₹19,100</p>
            <p className="text-xs text-on-surface-variant mt-3">7 jobs completed</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Pending Payout</p>
            <p className="text-3xl font-headline font-bold text-secondary">₹4,300</p>
            <p className="text-xs text-on-surface-variant mt-3">Next payout: Tomorrow</p>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="card p-5 md:p-6">
          <h2 className="text-base font-headline font-bold text-on-surface mb-5">Weekly Overview</h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full max-w-[40px] rounded-t-lg bg-secondary/20 hover:bg-secondary/40 transition-colors relative group" style={{height: `${(value / maxVal) * 100}%`}}>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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
                  {tx.status === 'pending' && <p className="text-xs text-secondary">Pending</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdraw */}
        <div className="card p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-on-surface">Ready to withdraw?</p>
            <p className="text-xs text-on-surface-variant mt-0.5">Instant transfer to your bank account.</p>
          </div>
          <button className="btn btn-primary">
            <span className="material-symbols-outlined text-base">account_balance</span>
            Withdraw ₹4,300
          </button>
        </div>
      </div>
    </WorkerLayout>
  );
}
