import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import rust from 'react-syntax-highlighter/dist/esm/languages/hljs/rust';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import './App.css';

import GithubButton from './components/buttons/GithubButton';

SyntaxHighlighter.registerLanguage('rust', rust);


const encryptionSteps = [
  'FHE( 1 ) -> cipher( 1 )',
  'cipher( 1 ) + cipher( 2 ) -> cipher( 3 )',
  'FHE^-1( cipher3 ) -> 3',
];

const AnimationSubContainer = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % encryptionSteps.length);
    }, 4000); // Change step every 1 second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="animation-box">
      <p className="animation-text">{encryptionSteps[stepIndex]}</p>
    </div>
  );
};

const App = () => {
  const [header, setHeader] = useState('');
  const [subheader, setSubheader] = useState('');

  useEffect(() => {
    const headerHashes = [
      '7xG9aY12MPL3',
      'WqP3bL8ZRtQ4',
      '12NzTY5KoLx7',
      '3XaLpQ9YjKt8',
      'Cloaq Network',
    ];

    const subheaderHashes = [
      '2Np45A19$B@f8&uT6 @H5%q2e9&Mb3#0P@l4@',
      'GjX1R3w8X$F7^q9K&6M z5P$@J7#LqM1nT3@0',
      '8ZcP0Q$M9e4R&t5X7kP qL@3%M2Kn@0Fb6T4R',
      '6TBaLk3&X$9P7F^T6MqJ# L2@P5M@0k9nF4T%',
      'Integrating Fully Homomorphic Encryption (FHE) with Polkadot-SDK',
    ];

    const decrypt = (hashes, setter, delay) => {
      let i = 0;
      const interval = setInterval(() => {
        setter(hashes[i]);
        i++;
        if (i >= hashes.length) clearInterval(interval);
      }, delay);
    };

    decrypt(headerHashes, setHeader, 400);
    decrypt(subheaderHashes, setSubheader, 400);
  }, []);

  const codeSnippet = `
#[frame_support::pallet]
pub mod pallet {
    // Import various useful types required by all FRAME pallets.
    use super::*;
    use fhe::bfv::{BfvParametersBuilder, Ciphertext, Encoding, Plaintext, PublicKey, SecretKey};
    use fhe_traits::*;
    use frame_support::{
        dispatch::DispatchResult,
        pallet_prelude::*,
        storage::bounded_vec::BoundedVec,
        traits::{Get, Randomness},
    };
    use frame_system::pallet_prelude::*;
    use rand::{rngs::SmallRng, SeedableRng};
    use sp_std::prelude::*;
}
`;

  return (
    <div className="website-bg">
      <div className="hero-container">
        <div className='scroll-down' onClick={() => document.getElementById('body').scrollIntoView({ behavior: 'smooth' })}>
          Scroll down
        </div>
        <div className="header-container">
          <h1 className="header-text">{header}</h1>
          <p className="subheader-text">{subheader}</p>
          <div className="button-container">
            <GithubButton buttonText={'Github'} onClick={() => window.open('https://github.com/cloaq')} />
            <a href="https://github.com/cloaq/cloak-chain/blob/master/pallets/fhe-vote/src/lib.rs" target="_blank" rel="noreferrer">
              Example
            </a>
          </div>
        </div>
        <div className="code-container">
          <SyntaxHighlighter language="rust" style={atomOneDark} showLineNumbers>
            {codeSnippet}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="body-container" id='body'>
        <div className="body-content">
          <div className="body-content-container-1">
            <div className="animation-sub-container">
              <AnimationSubContainer />
            </div>
            <div className="text-sub-container">
              <h1 className="body-header">
                Introduction to FHE <br />
                <span className="body-header-span">Fully Homomorphic Encryption</span>
              </h1>
              <p className="body-text">
                A pharmaceutical company wants to analyze patient data from multiple hospitals to study the effectiveness of a new drug. Each hospital encrypts their patient data with FHE and uploads it to a data marketplace. The pharmaceutical company runs its analysis on the encrypted data across all hospitals. The results, such as drug efficacy metrics, are then decrypted by each hospital and shared with the pharmaceutical company, ensuring that patient privacy is preserved throughout the process.
              </p>
            </div>
          </div>
          <div className="body-content-container-2">
            <div className="text-sub-container-2">
              <h1 className="body-header">
                Why Cloaq?<br />
                <span className="body-header-span">Polkadot-sdk Integrated FHE</span>
              </h1>
              <p className="body-text">
                Cloaq is a Rust library that integrates Fully Homomorphic Encryption (FHE) with the Polkadot-SDK. This allows developers to build privacy-preserving applications on the Polkadot network that can perform computations on encrypted data. Cloaq provides a set of APIs for encrypting and decrypting data, as well as performing arithmetic operations on encrypted data using FHE.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <div className="footer-content">
          <h1 className="footer-header">Cloaq Network</h1>
          <p className="footer-text">
            Cloaq is an open-source project that aims to bring privacy-preserving computation to the Polkadot Ecosystem.
          </p>
        </div>
        <div className="footer-content">
          <h1 className="footer-link-header">Contributors</h1>
          <div className="footer-link-container">
            <GithubButton buttonText={'h4n0'} onClick={() => window.open('https://github.com/h4n0')} />
            <GithubButton buttonText={'JyTey2004'} onClick={() => window.open('https://github.com/JyTey2004')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
