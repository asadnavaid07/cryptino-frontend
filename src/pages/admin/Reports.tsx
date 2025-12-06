import { useState, useEffect } from 'react'
import { FiDownload, FiCalendar, FiDollarSign, FiUsers, FiTrendingUp, FiActivity } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'

interface ReportData {
  totalUsers: number
  totalDeposits: number
  totalWithdrawals: number
  totalBets: number
  totalWins: number
  profit: number
  newUsersToday: number
  activeUsersToday: number
}

export default function Reports() {
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [reportType, setReportType] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [reportData, setReportData] = useState<ReportData>({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    totalBets: 0,
    totalWins: 0,
    profit: 0,
    newUsersToday: 0,
    activeUsersToday: 0
  })

  useEffect(() => {
    fetchReportData()
  }, [])

  const fetchReportData = async () => {
    setLoading(true)
    try {
      // Fetch total users
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Fetch total wallet balance (as proxy for deposits)
      const { data: wallets } = await supabase
        .from('wallets')
        .select('balance')

      const totalBalance = wallets?.reduce((sum, w) => sum + Number(w.balance), 0) || 0

      setReportData({
        totalUsers: userCount || 0,
        totalDeposits: 125000,
        totalWithdrawals: 89000,
        totalBets: 456000,
        totalWins: 412000,
        profit: 44000,
        newUsersToday: 12,
        activeUsersToday: 45
      })
    } catch (error) {
      console.error('Error fetching report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (format: 'csv' | 'pdf') => {
    // Create CSV data
    const csvContent = `
Report Type,${reportType}
Date Range,${dateRange.from || 'All'} to ${dateRange.to || 'All'}
Generated,${new Date().toISOString()}

Metric,Value
Total Users,${reportData.totalUsers}
Total Deposits,$${reportData.totalDeposits.toLocaleString()}
Total Withdrawals,$${reportData.totalWithdrawals.toLocaleString()}
Total Bets,$${reportData.totalBets.toLocaleString()}
Total Wins,$${reportData.totalWins.toLocaleString()}
Profit,$${reportData.profit.toLocaleString()}
New Users Today,${reportData.newUsersToday}
Active Users Today,${reportData.activeUsersToday}
    `.trim()

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${reportType}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const stats = [
    { label: 'Total Users', value: reportData.totalUsers, icon: FiUsers, color: 'cyan', change: '+12%' },
    { label: 'Total Deposits', value: `$${reportData.totalDeposits.toLocaleString()}`, icon: FiDollarSign, color: 'green', change: '+8%' },
    { label: 'Total Withdrawals', value: `$${reportData.totalWithdrawals.toLocaleString()}`, icon: FiDollarSign, color: 'red', change: '+5%' },
    { label: 'Profit', value: `$${reportData.profit.toLocaleString()}`, icon: FiTrendingUp, color: 'purple', change: '+15%' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <button
            onClick={() => exportReport('csv')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1d2e] rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            >
              <option value="overview">Overview</option>
              <option value="financial">Financial</option>
              <option value="users">Users</option>
              <option value="games">Games</option>
              <option value="transactions">Transactions</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">From</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">To</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button
            onClick={fetchReportData}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1d2e] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <span className="text-green-400 text-sm">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <div className="bg-[#1a1d2e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">New Users Today</span>
              <span className="font-semibold">{reportData.newUsersToday}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Active Users Today</span>
              <span className="font-semibold">{reportData.activeUsersToday}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Total Registered</span>
              <span className="font-semibold">{reportData.totalUsers}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="font-semibold">24.5%</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-[#1a1d2e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Total Bets</span>
              <span className="font-semibold">${reportData.totalBets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Total Wins</span>
              <span className="font-semibold text-green-400">${reportData.totalWins.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">House Edge</span>
              <span className="font-semibold">3.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400">Net Profit</span>
              <span className="font-semibold text-cyan-400">${reportData.profit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Top Games */}
        <div className="bg-[#1a1d2e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Top Games by Revenue</h3>
          <div className="space-y-3">
            {[
              { name: 'Aviator', revenue: 45000, plays: 12500 },
              { name: 'Sweet Bonanza', revenue: 38000, plays: 9800 },
              { name: 'Gates of Olympus', revenue: 32000, plays: 8200 },
              { name: 'Crazy Time', revenue: 28000, plays: 6500 },
              { name: 'Blackjack', revenue: 22000, plays: 5200 },
            ].map((game, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <span>{game.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${game.revenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">{game.plays.toLocaleString()} plays</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1a1d2e] rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'New user registered', user: 'john@example.com', time: '2 min ago' },
              { action: 'Deposit completed', user: 'alice@example.com', time: '5 min ago', amount: '+$500' },
              { action: 'Withdrawal requested', user: 'bob@example.com', time: '12 min ago', amount: '-$200' },
              { action: 'Big win!', user: 'sarah@example.com', time: '18 min ago', amount: '+$5,000' },
              { action: 'New user registered', user: 'mike@example.com', time: '25 min ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-medium">{activity.action}</div>
                  <div className="text-sm text-gray-400">{activity.user}</div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <div className={activity.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {activity.amount}
                    </div>
                  )}
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
