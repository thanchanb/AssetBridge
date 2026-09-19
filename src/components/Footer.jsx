import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="fmark">
        <span className="brand-mark" style={{ width: '18px', height: '18px' }}></span> 
        AssetBridge
      </div>
      <div>
        Built on Midnight · Preprod testnet · <a href="https://x.com/thanchanb" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'underline', marginRight: '12px' }}>Product X (@thanchanb)</a> · <a href="https://github.com/thanchanb/AssetBridge#readme" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Docs & Code</a>
      </div>
    </footer>
  );
};

export default Footer;
