import Display from "./componets/Display"
import Modal from "./componets/Modal"
import FileUpload from "./componets/FileUpload"

function App() {
  

  return (
    <>
      <p className="text-5xl text-red-500 font-medium">Welcome to the React App</p>
      <Modal />
      <FileUpload />
      <Display />
    </>
  )
}

export default App
