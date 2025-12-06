export interface User {
  id: string
  email: string
  full_name: string | null
  role: 'admin' | 'staff' | 'player'
  is_active: boolean
  avatar_url: string | null
  created_at: string
}

export interface Wallet {
  user_id: string
  balance: number
  currency: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  type: 'deposit' | 'withdraw' | 'bet' | 'win' | 'bonus' | 'adjustment'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  remark: string | null
  created_at: string
}

export interface Game {
  id: string
  provider: string
  game_id: string
  name: string
  thumbnail?: string
  category: string
  metadata?: Record<string, unknown>
}

export interface Bet {
  id: string
  user_id: string
  game_id: string
  game_name?: string
  stake: number
  outcome: 'pending' | 'win' | 'loss'
  win_amount: number
  multiplier?: number
  created_at: string
}

export interface Bonus {
  id: string
  name: string
  type: 'welcome' | 'deposit' | 'weekly' | 'monthly' | 'referral' | 'vip'
  amount: number
  percentage?: number
  min_deposit?: number
  max_bonus?: number
  wagering_requirement: number
  is_active: boolean
  expires_at?: string
}

export interface Referral {
  id: string
  referrer_id: string
  referred_id: string
  bonus_earned: number
  status: 'pending' | 'completed'
  created_at: string
}

export interface Ticket {
  id: string
  user_id: string
  subject: string
  message: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  game_id: string
  game_name: string
  game_thumbnail?: string
  provider: string
  target_multiplier: number
  min_bet: number
  reward: number
  creator: string
  status: 'live' | 'finished' | 'completed'
  ends_at?: string
}

export interface VIPLevel {
  level: number
  name: string
  min_wager: number
  free_spins: number
  weekly_cashback: number
  daily_rakeback: number
  monthly_bonus?: number
  tier_up_bonus?: number
}

export interface LeaderboardEntry {
  rank: number
  player: string
  game: string
  bet_amount: number
  multiplier: number
  payout: number
  currency: string
}
