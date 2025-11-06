"use client";
// import "./headerStyle.css";
import Cookie from "js-cookie";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserData } from "../api/useFetchData";
import { GrMenu } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
export default function DashBoardHeader(second) {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogOut = () => {
    Cookie.remove("access_token");
    // location.reload();
    window.location.href = "/";
  };

  const Togglemenu = () => {
    setIsOpen(!isOpen);
  };
  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      const access_token = Cookie.get("access_token");
      return fetchUserData(access_token);
    },
  });
  console.log(query);
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          Diamond<span>Predict</span>
        </div>
        <div className="signout-auth-buttons">
          <button className="btn btn-outline" onClick={handleLogOut}>
            Sign Out
          </button>
        </div>

        <div className="toggle-menu-button">
          <button className="btn btn-outline" onClick={Togglemenu}>
            {isOpen ? <IoCloseSharp /> : <GrMenu />}
          </button>
        </div>

        <div className={`toggle-menu-content ${isOpen ? "open" : ""}`}>
          <div className="">
            <h1>{query.data?.profile["user_name"]}</h1>
            <p>{query.data?.profile["user_email"]}</p>
          </div>
          <button
            className="btn btn-outline"
            style={{ marginTop: 10 }}
            onClick={handleLogOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
