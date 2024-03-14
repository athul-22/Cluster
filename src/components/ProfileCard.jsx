import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { NoProfile } from "../assets";
import axios from "axios";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import Modal from "../components/FollowerModel"; 

const ProfileCard = ({ user, loggedInUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      try {
        const response = await axios.get(
          `https://cluster-backend.onrender.com/users/checkFollowing/${loggedInUser}/${user._id}`
        );
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Failed to check following status:", error);
      }
    };

    if (loggedInUser) {
      checkFollowingStatus();
    }
  }, [loggedInUser, user._id]);

  const handleFollow = async () => {
    try {
      await axios.post("https://cluster-backend.onrender.com/users/follow", {
        followerId: loggedInUser,
        followeeId: user._id,
      });

      setIsFollowing(true); // Update isFollowing state after successful follow
      console.log("User followed successfully");
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post("https://cluster-backend.onrender.com/users/unfollow", {
        followerId: loggedInUser,
        followeeId: user._id,
      });

      setIsFollowing(false); // Update isFollowing state after successful unfollow
      console.log("User unfollowed successfully");
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  const toggleFollowersModal = async () => {
    try {
      const response = await axios.get(
        `https://cluster-backend.onrender.com/users/followers/${user._id}`
      );
      setFollowers(response.data.followers);
      setShowFollowersModal(!showFollowersModal);
    } catch (error) {
      console.error("Failed to fetch followers:", error);
    }
  };

  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <Link to={"/profile/" + user?._id} className="flex gap-2">
            <img
              src={user && user.profileUrl ? user.profileUrl : NoProfile}
              alt={user && user.email}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent-2">
                {user?.profession ?? "No Profession"}
              </span>
            </div>
          </Link>
          <div className="">
            {loggedInUser && user && loggedInUser !== user._id && (
              <button
                onClick={isFollowing ? handleUnfollow : handleFollow}
                className={`bg-[#000000] flex text-sm text-white p-2 rounded ${
                  isFollowing ? "border-black" : ""
                }`}
                style={{ backgroundColor: isFollowing ? "#fc4e54" : "" }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
                <BsPersonFillAdd size={20} className="text-[#ffffff] ml-3" />
              </button>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <div className="flex gap-2 items-center text-ascent-2">
            <CiLocationOn className="text-xl text-ascent-1" />
            <span>{user?.location ?? "Add Class"}</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <span>Profession:</span>
            <span>{user?.profession ?? "Add Education"}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
          <p className="text-xl text-ascent-1 font-semibold">
            {user?.followers?.length} Followers
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={toggleFollowersModal} // Toggle the modal instead of the drawer
              className="bg-[#000000] flex text-sm text-white p-2 rounded border-black"
              style={{ textAlign: "center" }}
            >
              View Followers
            </button>
          </div>
          <span className="text-base text-blue">
            {user?.verified ? "Verified Account" : "Not Verified"}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">
              {moment(user?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        {/* Render modal if showFollowersModal is true */}
        {showFollowersModal && (
          <Modal onClose={toggleFollowersModal} followers={followers} />
        )}
        <div className="w-full flex flex-col gap-4 py-4 pb-6">
          <p className="text-ascent-1 text-lg font-semibold">Social Profile</p>

          <div className="flex gap-2 items-center text-ascent-2">
            <BsInstagram className=" text-xl text-ascent-1" />
            <span>Instagram</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <FaTwitterSquare className=" text-xl text-ascent-1" />
            <span>Twitter</span>
          </div>
          <div className="flex gap-2 items-center text-ascent-2">
            <BsFacebook className=" text-xl text-ascent-1" />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
