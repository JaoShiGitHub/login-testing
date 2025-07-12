import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useTranslation, Trans } from "react-i18next";
import LangButtons from "./LangButtons";

const items_center = "flex flex-col items-center";
const css_button =
  "hover:font-bold hover:text-white hover:bg-gray-950 px-2 border-2 rounded-md";

function Profile() {
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const [editFormSwitch, setEditFormSwitch] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    status: "",
  });

  useEffect(() => {
    get_userData(user.user.id);
  }, [user]);

  const get_userData = async (id) => {
    try {
      const data = await axios.get(
        `http://localhost:4000/profile?customer_id=${id}`,
        { withCredentials: true }
      );

      setUserData(data?.data?.user_data);
      setUserId(id);
      console.log("User data fetched successfully:", data?.data?.user_data);

      const binary = data?.data?.user_data?.photo?.data;
      const base64String = btoa(
        binary.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      const imageSrc = `data:image/jpeg;base64,${base64String}`;
      setImageUrl(imageSrc);
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/edit?id=${userId}`,
        newUserInfo,
        { withCredentials: true }
      );

      console.log("Update successfully ", response);
      setEditFormSwitch(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`${items_center} h-screen`}>
      <div className="mt-10">
        <LangButtons />
      </div>
      {/* Text Greeting */}
      <h1 className="font-bold text-4xl mb-10 mt-20">
        <Trans i18nKey="welcome">Welcome</Trans> {userData?.username} {":)"}
      </h1>
      {/* Edit Profile */}
      {editFormSwitch ? (
        <form className={items_center} onSubmit={handleOnSubmit}>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </form>
      ) : (
        <div className={items_center}>
          <img
            src={imageUrl}
            alt={userData?.username}
            className="w-[200px] h-[200px]"
          />
          <section className={`${items_center} gap-y-2 mt-8 mb-20`}>
            <p>
              <b>
                <Trans i18nKey="username">Username</Trans>
              </b>
              : {userData?.username}
            </p>
            <p>
              <b>
                <Trans i18nKey="email">Email</Trans>
              </b>
              : {userData?.email}
            </p>
            <p>
              <b>
                <Trans i18nKey="status">Status</Trans>
              </b>
              : {userData?.status}
            </p>
          </section>
        </div>
      )}
      <section className="flex gap-x-8">
        <button className={css_button} onClick={handleLogout}>
          <Trans i18nKey="logout">Log out</Trans>
        </button>
        {editFormSwitch ? (
          <button
            className={css_button}
            onClick={() => setEditFormSwitch(false)}
          >
            Cancel
          </button>
        ) : (
          <button
            className={css_button}
            onClick={() => setEditFormSwitch(true)}
          >
            Edit
          </button>
        )}
      </section>
    </div>
  );
}

export default Profile;
