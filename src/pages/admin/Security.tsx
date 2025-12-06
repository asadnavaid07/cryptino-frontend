import { useState, useEffect } from 'react'
import { FiSearch, FiDownload, FiShield, FiAlertTriangle, FiInfo, FiUser, FiLogIn, FiLogOut, FiDollarSign, FiSettings, FiRefreshCw } from 'react-icons/fi'

interface SecurityLog {
  id: string
  timestamp: string
  eventType: 'login' | 'logout' | 'failed_login' | 'password_change' | 'withdrawal' | 'deposit' | 'settings_change' | 'admin_action' | 'suspicious'
  userId: string | null
  userEmail: string | null
  ipAddress: string
  userAgent: string
  details: string
  severity: 'info' | 'warning' | 'critical'
  country: string
}

const sampleLogs: SecurityLog[] = [
  { id: '1', timestamp: '2024-01-15 14:32:15', eventType: 'login', userId: 'usr_123', userEmail: 'john@email.com', ipAddress: '192.168.1.100', userAgent: 'Chrome 120 / Windows', details: 'Successful login', severity: 'info', country: 'US' },
  { id: '2', timestamp: '2024-01-15 14:30:45', eventType: 'failed_login', userId: null, userEmail: 'admin@cryptino.com', ipAddress: '45.33.32.156', userAgent: 'Unknown Bot', details: 'Invalid password - Attempt 3/5', severity: 'warning', country: 'CN' },
  { id: '3', timestamp: '2024-01-15 14:28:00', eventType: 'withdrawal', userId: 'usr_456', userEmail: 'alice@email.com', ipAddress: '203.45.67.89', userAgent: 'Safari 17 / macOS', details: 'Withdrawal request: $5,000 BTC', severity: 'info', country: 'AU' },
  { id: '4', timestamp: '2024-01-15 14:25:30', eventType: 'suspicious', userId: 'usr_789', userEmail: 'bob@email.com', ipAddress: '185.220.101.1', userAgent: 'Tor Browser', details: 'Multiple rapid bets detected - Possible bot activity', severity: 'critical', country: 'Unknown' },
  { id: '5', timestamp: '2024-01-15 14:20:00', eventType: 'admin_action', userId: 'usr_admin', userEmail: 'admin@cryptino.com', ipAddress: '10.0.0.1', userAgent: 'Chrome 120 / macOS', details: 'User usr_456 balance adjusted +$500', severity: 'warning', country: 'US' },
  { id: '6', timestamp: '2024-01-15 14:15:00', eventType: 'password_change', userId: 'usr_321', userEmail: 'mike@email.com', ipAddress: '77.88.99.100', userAgent: 'Firefox 121 / Linux', details: 'Password changed successfully', severity: 'info', country: 'DE' },
  { id: '7', timestamp: '2024-01-15 14:10:00', eventType: 'settings_change', userId: 'usr_admin', userEmail: 'admin@cryptino.com', ipAddress: '10.0.0.1', userAgent: 'Chrome 120 / macOS', details: 'Min withdrawal changed: $10 -> $20', severity: 'warning', country: 'US' },
  { id: '8', timestamp: '2024-01-15 14:05:00', eventType: 'failed_login', userId: null, userEmail: 'admin@cryptino.com', ipAddress: '45.33.32.156', userAgent: 'Unknown Bot', details: 'Invalid password - Attempt 5/5 - Account locked', severity: 'critical', country: 'CN' },
  { id: '9', timestamp: '2024-01-15 14:00:00', eventType: 'deposit', userId: 'usr_999', userEmail: 'whale@email.com', ipAddress: '198.51.100.1', userAgent: 'Chrome 120 / Windows', details: 'Deposit: $50,000 ETH', severity: 'info', country: 'AE' },
  { id: '10', timestamp: '2024-01-15 13:55:00', eventType: 'logout', userId: 'usr_123', userEmail: 'john@email.com', ipAddress: '192.168.1.100', userAgent: 'Chrome 120 / Windows', details: 'User logged out', severity: 'info', country: 'US' },
]

export default function Security() {
  const [logs, setLogs] = useState<SecurityLog[]>(sampleLogs)
  const [filteredLogs, setFilteredLogs] = useState<SecurityLog[]>(sampleLogs)
  const [search, setSearch] = useState('')
  const [eventFilter, setEventFilter] = useState<string>('all')
  const [severityFilter, setSeverityFilter] = useState<string>('all')
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    let filtered = logs
    
    if (search) {
      const query = search.toLowerCase()
      filtered = filtered.filter(log => 
        log.userEmail?.toLowerCase().includes(query) ||
        log.ipAddress.includes(query) ||
        log.details.toLowerCase().includes(query)
      )
    }
    
    if (eventFilter !== 'all') {
      filtered = filtered.filter(log => log.eventType === eventFilter)
    }
    
    if (severityFilter !== 'all') {
      filtered = filtered.filter(log => log.severity === severityFilter)
    }
    
    setFilteredLogs(filtered)
  }, [logs, search, eventFilter, severityFilter])

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate new log entry
        const newLog: SecurityLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          eventType: ['login', 'logout', 'deposit', 'withdrawal'][Math.floor(Math.random() * 4)] as SecurityLog['eventType'],
          userId: `usr_${Math.floor(Math.random() * 1000)}`,
          userEmail: `user${Math.floor(Math.random() * 100)}@email.com`,
          ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Chrome 120 / Windows',
          details: 'Auto-generated log entry',
          severity: ['info', 'warning'][Math.floor(Math.random() * 2)] as SecurityLog['severity'],
          country: ['US', 'UK', 'DE', 'AU'][Math.floor(Math.random() * 4)]
        }
        setLogs(prev => [newLog, ...prev].slice(0, 100))
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return <FiLogIn className="w-4 h-4 text-green-400" />
      case 'logout': return <FiLogOut className="w-4 h-4 text-gray-400" />
      case 'failed_login': return <FiAlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'password_change': return <FiUser className="w-4 h-4 text-blue-400" />
      case 'withdrawal': case 'deposit': return <FiDollarSign className="w-4 h-4 text-cyan-400" />
      case 'settings_change': return <FiSettings className="w-4 h-4 text-purple-400" />
      case 'admin_action': return <FiShield className="w-4 h-4 text-orange-400" />
      case 'suspicious': return <FiAlertTriangle className="w-4 h-4 text-red-400" />
      default: return <FiInfo className="w-4 h-4 text-gray-400" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-blue-500/20 text-blue-400'
    }
  }

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Event Type', 'User Email', 'IP Address', 'Country', 'Details', 'Severity'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.eventType,
        log.userEmail || 'N/A',
        log.ipAddress,
        log.country,
        `"${log.details}"`,
        log.severity
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `security-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const stats = {
    total: logs.length,
    critical: logs.filter(l => l.severity === 'critical').length,
    warnings: logs.filter(l => l.severity === 'warning').length,
    failedLogins: logs.filter(l => l.eventType === 'failed_login').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Security Logs</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
              autoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <FiRefreshCw className={autoRefresh ? 'animate-spin' : ''} />
            {autoRefresh ? 'Live' : 'Auto-Refresh'}
          </button>
          <button
            onClick={exportLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
          >
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-400">Total Events</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold text-red-400">{stats.critical}</div>
          <div className="text-sm text-gray-400">Critical</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-400">{stats.warnings}</div>
          <div className="text-sm text-gray-400">Warnings</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold text-orange-400">{stats.failedLogins}</div>
          <div className="text-sm text-gray-400">Failed Logins</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email, IP, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1d2e] border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="bg-[#1a1d2e] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Events</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
          <option value="failed_login">Failed Login</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="password_change">Password Change</option>
          <option value="admin_action">Admin Action</option>
          <option value="suspicious">Suspicious</option>
        </select>
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-[#1a1d2e] border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-[#1a1d2e] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-4 font-medium text-gray-400">Timestamp</th>
                <th className="text-left p-4 font-medium text-gray-400">Event</th>
                <th className="text-left p-4 font-medium text-gray-400">User</th>
                <th className="text-left p-4 font-medium text-gray-400">IP Address</th>
                <th className="text-left p-4 font-medium text-gray-400">Country</th>
                <th className="text-left p-4 font-medium text-gray-400">Details</th>
                <th className="text-left p-4 font-medium text-gray-400">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} className={`border-t border-white/5 hover:bg-white/5 ${
                  log.severity === 'critical' ? 'bg-red-500/5' : ''
                }`}>
                  <td className="p-4 text-sm text-gray-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getEventIcon(log.eventType)}
                      <span className="capitalize text-sm">{log.eventType.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{log.userEmail || <span className="text-gray-500">N/A</span>}</td>
                  <td className="p-4 font-mono text-sm text-gray-300">{log.ipAddress}</td>
                  <td className="p-4 text-sm text-gray-300">{log.country}</td>
                  <td className="p-4 text-sm text-gray-300 max-w-xs truncate">{log.details}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSeverityBadge(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No logs found matching your filters.
          </div>
        )}
      </div>
    </div>
  )
}
