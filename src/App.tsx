/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { LiveApiDemoSection } from './components/LiveApiDemoSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { ClientPortalSection } from './components/ClientPortalSection.tsx';
import { IndiaFloodMap } from './components/IndiaFloodMap.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [emailInput, setEmailInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [demoLocation, setDemoLocation] = useState('andheri');
  const [demoWaterDepth, setDemoWaterDepth] = useState(220);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#E6DFD3] text-[#0F172A]">
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        emailInput={emailInput}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'india-map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <IndiaFloodMap />
          </div>
        )}

        {activeTab === 'api-demo' && (
          <LiveApiDemoSection
            demoLocation={demoLocation}
            setDemoLocation={setDemoLocation}
            demoWaterDepth={demoWaterDepth}
            setDemoWaterDepth={setDemoWaterDepth}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'usage-portal' && (
          <ClientPortalSection
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            authError={authError}
            setAuthError={setAuthError}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
