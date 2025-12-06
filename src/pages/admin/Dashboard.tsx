import { FiUsers, FiDollarSign, FiPlay, FiTrendingUp } from 'react-icons/fi'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const stats = [
  { label: 'Total Users', value: '12,456', change: '+12%', icon: FiUsers, trend: 'up' },
  { label: 'Total Deposits', value: '$1.2M', change: '+8%', icon: FiDollarSign, trend: 'up' },
  { label: 'Total Bets', value: '45,678', change: '+23%', icon: FiPlay, trend: 'up' },
  { label: 'House Edge', value: '$156K', change: '-5%', icon: FiTrendingUp, trend: 'down' },
]

const chartData = [
  { name: 'Mon', deposits: 4000, bets: 2400, profit: 2400 },
  { name: 'Tue', deposits: 3000, bets: 1398, profit: 2210 },
  { name: 'Wed', deposits: 2000, bets: 9800, profit: 2290 },
  { name: 'Thu', deposits: 2780, bets: 3908, profit: 2000 },
  { name: 'Fri', deposits: 1890, bets: 4800, profit: 2181 },
  { name: 'Sat', deposits: 2390, bets: 3800, profit: 2500 },
  { name: 'Sun', deposits: 3490, bets: 4300, profit: 2100 },
]

const recentTransactions = [
  { id: 1, user: 'john@email.com', type: 'Deposit', amount: '$500', status: 'Completed', time: '2 min ago' },
  { id: 2, user: 'sarah@email.com', type: 'Withdraw', amount: '$1,200', status: 'Pending', time: '5 min ago' },
  { id: 3, user: 'mike@email.com', type: 'Bet', amount: '$50', status: 'Completed', time: '10 min ago' },
  { id: 4, user: 'lisa@email.com', type: 'Win', amount: '$250', status: 'Completed', time: '15 min ago' },
  { id: 5, user: 'david@email.com', type: 'Deposit', amount: '$100', status: 'Completed', time: '20 min ago' },
]

const topGames = [
  { name: 'Aviator', bets: 12456, profit: '$45,678' },
  { name: 'Sweet Bonanza', bets: 9876, profit: '$34,567' },
  { name: 'Gates of Olympus', bets: 8765, profit: '$28,456' },
  { name: 'Blackjack', bets: 6543, profit: '$23,456' },
  { name: 'Roulette', bets: 5432, profit: '$19,876' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C2333', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="deposits" 
                stackId="1"
                stroke="#00D4AA" 
                fill="#00D4AA33" 
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stackId="1"
                stroke="#8B5CF6" 
                fill="#8B5CF633" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bets Chart */}
        <div className="card p-6">
          <h3 className="font-semibold mb-4">Daily Bets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1C2333', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="bets" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ fill: '#F97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-semibold">Recent Transactions</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left">User</th>
                <th className="table-header text-left">Type</th>
                <th className="table-header text-right">Amount</th>
                <th className="table-header text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="table-row">
                  <td className="table-cell">{tx.user}</td>
                  <td className="table-cell">{tx.type}</td>
                  <td className="table-cell text-right">{tx.amount}</td>
                  <td className="table-cell text-center">
                    <span className={`badge ${
                      tx.status === 'Completed' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Games */}
        <div className="card overflow-hidden">
          <div className="p-4 border-b border-white/5">
            <h3 className="font-semibold">Top Games</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-header text-left">Game</th>
                <th className="table-header text-right">Total Bets</th>
                <th className="table-header text-right">Profit</th>
              </tr>
            </thead>
            <tbody>
              {topGames.map((game) => (
                <tr key={game.name} className="table-row">
                  <td className="table-cell font-medium">{game.name}</td>
                  <td className="table-cell text-right text-gray-400">{game.bets.toLocaleString()}</td>
                  <td className="table-cell text-right text-primary">{game.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
