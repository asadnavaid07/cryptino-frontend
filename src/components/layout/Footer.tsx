import { Link } from 'react-router-dom'
import { FiMail, FiMessageCircle } from 'react-icons/fi'
import { FaTelegram, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa'

const footerLinks = {
  slotGames: [
    { label: 'Slots', path: '/casino/slots' },
    { label: 'Skill Games', path: '/casino/skill-games' },
    { label: 'Jackpot', path: '/casino/jackpot' },
    { label: 'Bonus Buy', path: '/casino/bonus-buy' },
    { label: 'Crash Games', path: '/casino/crash' },
  ],
  liveCasino: [
    { label: 'Roulette', path: '/live-casino/roulette' },
    { label: 'Blackjack', path: '/live-casino/blackjack' },
    { label: 'Live Casino', path: '/live-casino' },
    { label: 'Table Games', path: '/live-casino/table-games' },
    { label: 'Video Poker', path: '/live-casino/video-poker' },
  ],
  casino: [
    { label: 'About Us', path: '/about' },
    { label: 'Promotions', path: '/promotions' },
    { label: 'Tournaments', path: '/tournaments' },
    { label: 'Affiliate Program', path: '/affiliate' },
    { label: 'Loyalty Program', path: '/loyalty' },
    { label: 'Refer a friend', path: '/refer' },
    { label: 'Blog', path: '/blog' },
    { label: 'Bonus Shop', path: '/bonus-shop' },
    { label: 'Agent Verification', path: '/agent-verification' },
    { label: 'Jungle Jackpot', path: '/jungle-jackpot' },
  ],
  legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Bonus Terms', path: '/bonus-terms' },
    { label: 'Responsible Gambling', path: '/responsible-gambling' },
  ],
  support: [
    { label: 'Live Support', path: '/support' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-dark-100 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Logo and Social */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-dark font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-display font-bold">
                CRYP<span className="text-primary">TINO</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 mb-4">© 2025 Cryptino. All rights reserved.</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTelegram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaDiscord className="w-5 h-5" />
              </a>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
              <span>AM</span>
              <div className="w-12 h-6 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
              <span>PM</span>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div>
            <h4 className="font-semibold text-white mb-4">SLOT GAMES</h4>
            <ul className="space-y-2">
              {footerLinks.slotGames.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">LIVE CASINO</h4>
            <ul className="space-y-2">
              {footerLinks.liveCasino.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">CASINO</h4>
            <ul className="space-y-2">
              {footerLinks.casino.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">LEGAL</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Licenses and Badges */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-gray-500 mb-6 max-w-4xl">
            Cryptino is owned and operated by Natural Nine B.V., Curaçao company registration number 160998, with its
            registered address at Korporaalweg 10, Willemstad, Curaçao and is licensed by the Curaçao Gaming Control Board to
            offer games of chance under license number OGL/2024/1337/0628. Cryptino's payment agent company is River Card
            Limited, Cyprus company registration number HE 431566, with its registered address at 50 Spyrou Kyprianou
            Avenue, Irida Tower 3, Floor 6, 6057 Larnaca, Cyprus. Contact us at support@cryptino.com.
          </p>
          
          {/* License Badges */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-2xl font-bold border-2 border-gray-400 rounded-full w-10 h-10 flex items-center justify-center">18+</span>
            </div>
            <div className="text-gray-400 text-xs">
              <div className="font-semibold">RESPONSIBLE</div>
              <div>GAMBLING</div>
            </div>
            <div className="text-gray-400 text-xs">
              <div className="font-semibold">GAMBLERS</div>
              <div>ANONYMOUS</div>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded text-xs font-bold">
              GCB
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
