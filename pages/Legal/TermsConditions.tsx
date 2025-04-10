import React from 'react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';

export default function TermsConditions() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

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

      {/* Main Content */}
      <main className="flex-1 pt-[88px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Terms & Conditions</h1>
              <p className="text-gray-600 mt-2">Last Updated: March 9, 2025</p>
            </div>

            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Welcome to PrivatecharterX</h2>
                <p className="text-gray-600">
                  At PrivatecharterX, we strive to make your experience as seamless and enjoyable as possible. Our goal is to provide you with the highest level of service and security, whether you're booking a private jet, yacht, or arranging airport transfers. We believe in transparency and want to ensure you feel safe and informed every step of the way.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Booking Process</h2>
                <p className="text-gray-600">
                  Your journey with us begins with a simple email or phone call. Once we receive your booking request, we'll send you a confirmation. If you haven't signed the contract yet, don't worry—we'll still consider your booking valid. However, the final confirmation from the airline can only be made after we receive your signed contract. If there are any delays in sending the signed contract, please understand that we can't be held responsible if the aircraft is no longer available.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">2. Cancellation Policy</h2>
                <p className="text-gray-600">
                  We understand that plans can change. If you need to cancel after confirming your booking, a minimum penalty of 30% will apply, as outlined in Article 7. If you need to change the aircraft after confirmation, we'll do our best to accommodate you, but please note that cancellation charges may apply if the original airline can't provide a suitable replacement.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">3. Flight Changes</h2>
                <p className="text-gray-600">
                  We aim to stick to the schedule you've approved, but sometimes things happen. We reserve the right to modify departure and arrival times or even cancel flights for safety, weather, or technical reasons. If your flight can't go ahead as planned due to force majeure (like natural disasters or civil unrest), we won't be liable for any damages or losses. However, we'll always try to find a replacement aircraft for you.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">4. Insurance</h2>
                <p className="text-gray-600">
                  Your safety is our top priority. The carrier, who is the responsible operator of the aircraft, will ensure that the aircraft is insured in accordance with the Montreal Convention or the Warsaw Convention, depending on the specific circumstances of the flight.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">5. Identification Documents</h2>
                <p className="text-gray-600">
                  For security reasons, we need scanned copies of passengers' identity documents 48 hours before the flight. This helps us comply with anti-terrorism measures and ensures a smooth boarding process.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">6. Payment Terms</h2>
                <p className="text-gray-600">
                  We offer flexible payment options, including crypto tokens. When you pay with crypto, you can expect a refund in the same form if applicable. For fiat payments, refunds will be processed as per our standard procedures. Our transaction fees are a flat 1.2% for crypto payments, ensuring a transparent and cost-effective experience.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">7. Cancellation Periods</h2>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <p className="text-gray-600">More than 60 days before departure: 30%</p>
                  <p className="text-gray-600">60 to 30 days before departure: 40%</p>
                  <p className="text-gray-600">30 days to 7 days before departure: 50%</p>
                  <p className="text-gray-600">48 hours to 0 hours before departure: 100%</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">8. Additional Services</h2>
                <p className="text-gray-600">
                  We offer a range of additional services to enhance your experience, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>Yachts: Luxury yachting experiences tailored to your needs</li>
                  <li>Airport Transfers: Seamless transportation to and from the airport</li>
                  <li>Bouquet of Flowers: A welcoming touch for your arrival</li>
                  <li>Concierge Services: Personal assistance to make your trip perfect</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">9. Web3 Integration</h2>
                <p className="text-gray-600">
                  Our website is powered by Web3 technology, ensuring the highest level of security and transparency. Your transactions are secure, and your data is protected.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p className="text-gray-600">
                  Thank you for choosing PrivatecharterX. We look forward to making your journey unforgettable. If you have any questions or need assistance, please don't hesitate to contact us at info@privatecharterx.com.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}