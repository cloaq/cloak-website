import cloakLogo from './assets/cloak-logo.png';
import './App.css';

import React, { useEffect, useState } from 'react';
import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

import GithubButton from './components/buttons/GithubButton';
import MainButton from './components/buttons/MainButton';
import NumberInput from './components/inputs/NumberInput';

function App() {
  const [api, setApi] = useState(null);
  const [chain, setChain] = useState('');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [status, setStatus] = useState('');
  const [ciphertext1, setCiphertext1] = useState('');
  const [ciphertext2, setCiphertext2] = useState('');
  const [operationIndex, setOperationIndex] = useState(0);
  const [decryptedResult, setDecryptedResult] = useState(0);

  useEffect(() => {
    const connect = async () => {
      const wsProvider = new WsProvider('ws://127.0.0.1:9944'); // Replace with your node's WS address
      const api = await ApiPromise.create({ provider: wsProvider });
      setApi(api);

      // Fetch chain info
      const chain = await api.rpc.system.chain();
      setChain(chain.toString());
    };

    connect();
  }, []);


  // encrypt extrinsic
  const submitEncryptNumbers = async () => {
    if (!api) return;

    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice'); // Use Alice's account as in your screenshot
    console.log('Encrypting numbers...');

    // Construct the extrinsic for `encryptNumbers`
    const extrinsic = api.tx.fheMath.encryptNumbers(number1, number2);

    // Sign and send the extrinsic
    const unsub = await extrinsic.signAndSend(alice, ({ status, events }) => {
      if (status.isInBlock) {
        setStatus(`Completed at block hash #${status.asInBlock}`);
        console.log(`Transaction included at blockHash ${status.asInBlock}`);

        // Process the events
        events.forEach(({ event: { data, method, section } }) => {
          console.log(`Event: ${section}.${method}`, data.length);

          // Assuming the event is `fheMath.CiphertextsGenerated` (replace with your actual event)
          if (section === 'fheMath' && method === 'NumbersEncrypted') {
            setCiphertext1(data[1]); // Extract and set ciphertext1
            setCiphertext2(data[2]); // Extract and set ciphertext2
          }

          console.log(`Ciphertext 1: ${ciphertext1}`);
          console.log(`Ciphertext 2: ${ciphertext2}`);
        });
        unsub(); // Unsubscribe from further updates
      } else {
        setStatus(`Current status: ${status.type}`);
        console.log(`Current status: ${status.type}`);
      }
    });
  };

  // decrypt extrinsic
  const submitDecryptNumbers = async (operation) => {
    if (!api) return;

    console.log('Decrypting numbers...');

    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri('//Alice'); // Use Alice's account as in your screenshot

    // Construct the extrinsic for `encryptNumbers`
    const extrinsic = api.tx.fheMath.decryptResult(operationIndex, operation);

    // Sign and send the extrinsic
    const unsub = await extrinsic.signAndSend(alice, ({ status, events }) => {
      if (status.isInBlock) {
        setStatus(`Completed at block hash #${status.asInBlock}`);
        console.log(`Transaction included at blockHash ${status.asInBlock}`);

        // Process the events
        events.forEach(({ event: { data, method, section } }) => {
          console.log(`Event: ${section}.${method}`, data.length);

          // Assuming the event is `fheMath.CiphertextsGenerated` (replace with your actual event)
          if (section === 'fheMath' && method === 'ResultDecrypted') {
            setDecryptedResult(data[1][0]); // Extract and set decrypted result
          }

          console.log(`Decrypted Result: ${decryptedResult}`);
        });
        unsub(); // Unsubscribe from further updates
      } else {
        setStatus(`Current status: ${status.type}`);
        console.log(`Current status: ${status.type}`);
      }
    });
  };

  const restValues = () => {
    setNumber1(0);
    setNumber2(0);
    setCiphertext1('');
    setCiphertext2('');
    setDecryptedResult(0);

    setOperationIndex(operationIndex + 1);
  }


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
          A pharmaceutical company wants to analyze patient data from multiple hospitals to study the effectiveness of a new drug. Each hospital encrypts their patient data with FHE and uploads it to a data marketplace. The pharmaceutical company runs its analysis on the encrypted data across all hospitals. The results, such as drug efficacy metrics, are then decrypted by each hospital and shared with the pharmaceutical company, ensuring that patient privacy is preserved throughout the process.
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
            <NumberInput placeholder={'Enter first number'} onInput={(e) => setNumber1(e.target.value)} />
            <NumberInput placeholder={'Enter second number'} onInput={(e) => setNumber2(e.target.value)} />
          </div>
          <div className="demo-input-subcontainer">
            <h3 className="body-text">
              What is happening here?
            </h3>
            <p className="body-text">
              In the input fields above, you can enter two numbers. These numbers will be encrypted into ciphertexts then you are able to perform arithmetic operations on them. The result will be decrypted and displayed below. Click the button below to encrypt and perform the operation.
            </p>
            <MainButton onClick={submitEncryptNumbers} buttonText="Encrypt" />
          </div>
        </div>
        <div className="demo-output-subcontainer">
          <h3 className="body-text">
            Result of Encryption
          </h3>
          <p className="body-text">
            The result of the encryption is displayed here. This is the ciphertext that is generated when you click the "Encrypt" button. Now, click the button below to perform the operation on the encrypted data.
          </p>
          <NumberInput placeholder={'Result'} onInput={(e) => setCiphertext1(e.target.value)} value={ciphertext1} />
          <NumberInput placeholder={'Result'} onInput={(e) => setCiphertext2(e.target.value)} value={ciphertext2} />
        </div>
        <div className="demo-output-subcontainer-row">
          <MainButton onClick={() => submitDecryptNumbers('Add')} buttonText="Add & Decrypt" />
          <MainButton onClick={() => submitDecryptNumbers('Sub')} buttonText="Subtract & Decrypt" />
          <MainButton onClick={() => submitDecryptNumbers('Mul')} buttonText="Multiply & Decrypt" />
        </div>
        <div className="demo-output-subcontainer">
          <h3 className="body-text">
            Result of Operation on Encrypted Data (Decrypted)
          </h3>
          <p className="body-text">
            The result of the operation on the encrypted data is displayed here. This is the plaintext that is generated when you click the "Add & Decrypt", "Subtract & Decrypt", or "Multiply & Decrypt" button.
          </p>
          <NumberInput placeholder={'Result'} onInput={(e) => setDecryptedResult(e.target.value)} value={decryptedResult} />
        </div>
        <div className="demo-output-subcontainer-row">
          <MainButton onClick={restValues} buttonText="Reset Values" />
        </div>
      </div>
    </div>
  );
}

export default App;
