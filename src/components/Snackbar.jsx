import { useEffect, useState } from 'react';
// import { MdOutlineClear } from "react-icons/md";

const Snackbar = ({ message, type, onClose }) => {
  const [sanckbarcountdown, setSnackBarCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSnackBarCountdown(prev => prev - 1);
    }, 1000);

    if (sanckbarcountdown === 0) {
      onClose();
    }

    return () => clearInterval(timer);
  }, [sanckbarcountdown, onClose]);

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-center px-5 py-3 rounded-md text-white z-50 w-72 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
      {/* <MdOutlineClear
        size={24}
        onClick={onClose}
        className="ml-2 cursor-pointer text-white"
      /> */}
       <div
        size={24}
        onClick={onClose}
        className="ml-2 cursor-pointer text-white"
      />
    </div>
  );
};

export default Snackbar;
