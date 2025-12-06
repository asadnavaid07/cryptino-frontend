import { FiEdit2 } from 'react-icons/fi'

export default function Verify() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Account Verification</h1>

      <div className="space-y-4">
        {/* Email Verification */}
        <div className="bg-[#1a1d2e] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
            <h3 className="font-medium">Email Verification</h3>
          </div>
          <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-lg text-sm font-medium">
            Completed
          </span>
        </div>

        {/* Level 1 Verification */}
        <div className="bg-[#1a1d2e] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
            <div>
              <h3 className="font-medium">Level 1 Verification: Basic Information</h3>
              <p className="text-sm text-gray-500 mt-0.5">Fill in your details for us to get to know you better.</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#252836] hover:bg-[#2a2f3f] px-4 py-2.5 rounded-lg text-sm transition-colors">
            <FiEdit2 className="w-4 h-4" />
            View of Update
          </button>
        </div>

        {/* Level 2 Verification */}
        <div className="bg-[#1a1d2e] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full" />
            <div>
              <h3 className="font-medium">Level 2 Verification: Identity Verification</h3>
              <p className="text-sm text-gray-500 mt-0.5">Upload a copy of your ID</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gray-700/50 text-gray-400 px-3 py-1.5 rounded-lg text-sm">
              Incomplete
            </span>
            <button className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity">
              Verify Now
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-primary to-blue-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
        Save changes
      </button>
    </div>
  )
}
