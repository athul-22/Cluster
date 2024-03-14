import React from "react";
import { TopBar } from "../components";
import noupdates from "../assets/noupdates.png";
import { Link } from "react-router-dom";

export default function Notifications() {
  return (
    <div className="w-full px-0 lg:px-10 pb-20 2xl:px-40   bg-[#ffffff] lg:rounded-lg h-screen overflow-hidden">
      <TopBar />
      <img
        src={noupdates}
        alt="No Updates"
        className="  mx-auto mt-20"
        style={{ height: "300px", width: "290px" }}
      />
      <br />
      <p
        style={{
          textAlign: "center",
          fontSize: "25px",
          fontWeight: "",
          color: "grey",
        }}
      >
        No Updates 🫗
      </p>
      <div className="flex items-center justify-center">
        <br />
        <br />
        <br />
        <br />

        <Link to="/" className="w-full m-10">
          <button
            className="w-full"
            style={{
              height: "40px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "30px",
              fontSize: "20px",
            }}
          >
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
