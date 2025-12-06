import { useState } from 'react'
import { FiSearch, FiPlus, FiDollarSign } from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import DataTable from '../../components/ui/DataTable'

const mockTransactions = [
  { id: '1', user: 'john@example.com', type: 'deposit', amount: 500, status: 'completed', remark: 'Crypto deposit', created_at: '2024-12-01 14:30' },
  { id: '2', user: 'sarah@example.com', type: 'withdraw', amount: -1200, status: 'pending', remark: 'Bank transfer', created_at: '2024-12-01 13:45' },
  { id: '3', user: 'mike@example.com', type: 'bet', amount: -50, status: 'completed', remark: 'Aviator', created_at: '2024-12-01 12:20' },
  { id: '4', user: 'mike@example.com', type: 'win', amount: 125, status: 'completed', remark: 'Aviator 2.5x', created_at: '2024-12-01 12:21' },
  { id: '5', user: 'lisa@example.com', type: 'bonus', amount: 100, status: 'completed', remark: 'Welcome bonus', created_at: '2024-12-01 11:00' },
  { id: '6', user: 'david@example.com', type: 'adjustment', amount: 50, status: 'completed', remark: 'Admin adjustment', created_at: '2024-12-01 10:30' },
]

const typeColors: Record<string, string> = {
  deposit: 'badge-success',
  withdraw: 'badge-warning',
  bet: 'badge-primary',
  win: 'badge-success',
  bonus: 'bg-purple-500/20 text-purple-400',
  adjustment: 'bg-blue-500/20 text-blue-400',
}

export default function Wallets() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [showAdjustModal, setShowAdjustModal] = useState(false)
  const [adjustmentData, setAdjustmentData] = useState({
    userId: '',
    amount: '',
    type: 'credit',
    remark: '',
  })

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.user.toLowerCase().includes(search.toLowerCase()) ||
                         tx.remark.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || tx.type === typeFilter
    return matchesSearch && matchesType
  })

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'user', header: 'User' },
    { 
      key: 'type', 
      header: 'Type',
      render: (tx: typeof mockTransactions[0]) => (
        <span className={`badge ${typeColors[tx.type] || 'badge-primary'}`}>
          {tx.type}
        </span>
      )
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (tx: typeof mockTransactions[0]) => (
        <span className={tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}>
          {tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (tx: typeof mockTransactions[0]) => (
        <span className={`badge ${tx.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
          {tx.status}
        </span>
      )
    },
    { key: 'remark', header: 'Remark' },
    { key: 'created_at', header: 'Date' },
  ]

  const handleAdjustment = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Adjustment:', adjustmentData)
    setShowAdjustModal(false)
    setAdjustmentData({ userId: '', amount: '', type: 'credit', remark: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wallet Management</h1>
        <Button onClick={() => setShowAdjustModal(true)}>
          <FiDollarSign className="mr-2" /> Manual Adjustment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Deposits (Today)</p>
          <p className="text-2xl font-bold text-green-400">$12,456.00</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Total Withdrawals (Today)</p>
          <p className="text-2xl font-bold text-red-400">$8,234.00</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Pending Withdrawals</p>
          <p className="text-2xl font-bold text-yellow-400">$3,456.00</p>
        </div>
        <div className="card p-4">
          <p className="text-gray-400 text-sm">Net Revenue (Today)</p>
          <p className="text-2xl font-bold text-primary">$4,222.00</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FiSearch />}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="input-field w-40"
        >
          <option value="all">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="bet">Bet</option>
          <option value="win">Win</option>
          <option value="bonus">Bonus</option>
          <option value="adjustment">Adjustment</option>
        </select>
        <Input type="date" className="w-40" />
        <Input type="date" className="w-40" />
      </div>

      {/* Transactions Table */}
      <DataTable columns={columns} data={filteredTransactions} />

      {/* Manual Adjustment Modal */}
      <Modal
        isOpen={showAdjustModal}
        onClose={() => setShowAdjustModal(false)}
        title="Manual Wallet Adjustment"
      >
        <form onSubmit={handleAdjustment} className="space-y-4">
          <Input
            label="User Email or ID"
            placeholder="Enter user email or ID"
            value={adjustmentData.userId}
            onChange={(e) => setAdjustmentData({ ...adjustmentData, userId: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount"
              type="number"
              placeholder="0.00"
              value={adjustmentData.amount}
              onChange={(e) => setAdjustmentData({ ...adjustmentData, amount: e.target.value })}
              required
            />
            <div>
              <label className="label">Type</label>
              <select 
                className="input-field"
                value={adjustmentData.type}
                onChange={(e) => setAdjustmentData({ ...adjustmentData, type: e.target.value })}
              >
                <option value="credit">Credit (+)</option>
                <option value="debit">Debit (-)</option>
              </select>
            </div>
          </div>
          <Input
            label="Remark"
            placeholder="Reason for adjustment"
            value={adjustmentData.remark}
            onChange={(e) => setAdjustmentData({ ...adjustmentData, remark: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setShowAdjustModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Apply Adjustment</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
