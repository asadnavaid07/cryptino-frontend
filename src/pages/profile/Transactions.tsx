import { useState } from 'react'
import { FiCalendar, FiChevronDown } from 'react-icons/fi'

export default function Transactions() {
  const [dateFrom, setDateFrom] = useState('06/05/2025')
  const [dateTo, setDateTo] = useState('08/05/2025')
  const [type, setType] = useState('All')

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transactions</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Period from</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-36 bg-[#252836] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Period to</label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-36 bg-[#252836] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Transaction type</label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-36 bg-[#252836] border border-white/10 rounded-lg px-4 py-3 text-white text-sm appearance-none focus:outline-none focus:border-primary/50"
            >
              <option>All</option>
              <option>Deposit</option>
              <option>Withdraw</option>
              <option>Bet</option>
              <option>Win</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
          </div>
        </div>
        <button className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 px-8 py-3 rounded-lg text-sm font-medium transition-opacity">
          Filter
        </button>
      </div>

      {/* Empty State */}
      <div className="bg-[#1a1d2e] rounded-xl p-16 text-center">
        <div className="w-20 h-20 mx-auto mb-4 text-gray-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
            <rect x="3" y="6" width="18" height="12" rx="2" />
            <circle cx="12" cy="12" r="2" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">You don't have any transactions.</h3>
        <p className="text-gray-500">Explore our exciting offers and start your journey today.</p>
      </div>
    </div>
  )
}
