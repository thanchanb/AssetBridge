import React from 'react';
import { WalletProvider } from './context/WalletContext';
import StarfieldCanvas from './components/StarfieldCanvas';
import WalletNotification from './components/WalletNotification';
import Header from './components/Header';
import Hero from './components/Hero';
import Bridge from './components/Bridge';
import SequenceSection from './components/SequenceSection';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

function App() {
  return (
    <WalletProvider>
      <StarfieldCanvas />
      <WalletNotification />
      
      <div className="wrap">
        <Header />
        
        <main>
          <Hero />
          <Bridge />
          <SequenceSection />
          <Feedback />
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default App;
