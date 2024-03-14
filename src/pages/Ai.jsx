import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import TopBar from '../components/TopBar';
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CampaignIcon from "@mui/icons-material/Campaign";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { v4 } from "uuid";
import loader from '../assets/loader.gif'

const Ai = () => {
    const { user, edit } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const uid = user?._id;

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div>
            <TopBar />
            {loading && (
                <div className="flex justify-center items-center h-screen">
                    <img src={loader} alt="" height="200px" width="200px"/>
                </div>
            )}
            <iframe
                title="cu-ai-model"
                src="https://cu-ai-model.vercel.app"
                style={{ width: '100%', height: 'calc(100vh - 64px)', border: 'none', display: loading ? 'none' : 'block' }}
                onLoad={handleLoad}
            />
            {isMobile && (
                <div
                    style={{ height: "60px" }}
                    className="fixed bottom-0 left-0 w-full bg-primary p-4 flex justify-around items-center text-blue"
                >
                    {/* Update your bottom navigation items with icons */}
                    <Link
                        to="/"
                        className="text-xl flex flex-col items-center"
                        style={{ fontSize: "15px", color: "grey" }}
                    >
                        <LocalFireDepartmentIcon
                            style={{ fontSize: "25px", color: "grey" }}
                        />
                        Feed
                    </Link>

                    <Link
                        to="/ai"
                        className="text-xl flex flex-col items-center"
                        style={{ fontSize: "15px", color: "#f5c000" }}
                    >
                        <AutoAwesomeIcon
                            style={{ fontSize: "25px", color: "#f5c000" }}
                        />
                        Clu.ai
                    </Link>

                    <Link
                        to={`/profile/${uid}`}
                        className="text-xl flex flex-col items-center"
                        style={{ fontSize: "15px", color: "grey" }}
                    >
                        <AccountCircleIcon
                            style={{ fontSize: "25px", color: "grey" }}
                        />
                        Profile
                    </Link>

                    <Link
                        to="/notifications"
                        className="text-xl flex flex-col items-center"
                        style={{ fontSize: "15px", color: "grey" }}
                    >
                        <CampaignIcon style={{ fontSize: "25px", color: "grey" }} />
                        Updates
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Ai;
