import { useState } from 'react'
import { FiPlus, FiSend, FiTrash2, FiBell, FiMail, FiSmartphone, FiUsers } from 'react-icons/fi'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'promo'
  channel: 'push' | 'email' | 'sms' | 'all'
  target: 'all' | 'vip' | 'active' | 'inactive' | 'specific'
  sentAt: string | null
  status: 'draft' | 'scheduled' | 'sent'
  recipients: number
}

const sampleNotifications: Notification[] = [
  { id: '1', title: 'Weekend Bonus!', message: 'Get 50% extra on your deposits this weekend!', type: 'promo', channel: 'all', target: 'all', sentAt: '2024-01-15 10:00', status: 'sent', recipients: 1250 },
  { id: '2', title: 'VIP Exclusive', message: 'Special cashback offer just for you!', type: 'success', channel: 'email', target: 'vip', sentAt: '2024-01-14 15:30', status: 'sent', recipients: 45 },
  { id: '3', title: 'Maintenance Notice', message: 'Scheduled maintenance on Sunday 3AM-5AM', type: 'warning', channel: 'push', target: 'all', sentAt: null, status: 'scheduled', recipients: 0 },
  { id: '4', title: 'New Games Added!', message: 'Check out our latest slot games!', type: 'info', channel: 'push', target: 'active', sentAt: null, status: 'draft', recipients: 0 },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as Notification['type'],
    channel: 'push' as Notification['channel'],
    target: 'all' as Notification['target']
  })

  const handleSubmit = (e: React.FormEvent, sendNow: boolean) => {
    e.preventDefault()
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...formData,
      sentAt: sendNow ? new Date().toISOString() : null,
      status: sendNow ? 'sent' : 'draft',
      recipients: sendNow ? Math.floor(Math.random() * 1000) + 100 : 0
    }
    setNotifications([newNotification, ...notifications])
    setShowModal(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      channel: 'push',
      target: 'all'
    })
  }

  const deleteNotification = (id: string) => {
    if (confirm('Are you sure?')) {
      setNotifications(notifications.filter(n => n.id !== id))
    }
  }

  const sendNotification = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'sent' as const, sentAt: new Date().toISOString(), recipients: Math.floor(Math.random() * 1000) + 100 } : n
    ))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500/20 text-blue-400'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400'
      case 'success': return 'bg-green-500/20 text-green-400'
      case 'promo': return 'bg-purple-500/20 text-purple-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'push': return <FiBell className="w-4 h-4" />
      case 'email': return <FiMail className="w-4 h-4" />
      case 'sms': return <FiSmartphone className="w-4 h-4" />
      case 'all': return <FiUsers className="w-4 h-4" />
      default: return <FiBell className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
        >
          <FiPlus /> Create Notification
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold">{notifications.filter(n => n.status === 'sent').length}</div>
          <div className="text-sm text-gray-400">Sent</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold">{notifications.filter(n => n.status === 'scheduled').length}</div>
          <div className="text-sm text-gray-400">Scheduled</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold">{notifications.filter(n => n.status === 'draft').length}</div>
          <div className="text-sm text-gray-400">Drafts</div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="text-2xl font-bold">{notifications.reduce((sum, n) => sum + n.recipients, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Recipients</div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-[#1a1d2e] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 font-medium text-gray-400">Notification</th>
              <th className="text-left p-4 font-medium text-gray-400">Type</th>
              <th className="text-left p-4 font-medium text-gray-400">Channel</th>
              <th className="text-left p-4 font-medium text-gray-400">Target</th>
              <th className="text-left p-4 font-medium text-gray-400">Status</th>
              <th className="text-left p-4 font-medium text-gray-400">Recipients</th>
              <th className="text-right p-4 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map(notification => (
              <tr key={notification.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-gray-400 truncate max-w-xs">{notification.message}</div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getTypeColor(notification.type)}`}>
                    {notification.type}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-gray-300">
                    {getChannelIcon(notification.channel)}
                    <span className="capitalize">{notification.channel}</span>
                  </div>
                </td>
                <td className="p-4 capitalize text-gray-300">{notification.target}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    notification.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                    notification.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {notification.status}
                  </span>
                </td>
                <td className="p-4 text-gray-300">{notification.recipients.toLocaleString()}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {notification.status !== 'sent' && (
                      <button
                        onClick={() => sendNotification(notification.id)}
                        className="p-2 hover:bg-cyan-500/20 rounded-lg text-gray-400 hover:text-cyan-400"
                        title="Send Now"
                      >
                        <FiSend className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1d2e] rounded-2xl w-full max-w-lg">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">Create Notification</h2>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Notification['type'] })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="promo">Promo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Channel</label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value as Notification['channel'] })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="push">Push</option>
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="all">All Channels</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Target</label>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value as Notification['target'] })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="all">All Users</option>
                    <option value="vip">VIP Only</option>
                    <option value="active">Active Users</option>
                    <option value="inactive">Inactive Users</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, false)}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
