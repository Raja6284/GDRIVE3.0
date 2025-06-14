
import { useEffect } from "react";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allowAccess(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.getAccessList();
      let select = document.querySelector("#selectNumber");
      addressList.forEach((opt) => {
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      });
    };
    contract && accessList();
  }, [contract]);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col p-6 text-center space-y-4">
        <h2 className="text-lg font-semibold">Share with</h2>

        <input
          type="text"
          className="address h-[40px] w-full px-4 text-center border border-gray-300 rounded focus:bg-blue-100"
          placeholder="Enter Address"
        />

        <form id="myForm">
          <select
            id="selectNumber"
            className="w-full h-[40px] px-2 text-center border border-gray-300 rounded mt-2"
          >
            <option className="address">People With Access</option>
          </select>
        </form>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="w-[100px] h-[35px] bg-red-600 text-white rounded-md text-base hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={sharing}
            className="w-[100px] h-[35px] bg-blue-500 text-white rounded-md text-base hover:bg-blue-600"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
