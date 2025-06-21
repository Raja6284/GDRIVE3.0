
// import { useEffect } from "react";

// const Modal = ({ setModalOpen, contract }) => {
//   const sharing = async () => {
//     const address = document.querySelector(".address").value;
//     await contract.allowAccess(address);
//     setModalOpen(false);
//   };

//   useEffect(() => {
//     const accessList = async () => {
//       const addressList = await contract.getAccessList();
//       let select = document.querySelector("#selectNumber");
//       addressList.forEach((opt) => {
//         let e1 = document.createElement("option");
//         e1.textContent = opt;
//         e1.value = opt;
//         select.appendChild(e1);
//       });
//     };
//     contract && accessList();
//   }, [contract]);

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center px-4">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col p-6 text-center space-y-4">
//         <h2 className="text-lg font-semibold">Share with</h2>

//         <input
//           type="text"
//           className="address h-[40px] w-full px-4 text-center border border-gray-300 rounded focus:bg-blue-100"
//           placeholder="Enter Address"
//         />

//         <form id="myForm">
//           <select
//             id="selectNumber"
//             className="w-full h-[40px] px-2 text-center border border-gray-300 rounded mt-2"
//           >
//             <option className="address">People With Access</option>
//           </select>
//         </form>

//         <div className="flex justify-center items-center gap-4 mt-4">
//           <button
//             onClick={() => setModalOpen(false)}
//             className="w-[100px] h-[35px] bg-red-600 text-white rounded-md text-base hover:bg-red-700"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={sharing}
//             className="w-[100px] h-[35px] bg-blue-500 text-white rounded-md text-base hover:bg-blue-600"
//           >
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;



import { useEffect, useState } from "react";
import { X, Share2, Users, Copy, Check } from "lucide-react";

const Modal = ({ setModalOpen, contract }) => {
  const [accessList, setAccessList] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [copied, setCopied] = useState(false);

  // Original sharing logic from previous code
  const sharing = async () => {
    const address = newAddress || document.querySelector(".address")?.value;
    await contract.allowAccess(address);
    setModalOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchAccessList = async () => {
      const addressList = await contract.getAccessList();
      setAccessList(addressList);
      
      // Original DOM manipulation logic from previous code
      let select = document.querySelector("#selectNumber");
      if (select) {
        // Clear existing options except the first one
        select.innerHTML = '<option className="address">People With Access</option>';
        addressList.forEach((opt) => {
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        });
      }
    };
    contract && fetchAccessList();
  }, [contract]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Share Files</h2>
              <p className="text-sm text-slate-400">Grant access to your files</p>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Add New Address - keeping both input methods from original code */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">
              Wallet Address
            </label>
            <div className="relative">
              <input
                type="text"
                className="address w-full h-12 px-4 bg-black/20 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="0x1234567890abcdef..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Original select element from previous code */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-white">
              Select from existing access list
            </label>
            <select
              id="selectNumber"
              className="w-full h-12 px-4 bg-black/20 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option className="address bg-slate-800">People With Access</option>
            </select>
          </div>

          {/* Access List Display with new UI */}
          {accessList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <label className="text-sm font-medium text-white">
                  People with Access ({accessList.length})
                </label>
              </div>
              
              <div className="max-h-32 overflow-y-auto space-y-2">
                {accessList.map((address, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/10">
                    <span className="text-sm text-slate-300 font-mono">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(address)}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setModalOpen(false)}
              className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={sharing}
              disabled={!newAddress}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Share Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;