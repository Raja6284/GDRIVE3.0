import { useState } from "react";
import axios from "axios";
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `ec732369a833243ebc08`,
            pinata_secret_api_key: `723dca23c4a93880993312c27584ab03995b6171f41b36fe092aea8e80a3e52e`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const tx = await contract.addFile(account, ImgHash);
        tx.wait();
        alert("Successfully Image Uploaded");
        setFileName("No file selected");
        setFile(null);
      } catch (e) {
        alert(`Unable to upload image to Pinata: ${e.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => setFile(data);
    setFileName(data.name);
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4">
            <Upload className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Upload Your Files</h2>
          <p className="text-slate-400">Securely store your files on the decentralized network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Input Area */}
          <div className="relative">
            <input
              disabled={!account}
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className={`group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
                ${!account 
                  ? 'border-slate-600 bg-slate-800/50 cursor-not-allowed' 
                  : 'border-purple-400/50 bg-purple-500/10 hover:border-purple-400 hover:bg-purple-500/20'
                }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className={`p-4 rounded-full mb-4 transition-colors ${
                  !account ? 'bg-slate-700' : 'bg-purple-500/20 group-hover:bg-purple-500/30'
                }`}>
                  <File className={`w-8 h-8 ${!account ? 'text-slate-500' : 'text-purple-400'}`} />
                </div>
                <p className={`mb-2 text-lg font-semibold ${!account ? 'text-slate-500' : 'text-white'}`}>
                  Click to upload file
                </p>
                <p className={`text-sm ${!account ? 'text-slate-600' : 'text-slate-400'}`}>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </label>
          </div>

          {/* File Info */}
          <div className="flex items-center gap-3 p-4 bg-black/20 rounded-xl">
            <div className={`p-2 rounded-lg ${file ? 'bg-green-500/20' : 'bg-slate-500/20'}`}>
              {file ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Selected File</p>
              <p className="text-xs text-slate-400 truncate">{fileName}</p>
            </div>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={!file || uploading}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 
              ${!file || uploading
                ? 'bg-slate-600 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]'
              }`}
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload to IPFS
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
