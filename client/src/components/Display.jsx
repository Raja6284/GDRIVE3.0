import { useState } from "react";

const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.displayFiles(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.displayFiles(account);
      }
    } catch (e) {
      alert("You don't have access : ", e.message);
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => {
        console.log(item);
        return (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <img
              key={i}
              src={`${item}`}
              alt="new"
              className="w-[250px] h-[350px] object-cover"
            />
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2 auto-rows-[350px] m-2">
        {data}
      </div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address block mx-auto h-[30px] w-[330px] text-center focus:bg-blue-200 border border-gray-300 rounded mb-4"
      />
      <button
        className="center bg-gradient-to-b from-[#009ffd] to-[#2a2a72] text-white px-4 py-2 rounded hover:shadow-[0_3px_8px_rgba(253,76,0,0.5)] block mx-auto"
        onClick={getdata}
      >
        Get Data
      </button>
    </>
  );
};

export default Display;
