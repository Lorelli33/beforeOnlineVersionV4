import React, { useState, useEffect } from 'react';
import { Coins, Shield, Users, ArrowRight, ChevronDown, Check, ExternalLink } from 'lucide-react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';

export default function ICO() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set ICO date to March 22, 2025
  const icoDate = new Date('2025-03-22T00:00:00Z');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = icoDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinWhitelist = () => {
    window.location.href = 'mailto:info@privatecharterx.com?subject=PVCX Token Whitelist Request';
  };

  const handleBuyOnUniswap = () => {
    window.open('https://app.uniswap.org', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center gap-8">
              <Logo />
              <NavigationMenu />
            </div>
            <div className="flex items-center gap-4">
              <WalletMenu onShowDashboard={() => {}} />
              <UserMenu onLogout={() => {}} />
              <ThemeToggle isDark={isDarkTheme} onToggle={() => setIsDarkTheme(!isDarkTheme)} />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-[88px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-900 font-medium mb-6">
              <Coins size={18} />
              <span>PVCX Token Presale</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Future of Private Aviation</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              PVCX is the world's first tokenized private aviation loyalty program, revolutionizing how frequent flyers earn and redeem rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleJoinWhitelist}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                <span>Join Whitelist</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={handleBuyOnUniswap}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                <span>Buy on Uniswap</span>
                <ExternalLink size={18} />
              </button>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl p-8 md:p-12 mb-16 text-gray-900 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Presale Starts In</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white shadow-sm rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.days}</div>
                <div className="text-gray-500">Days</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.hours}</div>
                <div className="text-gray-500">Hours</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.minutes}</div>
                <div className="text-gray-500">Minutes</div>
              </div>
              <div className="bg-white shadow-sm rounded-xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{timeLeft.seconds}</div>
                <div className="text-gray-500">Seconds</div>
              </div>
            </div>
          </div>

          {/* Token Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Token Details</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Name</span>
                    <span className="font-medium">PrivateCharterX Token</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Symbol</span>
                    <span className="font-medium">PVCX</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Supply</span>
                    <span className="font-medium">100,000,000 PVCX</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking Fee to Token</span>
                    <span className="font-medium">5% of each booking</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network</span>
                    <span className="font-medium">Ethereum</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Token Distribution</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Presale</div>
                      <div className="text-sm text-gray-600">Early supporters and strategic partners</div>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Reward Pool</div>
                      <div className="text-sm text-gray-600">Flight rewards and loyalty program</div>
                    </div>
                    <span className="font-medium">25%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Team & Advisors</div>
                      <div className="text-sm text-gray-600">12-month vesting period</div>
                    </div>
                    <span className="font-medium">15%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Marketing & Partnerships</div>
                      <div className="text-sm text-gray-600">Growth and expansion</div>
                    </div>
                    <span className="font-medium">15%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Liquidity Pool</div>
                      <div className="text-sm text-gray-600">Exchange listings and trading</div>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Reserve</div>
                      <div className="text-sm text-gray-600">Future development and contingency</div>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Utility */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Token Utility & Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Flight Rewards</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">5% of each booking goes to token liquidity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Use tokens to book flights and services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Earn bonus tokens for frequent bookings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Access to exclusive empty leg deals</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Premium Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Priority booking and flight changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Access to VIP lounges worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Complimentary upgrades when available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Exclusive event invitations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Whitelist CTA */}
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-900 p-10 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Join the PVCX Token Whitelist</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Be among the first to access our revolutionary token when it launches. Early supporters receive exclusive benefits and bonus tokens.
            </p>
            <div className="max-w-md mx-auto">
              <button 
                onClick={handleJoinWhitelist}
                className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Contact Us to Join Whitelist</span>
                <ArrowRight size={18} />
              </button>
              <p className="text-sm mt-4 text-gray-600">
                Email us at info@privatecharterx.com to join the whitelist and receive updates about the PVCX token launch.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}