import { useState } from 'react'
import { FiSearch, FiPlus, FiEdit, FiTrash, FiMoreVertical } from 'react-icons/fi'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import DataTable from '../../components/ui/DataTable'

const mockUsers = [
  { id: '1', email: 'john@example.com', full_name: 'John Doe', role: 'player', is_active: true, balance: '$1,234.56', created_at: '2024-01-15' },
  { id: '2', email: 'sarah@example.com', full_name: 'Sarah Smith', role: 'player', is_active: true, balance: '$5,678.90', created_at: '2024-02-20' },
  { id: '3', email: 'admin@example.com', full_name: 'Admin User', role: 'admin', is_active: true, balance: '$0.00', created_at: '2024-01-01' },
  { id: '4', email: 'mike@example.com', full_name: 'Mike Johnson', role: 'player', is_active: false, balance: '$234.56', created_at: '2024-03-10' },
  { id: '5', email: 'staff@example.com', full_name: 'Staff Member', role: 'staff', is_active: true, balance: '$0.00', created_at: '2024-01-05' },
]

export default function Users() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null)

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(search.toLowerCase()) ||
                         user.full_name.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const columns = [
    { 
      key: 'full_name', 
      header: 'User',
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            {user.full_name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.full_name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      )
    },
    { 
      key: 'role', 
      header: 'Role',
      render: (user: typeof mockUsers[0]) => (
        <span className={`badge ${
          user.role === 'admin' ? 'badge-error' :
          user.role === 'staff' ? 'badge-warning' :
          'badge-primary'
        }`}>
          {user.role}
        </span>
      )
    },
    { key: 'balance', header: 'Balance' },
    { 
      key: 'is_active', 
      header: 'Status',
      render: (user: typeof mockUsers[0]) => (
        <span className={`badge ${user.is_active ? 'badge-success' : 'bg-gray-500/20 text-gray-400'}`}>
          {user.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { key: 'created_at', header: 'Joined' },
    {
      key: 'actions',
      header: '',
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedUser(user)}
            className="p-2 hover:bg-white/5 rounded-lg"
          >
            <FiEdit className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-error">
            <FiTrash className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <FiPlus className="mr-2" /> Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<FiSearch />}
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="input-field w-40"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="player">Player</option>
        </select>
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        onRowClick={(user) => setSelectedUser(user)}
      />

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="Enter full name" required />
            <Input label="Email" type="email" placeholder="Enter email" required />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Password" type="password" placeholder="Enter password" required />
            <div>
              <label className="label">Role</label>
              <select className="input-field">
                <option value="player">Player</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Edit User"
        size="lg"
      >
        {selectedUser && (
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input 
                label="Full Name" 
                defaultValue={selectedUser.full_name} 
                required 
              />
              <Input 
                label="Email" 
                type="email" 
                defaultValue={selectedUser.email} 
                required 
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Role</label>
                <select className="input-field" defaultValue={selectedUser.role}>
                  <option value="player">Player</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select className="input-field" defaultValue={selectedUser.is_active ? 'active' : 'inactive'}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  )
}
