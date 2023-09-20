import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getUserProfile, updateUserProfile } from "../../api";
import "./Profile.css";
export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const storedAuthUid = localStorage.getItem("authUid");

  useEffect(() => {
    // Fetch user profile from Firestore on component mount

    if (storedAuthUid) {
      getUserProfile(setUserProfile);
    }
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const { displayName, email, photoURL } = event.target.elements;

    const newProfileData = {
      displayName: displayName.value,
      email: email.value,
      photoURL: photoURL.value,
    };
    await updateUserProfile(newProfileData);

    setUserProfile(newProfileData);
  };

  if (userProfile.photoURL) {
    return (
      <div className="xxl">
        <div className="profile-info">
          <img src={userProfile.photoURL} className="profile-picture" />
          <div className="profile-text">
            <h1>{userProfile.displayName}</h1>
            <p>{userProfile.email}</p>
          </div>
        </div>
        <form className="profile-form" onSubmit={handleUpdate}>
          <label>
            Display Name:
            <input
              type="text"
              name="displayName"
              defaultValue={userProfile.displayName}
            />
          </label>
          <label>
            Email:
            <input type="email" name="email" defaultValue={userProfile.email} />
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              name="photoURL"
              defaultValue={userProfile.photoURL}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}
