import { useState } from 'react'
import { FiCopy, FiCheck, FiArrowDownLeft, FiArrowUpRight, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const cryptoOptions = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26A17B' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', icon: 'Ł', color: '#BFBBBB' },
  { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', icon: 'Ð', color: '#C2A633' },
]

const recentTransactions = [
  { id: 1, type: 'deposit', amount: 0.05, currency: 'BTC', status: 'completed', date: '2024-01-15 14:30' },
  { id: 2, type: 'withdraw', amount: 100, currency: 'USDT', status: 'pending', date: '2024-01-14 09:15' },
  { id: 3, type: 'deposit', amount: 0.5, currency: 'ETH', status: 'completed', date: '2024-01-13 18:45' },
]

export default function Wallet() {
  const { wallet } = useAuth()
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit')
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0])
  const [amount, setAmount] = useState('')
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [copied, setCopied] = useState(false)

  const depositAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'

  const formatBalance = (balance: number) => {
    return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Wallet</h1>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl p-6" style={{
          background: 'linear-gradient(135deg, rgba(0, 163, 255, 0.2) 0%, rgba(0, 100, 200, 0.1) 100%)',
          border: '1px solid rgba(0, 163, 255, 0.3)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F7931A] flex items-center justify-center">
              <span className="text-white font-bold">₿</span>
            </div>
            <span className="text-gray-400">Total Balance</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            ${wallet ? formatBalance(wallet.balance) : '0.00'}
          </div>
          <div className="text-sm text-green-400">+2.5% from last week</div>
        </div>

        <div className="rounded-2xl p-6" style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(20, 120, 60, 0.1) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <FiArrowDownLeft className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-400">Total Deposits</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$12,450.00</div>
          <div className="text-sm text-gray-400">15 transactions</div>
        </div>

        <div className="rounded-2xl p-6" style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(150, 40, 40, 0.1) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <FiArrowUpRight className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-400">Total Withdrawals</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">$8,230.00</div>
          <div className="text-sm text-gray-400">8 transactions</div>
        </div>
      </div>

      {/* Deposit / Withdraw Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Deposit/Withdraw Form */}
        <div className="rounded-2xl p-6" style={{
          background: 'linear-gradient(180deg, rgba(20, 30, 50, 0.9) 0%, rgba(15, 25, 40, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'deposit'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <FiArrowDownLeft className="w-5 h-5" />
              Deposit
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'withdraw'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <FiArrowUpRight className="w-5 h-5" />
              Withdraw
            </button>
          </div>

          {/* Crypto Selection */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-3">Select Cryptocurrency</label>
            <div className="grid grid-cols-5 gap-2">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => setSelectedCrypto(crypto)}
                  className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    selectedCrypto.id === crypto.id
                      ? 'bg-white/10 ring-2 ring-cyan-500'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-2xl" style={{ color: crypto.color }}>{crypto.icon}</span>
                  <span className="text-xs text-gray-400">{crypto.symbol}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'deposit' ? (
            <>
              {/* Deposit Address */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-3">
                  Your {selectedCrypto.name} Deposit Address
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={depositAddress}
                    readOnly
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono"
                  />
                  <button
                    onClick={handleCopyAddress}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied ? (
                      <FiCheck className="w-5 h-5 text-green-400" />
                    ) : (
                      <FiCopy className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-4xl" style={{ color: selectedCrypto.color }}>{selectedCrypto.icon}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-gray-400">
                Send only {selectedCrypto.name} ({selectedCrypto.symbol}) to this address.
                <br />Minimum deposit: 0.0001 {selectedCrypto.symbol}
              </p>
            </>
          ) : (
            <>
              {/* Withdraw Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Withdrawal Address</label>
                  <input
                    type="text"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    placeholder={`Enter your ${selectedCrypto.symbol} address`}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-20 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-medium">
                      MAX
                    </button>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-500">Available: ${wallet ? formatBalance(wallet.balance) : '0.00'}</span>
                    <span className="text-gray-500">Fee: 0.0001 {selectedCrypto.symbol}</span>
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 mt-4" style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
                }}>
                  Withdraw {selectedCrypto.symbol}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right: Recent Transactions */}
        <div className="rounded-2xl p-6" style={{
          background: 'linear-gradient(180deg, rgba(20, 30, 50, 0.9) 0%, rgba(15, 25, 40, 0.9) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
          
          <div className="space-y-4">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'deposit' ? (
                        <FiArrowDownLeft className="w-5 h-5 text-green-400" />
                      ) : (
                        <FiArrowUpRight className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-white capitalize">{tx.type}</div>
                      <div className="text-sm text-gray-400">{tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.currency}
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                      tx.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FiClock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No transactions yet</p>
              </div>
            )}
          </div>

          {recentTransactions.length > 0 && (
            <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors">
              View All Transactions
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
