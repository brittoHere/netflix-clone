import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "../Assets";
import { auth, signOut } from "../firebase";
import { selectUser } from "../features/userSlice";
import { plansData } from "../data";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const logOut = () => {
    if (signOut(auth)) {
      navigate("/");
    }
  };

  const showPlan = (item) => {
    setQuality(item.quality);
    setPrice(item.price);
  };

  return (
    <div className="profile__container">
      <h1>Your Profile</h1>
      <div className="profile__info">
        <img src={Avatar} alt="avatar" />
        <div className="profile__details">
          <h2>{user.email}</h2>
          <div className="plans">
            <h3>Plans</h3>
            {plansData.map((plan, key) => {
              return (
                <div className="plan__list">
                  <h4 key={key}>{plan.title}</h4>
                  {plan.data.map((item, key) => {
                    return (
                      <div
                        className={
                          quality === item.quality ? "set__list" : null
                        }
                        onClick={() => showPlan(item)}
                      >
                        <p key={key}>
                          <span>Quality : </span> {item.quality}
                        </p>
                        <p>
                          <span>Number Of Device : </span> {item.devices}
                        </p>
                        <p>
                          <span>Price : </span> {item.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button className="upgrade">{`Subscribe ${price}`}</button>
            <button onClick={() => logOut()} className="profile__signout">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
