import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsPersonFillAdd } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment";
import { NoProfile } from "../assets";
import axios from "axios";
import { BsInstagram, BsFacebook } from 'react-icons/bs';
import { FaTwitterSquare } from 'react-icons/fa';

const ProfileCard = ({ user, loggedInUser, onFollow, onUnfollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    // Check if the loggedInUser is following the user
    const checkFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/users/is-following/${user._id}`);
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error("Failed to check following status:", error);
      }
    };

    // Get the total follower count
    const fetchFollowerCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/users/${user._id}/follower-count`);
        setFollowerCount(response.data.followerCount);
      } catch (error) {
        console.error("Failed to fetch follower count:", error);
      }
    };

    

    if (loggedInUser) {
      checkFollowing();
      fetchFollowerCount();
    }
  }, [user._id, loggedInUser]);

  return (
    <div>
      <div className="w-full bg-primary flex flex-col items-center shadow-sm rounded-xl px-6 py-4">
        <div className="w-full flex items-center justify-between border-b pb-5 border-[#66666645]">
          <Link to={"/profile/" + user?._id} className="flex gap-2">
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className="w-14 h-14 object-cover rounded-full"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-ascent-1">
                {user?.firstName} {user?.lastName}
              </p>
              <span className="text-ascent-2">{user?.profession ?? "No Profession"}</span>
            </div>
          </Link>
          <div className="">
          {loggedInUser && loggedInUser._id !== user._id && (
  <button
    className={`bg-[#000000]  flex text-sm text-white p-2 rounded ${isFollowing ? 'border-black' : ''}`}
    style={{ backgroundColor: isFollowing ? 'white' : '' }}
    onClick={isFollowing ? onUnfollow : onFollow}
  >
    {isFollowing ? "UNFOLLOW" : "FOLLOW"}{" "}
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
          <p className="text-xl text-ascent-1 font-semibold">{followerCount} Connections</p>
          <span className="text-base text-blue">{user?.verified ? "Verified Account" : "Not Verified"}</span>
          <div className="flex items-center justify-between">
            <span className="text-ascent-2">Joined</span>
            <span className="text-ascent-1 text-base">{moment(user?.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 py-4 pb-6'>
          <p className='text-ascent-1 text-lg font-semibold'>Social Profile</p>

          <div className='flex gap-2 items-center text-ascent-2'>
            <BsInstagram className=' text-xl text-ascent-1' />
            <span>Instagram</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <FaTwitterSquare className=' text-xl text-ascent-1' />
            <span>Twitter</span>
          </div>
          <div className='flex gap-2 items-center text-ascent-2'>
            <BsFacebook className=' text-xl text-ascent-1' />
            <span>Facebook</span>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default ProfileCard;
