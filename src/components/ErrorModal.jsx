import React from "react";

const ErrorModal = ({ message, closeModal }) => {
  return (
    <div className="flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-700">{message}</p>
        <button
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
