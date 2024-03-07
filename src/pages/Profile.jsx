import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { posts } from "../assets/data";
import notfound from '../assets/404.jpg'
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleDelete = () => {};
  const handleLikePost = () => {};

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(`https://cluster-backend.onrender.com/users/get-user/${id}`);
      setUserInfo(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  return (
    <div className='home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <TopBar />

      {loading && (
        <div className="w-full flex flex-col items-center justify-center gap-4 pt-5 pb-10">
          <Skeleton height={100} width={100} circle />
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={300} />
          <Skeleton height={20} width={400} />
        </div>
      )}

      {!loading && !userInfo && (
        <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4 pt-5 pb-10 h-full items-center mb-1" style={{ backgroundColor: 'white' }}>
          <center>
            <img
              src={notfound}
              style={{ maxWidth: '100%', maxHeight: 'calc(100vh - 140px) ', marginTop: '-200px' }}
              alt=""
              height="400px"
              width="400px"
            />
            <p style={{ fontSize: '25px', color: "grey" }}>User not Found !</p>
          </center>
        </div>
      )}

      {!loading && userInfo && (
        <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4 pt-5 pb-10 h-full sm:mx-10"> {/* Added sm:mx-10 for mobile margin */}
          {/* CENTER */}
          <div className='w-full md:w-2/3 text-center mx-auto m-4'>
            <ProfileCard user={userInfo} />
          </div>
          
          {/* Add other components or sections as needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
