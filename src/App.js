import cloakLogo from './assets/cloak-logo.png';
import './App.css';

import GithubButton from './components/buttons/GithubButton';
import MainButton from './components/buttons/MainButton';
import NumberInput from './components/inputs/NumberInput';

function App() {
  return (
    <div className="website-bg">
      <div className="header">
        <div className="logo">
          <img src={cloakLogo} alt="cloak-logo" className="cloak-logo" />
        </div>
        <h1 className="header-text">
          Polkadot's first
        </h1>
        <h1 className="header-text" style={{ color: 'lightcoral' }}>
          Fully Homomorphic Encryption (FHE)
        </h1>
      </div>
      <div className="body">
        <h2 className="body-text">
          What is FHE?
        </h2>
        <p className="body-text">
          Fully Homomorphic Encryption (FHE) is a form of encryption that allows computation on ciphertexts, generating an encrypted result which, when decrypted, matches the result of the operations as if they had been performed on the plaintext.
        </p>
        <h2 className="body-text">
          Here's an example:
        </h2>
        <p className="body-text">
          Imagine you have a dataset of numbers that you want to encrypt and then perform some computation on. With FHE, you can encrypt the dataset, perform the computation on the encrypted data, and then decrypt the result to get the same answer as if you had performed the computation on the unencrypted data.
        </p>
        <h2 className="body-text">
          Let's get started!
        </h2>
        <GithubButton onClick={() => window.open('https://github.com/Cloak-Network')} buttonText="See our pallet" />
      </div>
      <div className="demo-body">
        <h2 className="body-text">
          FHE Arithmatic Demo
        </h2>
        <p className="body-text">
          What you will see below is a simple demonstration of how FHE can be used to perform arithmetic operations on encrypted data. This demo is fully interacting with the Solo Chain of the Cloak Network.
        </p>
        <div className="demo-input-container">
          <div className="demo-input-subcontainer">
            <NumberInput placeholder={'Enter first number'} />
            <NumberInput placeholder={'Enter second number'} />
          </div>
          <div className="demo-input-subcontainer">
            <h3 className="body-text">
              What is happening here?
            </h3>
            <p className="body-text">
              In the input fields above, you can enter two numbers. These numbers will be encrypted into ciphertexts then you are able to perform arithmetic operations on them. The result will be decrypted and displayed below. Click the button below to encrypt and perform the operation.
            </p>
            <MainButton onClick={() => console.log('clicked')} buttonText="Encrypt" />
          </div>
        </div>
        <div className="demo-output-subcontainer">
          <h3 className="body-text">
            Result of Encryption
          </h3>
          <p className="body-text">
            The result of the encryption is displayed here. This is the ciphertext that is generated when you click the "Encrypt" button. Now, click the button below to perform the operation on the encrypted data.
          </p>
          <NumberInput placeholder={'Result'} />
        </div>
        <div className="demo-output-subcontainer-row">
          <MainButton onClick={() => console.log('clicked')} buttonText="Add & Decrypt" />
          <MainButton onClick={() => console.log('clicked')} buttonText="Subtract & Decrypt" />
          <MainButton onClick={() => console.log('clicked')} buttonText="Multiply & Decrypt" />
        </div>
        <div className="demo-output-subcontainer">
          <h3 className="body-text">
            Result of Operation on Encrypted Data (Decrypted)
          </h3>
          <p className="body-text">
            The result of the operation on the encrypted data is displayed here. This is the plaintext that is generated when you click the "Add & Decrypt", "Subtract & Decrypt", or "Multiply & Decrypt" button.
          </p>
          <NumberInput placeholder={'Result'} />
        </div>
      </div>
    </div>
  );
}

export default App;
