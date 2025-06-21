import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import { Share2, Cloud, Shield, Database } from "lucide-react";

// Extend Window interface for ethereum
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
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

    window.ethereum && loadProvider();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      
      {/* Share button */}
      {!modalOpen && contract && (
        <button
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/10"
          onClick={() => setModalOpen(true)}
        >
          <Share2 className="w-4 h-4" />
          Share Files
        </button>
      )}

      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-12 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Gdrive 3.0
            </h1>
          </div>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Secure, decentralized file storage powered by blockchain technology. 
            Your files, your control, your privacy.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Shield className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure</h3>
              <p className="text-slate-400 text-sm text-center">End-to-end encryption</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Database className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Decentralized</h3>
              <p className="text-slate-400 text-sm text-center">No single point of failure</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <Cloud className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Accessible</h3>
              <p className="text-slate-400 text-sm text-center">Access from anywhere</p>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 rounded-xl">
              <div className={`w-2 h-2 rounded-full ${account ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm font-mono text-white">
                {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full max-w-6xl space-y-8">
          {account && contract && (
            <FileUpload account={account} provider={provider} contract={contract} />
          )}
          <Display contract={contract} account={account} />
        </div>
      </div>
    </div>
  );
}

export default App;
