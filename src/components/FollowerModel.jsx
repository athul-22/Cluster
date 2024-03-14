import React from "react";
import { NoProfile } from "../assets";

const Modal = ({ onClose, followers }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center m-10">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white w-96 rounded-lg shadow-xl">
        <span
          className="absolute top-1 right-1 p-2 text-gray-500 cursor-pointer"
          style={{ fontSize: '24px', backgroundColor: 'red', borderRadius: '50%', color: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '10px', transform: 'translate(50%, -50%)' }}
          onClick={onClose}
        >
          &times;
        </span>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Followers</h2>
          <ul>
            {followers.map((follower) => (
              <li key={follower.id} className="flex items-center mb-2">
                <img
                  src={follower.profileUrl || NoProfile}
                  alt={`${follower.firstName} ${follower.lastName}`}
                  className="w-10 h-10 object-cover rounded-full mr-2"
                />
                <span>{`${follower.firstName} ${follower.lastName}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
