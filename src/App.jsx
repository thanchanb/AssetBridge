import React from 'react';
import { WalletProvider } from './context/WalletContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Bridge from './components/Bridge';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

function App() {
  return (
    <WalletProvider>
      <div className="app-container">
        <div className="bg-glow"></div>
        
        <Header />
        
        <main>
          <Hero />
          <Bridge />
          <Feedback />
        </main>
        
        <Footer />
      </div>
    </WalletProvider>
  );
}

export default App;
