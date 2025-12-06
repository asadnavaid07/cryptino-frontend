import { useState } from 'react'
import { FiSave, FiGlobe, FiDollarSign, FiShield, FiMail, FiPercent, FiClock, FiToggleLeft, FiToggleRight } from 'react-icons/fi'

interface SettingSection {
  id: string
  title: string
  icon: React.ReactNode
  settings: Setting[]
}

interface Setting {
  key: string
  label: string
  description: string
  type: 'toggle' | 'text' | 'number' | 'select' | 'textarea'
  value: string | number | boolean
  options?: { label: string; value: string }[]
}

const defaultSettings: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    icon: <FiGlobe className="w-5 h-5" />,
    settings: [
      { key: 'site_name', label: 'Site Name', description: 'The name displayed across the platform', type: 'text', value: 'Cryptino' },
      { key: 'site_description', label: 'Site Description', description: 'Meta description for SEO', type: 'textarea', value: 'The ultimate crypto gaming platform' },
      { key: 'maintenance_mode', label: 'Maintenance Mode', description: 'Enable to show maintenance page', type: 'toggle', value: false },
      { key: 'registration_enabled', label: 'User Registration', description: 'Allow new user registrations', type: 'toggle', value: true },
    ]
  },
  {
    id: 'financial',
    title: 'Financial Settings',
    icon: <FiDollarSign className="w-5 h-5" />,
    settings: [
      { key: 'min_deposit', label: 'Minimum Deposit', description: 'Minimum deposit amount in USD', type: 'number', value: 10 },
      { key: 'max_deposit', label: 'Maximum Deposit', description: 'Maximum deposit amount in USD', type: 'number', value: 50000 },
      { key: 'min_withdrawal', label: 'Minimum Withdrawal', description: 'Minimum withdrawal amount', type: 'number', value: 20 },
      { key: 'withdrawal_fee', label: 'Withdrawal Fee (%)', description: 'Fee charged on withdrawals', type: 'number', value: 1.5 },
      { key: 'default_currency', label: 'Default Currency', description: 'Default display currency', type: 'select', value: 'USD', options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
        { label: 'BTC', value: 'BTC' },
        { label: 'ETH', value: 'ETH' },
      ]},
    ]
  },
  {
    id: 'bonus',
    title: 'Bonus Settings',
    icon: <FiPercent className="w-5 h-5" />,
    settings: [
      { key: 'welcome_bonus_enabled', label: 'Welcome Bonus', description: 'Enable welcome bonus for new users', type: 'toggle', value: true },
      { key: 'welcome_bonus_amount', label: 'Welcome Bonus Amount', description: 'Bonus amount for new signups', type: 'number', value: 100 },
      { key: 'referral_bonus', label: 'Referral Bonus', description: 'Bonus for successful referrals', type: 'number', value: 25 },
      { key: 'wagering_requirement', label: 'Wagering Requirement', description: 'Multiplier before withdrawal (e.g., 30x)', type: 'number', value: 30 },
    ]
  },
  {
    id: 'security',
    title: 'Security Settings',
    icon: <FiShield className="w-5 h-5" />,
    settings: [
      { key: '2fa_required', label: 'Require 2FA', description: 'Require two-factor authentication', type: 'toggle', value: false },
      { key: 'session_timeout', label: 'Session Timeout (min)', description: 'Auto-logout after inactivity', type: 'number', value: 60 },
      { key: 'max_login_attempts', label: 'Max Login Attempts', description: 'Before temporary lockout', type: 'number', value: 5 },
      { key: 'kyc_required', label: 'Require KYC', description: 'Require identity verification for withdrawals', type: 'toggle', value: true },
    ]
  },
  {
    id: 'email',
    title: 'Email Settings',
    icon: <FiMail className="w-5 h-5" />,
    settings: [
      { key: 'email_notifications', label: 'Email Notifications', description: 'Send email notifications to users', type: 'toggle', value: true },
      { key: 'smtp_host', label: 'SMTP Host', description: 'Email server host', type: 'text', value: 'smtp.example.com' },
      { key: 'smtp_port', label: 'SMTP Port', description: 'Email server port', type: 'number', value: 587 },
      { key: 'from_email', label: 'From Email', description: 'Sender email address', type: 'text', value: 'noreply@cryptino.com' },
    ]
  },
  {
    id: 'limits',
    title: 'Rate Limits',
    icon: <FiClock className="w-5 h-5" />,
    settings: [
      { key: 'api_rate_limit', label: 'API Rate Limit', description: 'Requests per minute per user', type: 'number', value: 100 },
      { key: 'max_bets_per_minute', label: 'Max Bets/Minute', description: 'Maximum bets per minute', type: 'number', value: 30 },
      { key: 'withdrawal_cooldown', label: 'Withdrawal Cooldown (hrs)', description: 'Hours between withdrawals', type: 'number', value: 24 },
    ]
  }
]

export default function Settings() {
  const [sections, setSections] = useState<SettingSection[]>(defaultSettings)
  const [activeSection, setActiveSection] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  const updateSetting = (sectionId: string, key: string, value: string | number | boolean) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          settings: section.settings.map(setting => 
            setting.key === key ? { ...setting, value } : setting
          )
        }
      }
      return section
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    setHasChanges(false)
    alert('Settings saved successfully!')
  }

  const currentSection = sections.find(s => s.id === activeSection)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <button
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            hasChanges 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90' 
              : 'bg-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0">
          <div className="bg-[#1a1d2e] rounded-xl p-4 space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400' 
                    : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <div className="flex-1">
          {currentSection && (
            <div className="bg-[#1a1d2e] rounded-xl">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {currentSection.icon}
                  <h2 className="text-xl font-bold">{currentSection.title}</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {currentSection.settings.map(setting => (
                  <div key={setting.key} className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <label className="block font-medium mb-1">{setting.label}</label>
                      <p className="text-sm text-gray-400">{setting.description}</p>
                    </div>
                    <div className="w-64 shrink-0">
                      {setting.type === 'toggle' ? (
                        <button
                          onClick={() => updateSetting(currentSection.id, setting.key, !setting.value)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            setting.value ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400'
                          }`}
                        >
                          {setting.value ? <FiToggleRight className="w-6 h-6" /> : <FiToggleLeft className="w-6 h-6" />}
                          {setting.value ? 'Enabled' : 'Disabled'}
                        </button>
                      ) : setting.type === 'select' ? (
                        <select
                          value={setting.value as string}
                          onChange={(e) => updateSetting(currentSection.id, setting.key, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                        >
                          {setting.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : setting.type === 'textarea' ? (
                        <textarea
                          value={setting.value as string}
                          onChange={(e) => updateSetting(currentSection.id, setting.key, e.target.value)}
                          rows={3}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                        />
                      ) : setting.type === 'number' ? (
                        <input
                          type="number"
                          value={setting.value as number}
                          onChange={(e) => updateSetting(currentSection.id, setting.key, parseFloat(e.target.value) || 0)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                        />
                      ) : (
                        <input
                          type="text"
                          value={setting.value as string}
                          onChange={(e) => updateSetting(currentSection.id, setting.key, e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
