import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileCard, TopBar } from "../components";
import notfound from "../assets/404.jpg";
import Skeleton from "react-loading-skeleton";

const Profile = () => {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Use useSelector to get user from Redux store

  const fetchUserDetails = async () => {
    try {
      const response = await axios.post(
        `https://cluster-backend.onrender.com/users/get-user/${id}`
      );
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

  useEffect(() => {
    if (user && userInfo) {
      setIsFollowing(user.following && user.following.includes(userInfo._id));
    }
  }, [user, userInfo]);

  const handleFollow = async () => {
    try {
      await axios.post(`http://localhost:8800/users/follow/${userInfo._id}`);
      setIsFollowing(true);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        followers: [...prevUserInfo.followers, user._id],
      }));
    } catch (error) {
      console.error("Failed to follow user:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`http://localhost:8800/users/unfollow/${userInfo._id}`);
      setIsFollowing(false);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        followers: prevUserInfo.followers.filter((id) => id !== user._id),
      }));
    } catch (error) {
      console.error("Failed to unfollow user:", error);
    }
  };

  return (
    <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
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
        <div
          className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4 pt-5 pb-10 h-full items-center mb-1 "
          style={{ backgroundColor: "white" }}
        >
          <center>
            <img
              src={notfound}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(100vh - 140px)",
                marginTop: "-200px",
              }}
              alt=""
              height="400px"
              width="400px"
            />
            <p style={{ fontSize: "25px", color: "grey" }}>User not Found !</p>
          </center>
        </div>
      )}

      {!loading && userInfo && (
        <div className="w-full flex flex-col items-center justify-center gap-2 lg:gap-4 pt-5 pb-10 h-full sm:mx-10 p-5">
          <div className="w-full md:w-2/3 text-center mx-auto m-4">
            <ProfileCard
              user={userInfo}
              loggedInUser={user} // Pass user instead of loggedInUser
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
            />
          </div>
          <Link to="/" className="w-full">
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
      )}
    </div>
  );
};

export default Profile;
