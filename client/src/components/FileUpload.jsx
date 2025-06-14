import { useState } from "react";
import axios from "axios";


const FileUpload = ({ contract, account, provider }) => {

  console.log("FileUpload account prop:", account);
  const [file, setFile] = useState(null);


  const [fileName, setFileName] = useState("No image selected");
//   const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
//   const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         const resFile = await axios({
//           method: "post",
//           url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//           data: formData,
//           headers: {
//            pinataApiKey,pinataSecretApiKey,
//             "Content-Type": "multipart/form-data",
            
//           },
//         });

        
// console.log(pinataApiKey, pinataSecretApiKey, resFile.data.IpfsHash);


//         const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
//         contract.add(account, ImgHash);
//         alert("Successfully Image Uploaded");
//         setFileName("No image selected");
//         setFile(null);
//       } catch (e) {
//         alert("Unable to upload image to Pinata : ",e);
//       }
//     }

//     alert("Successfully Image Uploaded");
//     setFileName("No image selected");
//     setFile(null);
//   };

    const handleSubmit = async (e) => {
  e.preventDefault();
  if (file) {
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
      //console.log(account)
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(account, ImgHash);
      const tx = await contract.addFile(account, ImgHash);
      tx.wait();
      console.log("Transaction hash:", tx.hash);
      
      alert("Successfully Image Uploaded");
      console.log(account)
      setFileName("No image selected");
      setFile(null);
    } catch (e) {
      alert(`Unable to upload image to Pinata: ${e.message}`);
    }
  }
};

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center space-y-4 p-6 bg-white/10 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Choose Image
        </label>

        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
          className="hidden"
        />

        <span className="text-sm font-mono text-white">
          Image: {fileName}
        </span>

        <button
          type="submit"
          className={`px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${
            !file ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!file}
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
