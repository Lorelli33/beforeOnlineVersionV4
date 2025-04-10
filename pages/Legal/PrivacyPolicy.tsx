import React from 'react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';

export default function PrivacyPolicy() {
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
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-gray-600 mt-2">Last Updated: March 9, 2025</p>
            </div>

            <section className="space-y-6">
              <p className="text-gray-600">
                PrivatecharterX is committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy outlines how we collect, use, disclose, and safeguard your data in compliance with applicable laws, 
                including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other relevant regulations.
              </p>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-gray-600">We may collect personal information from you, including but not limited to:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Name</li>
                    <li>Contact information (email, phone number, address)</li>
                    <li>Payment information (if applicable)</li>
                    <li>IP address</li>
                    <li>Browser and device information</li>
                    <li>Information you provide through forms, surveys, or other interactions on our website</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
                <div className="space-y-4">
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-gray-600">We use your personal information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>To provide and manage our services</li>
                    <li>To respond to your inquiries and requests</li>
                    <li>To process payments and manage transactions</li>
                    <li>To improve our website and services</li>
                    <li>To send you updates, newsletters, and promotional materials (with your consent)</li>
                    <li>To comply with legal and regulatory requirements</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">3. Data Protection Measures</h2>
                <div className="space-y-4">
                  <h3 className="font-medium">GDPR Compliance</h3>
                  <p className="text-gray-600">
                    We adhere to the principles of the GDPR, ensuring that your personal data is processed lawfully, fairly, and transparently. 
                    We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, 
                    alteration, or destruction.
                  </p>

                  <h3 className="font-medium">CCPA Compliance</h3>
                  <p className="text-gray-600">
                    For users in California, we comply with the CCPA, providing you with the right to know, delete, and opt-out of the sale 
                    of your personal information. You can exercise these rights by contacting us at the details provided below.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">4. Data Retention</h2>
                <p className="text-gray-600">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                  unless a longer retention period is required or permitted by law.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">5. Your Rights</h2>
                <div className="space-y-4">
                  <h3 className="font-medium">Under GDPR, you have the right to:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Access your personal data</li>
                    <li>Request rectification or erasure of your personal data</li>
                    <li>Object to the processing of your personal data</li>
                    <li>Request the restriction of processing</li>
                    <li>Data portability</li>
                    <li>Lodge a complaint with a supervisory authority</li>
                  </ul>

                  <h3 className="font-medium">Under CCPA, you have the right to:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>Know what personal information we collect about you</li>
                    <li>Request deletion of your personal information</li>
                    <li>Opt-out of the sale of your personal information</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">6. Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, 
                  please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <p className="text-gray-600">Email: <a href="mailto:privacy@privatecharterx.com" className="text-black hover:underline">privacy@privatecharterx.com</a></p>
                  <p className="text-gray-600">Phone: +1 (305) 123-4567</p>
                  <p className="text-gray-600">Address: 1000 Brickell Ave., Suite 715<br />Miami, FL 33131<br />United States</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">7. Changes to This Privacy Policy</h2>
                <p className="text-gray-600">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, 
                  legal, or regulatory reasons. Any changes will be posted on this page, and the effective date will be updated accordingly. 
                  We recommend that you review this Privacy Policy periodically for any updates.
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