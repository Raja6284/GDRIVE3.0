
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x052df792cF606C1Eb6c23FC84B3debDD7a696cCB";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <>
      {!modalOpen && contract && (
        <button
          className="fixed top-4 right-4 px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition"
          onClick={() => setModalOpen(true)}
        >
          Share
        </button>
      )}

      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-800 text-white flex flex-col items-center justify-center px-4 py-10 space-y-10">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Gdrive 3.0</h1>
        <p className="text-lg font-mono bg-black/30 px-4 py-2 rounded-lg border border-white/20">
          Account : {account ? account : "Not connected"}
        </p>
        <div className="w-full max-w-4xl space-y-8">
          {account && contract && (
            <FileUpload account={account} provider={provider} contract={contract} />
          )}
          <Display contract={contract} account={account} />
        </div>
      </div>
    </>
  );
}

export default App;
