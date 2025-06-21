import { useState } from "react";
import { Search, Grid, ExternalLink, Users, Database } from "lucide-react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");

  const getdata = async () => {
    setLoading(true);
    let dataArray;
    const Otheraddress = searchAddress;
    console.log(Otheraddress);
    try {
      dataArray = Otheraddress
        ? await contract.displayFiles(Otheraddress)
        : await contract.displayFiles(account);
    } catch (e) {
      alert("You don't have access: " + e.message);
      setLoading(false);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const images = dataArray.toString().split(",").map((item, i) => (
        <div key={i} className="group relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
          <div className="aspect-square overflow-hidden">
            <img 
              src={item} 
              alt="uploaded" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <a 
            href={item} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </a>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-medium">Click to view full size</p>
          </div>
        </div>
      ));
      setData(images);
    } else {
      alert("No image to display");
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Browse Files</h2>
            <p className="text-slate-400">View your files or explore shared content</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter wallet address (optional)"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-black/20 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={getdata}
              disabled={loading}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Grid className="w-5 h-5" />
                  Get Files
                </>
              )}
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4" />
                <span>Shared with me</span>
              </div>
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="flex items-center gap-2 text-slate-400">
                <Database className="w-4 h-4" />
                <span>My files</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Files Grid */}
      {data.length > 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">File Gallery</h3>
            <p className="text-slate-400">Click on any image to view in full size</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data}
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-700/50 rounded-full mb-6">
            <Grid className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Files Found</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Upload some files or enter a wallet address to view shared content
          </p>
        </div>
      )}
    </div>
  );
};

export default Display;
