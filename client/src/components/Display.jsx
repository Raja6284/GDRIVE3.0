
import { useState } from "react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    console.log(Otheraddress);
    try {
      dataArray = Otheraddress
        ? await contract.displayFiles(Otheraddress)
        : await contract.displayFiles(account);
    } catch (e) {
      alert("You don't have access : ", e.message);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const images = dataArray.toString().split(",").map((item, i) => (
        <a href={item} key={i} target="_blank" rel="noopener noreferrer">
          <img src={item} alt="uploaded" className="w-full h-full object-cover rounded shadow-md" />
        </a>
      ));
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 auto-rows-[350px] m-2">
        {data}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-4">
        <input
          type="text"
          placeholder="Enter Address"
          className="address h-[40px] w-[300px] px-4 text-center border border-gray-300 rounded focus:bg-blue-100"
        />
        <button
          className="bg-gradient-to-b from-[#009ffd] to-[#2a2a72] text-white px-4 py-2 rounded hover:shadow-[0_3px_8px_rgba(253,76,0,0.5)]"
          onClick={getdata}
        >
          Get Data
        </button>
      </div>
    </>
  );
};

export default Display;
