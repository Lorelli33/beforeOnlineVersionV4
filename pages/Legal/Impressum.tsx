import React from 'react';
import Logo from '../../components/Logo';
import Footer from '../../components/Footer';
import LanguageSelector from '../../components/LanguageSelector';
import ThemeToggle from '../../components/ThemeToggle';
import UserMenu from '../../components/UserMenu';
import WalletMenu from '../../components/WalletMenu';
import NavigationMenu from '../../components/NavigationMenu';

export default function Impressum() {
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
            <h1 className="text-3xl font-bold mb-8">Impressum</h1>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Information according to § 5 TMG</h2>
              
              <div className="space-y-2">
                <h3 className="font-medium">PrivatecharterX Headquarters:</h3>
                <p>1000 Brickell Ave., Suite 715<br />Miami, FL 33131<br />United States</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Swiss Branch:</h3>
                <p>Bahnhofstrasse 10<br />8001 Zurich<br />Switzerland</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Contact:</h3>
                <p>Email: info@privatecharterx.com<br />Phone: +44 797 88 53 (EUROPE)</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Represented by:</h3>
                <p>Lorenzo Vanza, Managing Director</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Register Entry:</h3>
                <p>10 Sept. 2023<br />Register court: Miami-Dade County<br />Registration number: 15340661</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Responsible for content according to § 55 Abs. 2 RStV:</h3>
                <p>PrivatecharterX LTD<br />Bahnhofstrasse 37/10<br />8001 Zurich, Switzerland</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Disclaimer</h2>
              
              <div className="space-y-4">
                <h3 className="font-medium">Liability for Contents</h3>
                <p className="text-gray-600">The contents of our pages were created with great care. However, we cannot guarantee the correctness, completeness, and up-to-dateness of the contents. As a service provider, we are responsible for our own content on these pages under general law. According to the Communications Decency Act (CDA) Section 230, we are not obligated to monitor transmitted or stored third-party information or to search for circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this regard is only possible from the point in time at which knowledge of a specific infringement is obtained. Upon becoming aware of such violations, we will remove this content immediately.</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Liability for Links</h3>
                <p className="text-gray-600">Our offer contains links to external websites of third parties, over whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the contents of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking. A permanent control of the content of the linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of legal violations, we will remove such links immediately.</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}