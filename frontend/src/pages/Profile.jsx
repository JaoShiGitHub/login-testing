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
  // input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    get_userData(user.user.id);
  }, [user]);

  const get_userData = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/profile?customer_id=${id}`,
        { withCredentials: true }
      );

      const user = response?.data?.user_data;

      setUserData(user);
      setUserId(id);
      console.log("User data fetched successfully:", user);
      // data?.data?.user_data?.photo?.data;
      if (user?.photo?.data) {
        const binary = user.photo.data;
        const base64String = btoa(
          binary.reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        const imageSrc = `data:image/jpeg;base64,${base64String}`;
        setImageUrl(imageSrc);
      }

      setUsername(user?.username);
      setEmail(user?.email);
      setStatus(user?.status);
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/edit?id=${userId}`,
        { username: "", email: "", password: "", status: "" },
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

  const capitalizeFirstLetter = (str) => {
    return t(str).charAt(0).toUpperCase() + t(str).slice(1);
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
        <form
          className={`${items_center} gap-5 mb-10`}
          onSubmit={handleOnSubmit}
        >
          <img
            src={imageUrl}
            alt={userData?.username}
            className="w-[200px] h-[200px]"
          />
          <label className="bg-blue-500 hover:bg-blue-900 mb-5 text-white px-4 py-1 rounded cursor-pointer inline-block">
            <Trans i18nKey="changeImage">Change Image</Trans>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <label>
            <b>
              <Trans i18nKey="username">Username</Trans>:
            </b>
            <input
              className="mx-4 px-2 py-1 rounded border"
              type="text"
              placeholder={capitalizeFirstLetter("username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <b>
              <Trans i18nKey="email">Email</Trans>:
            </b>
            <input
              className="mx-4 px-2 py-1 rounded border"
              type="text"
              placeholder={capitalizeFirstLetter("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <b>
              <Trans i18nKey="status">Status</Trans>:
            </b>
            <input
              className="mx-4 px-2 py-1 rounded border"
              type="text"
              placeholder={capitalizeFirstLetter("status")}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
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
      <section className="flex flex-col gap-y-16 gap-x-8">
        {editFormSwitch ? (
          <div className="flex gap-4">
            <button
              className={css_button}
              onClick={() => setEditFormSwitch(false)}
            >
              <Trans i18nKey="cancel">Cancel</Trans>
            </button>

            <button className={css_button}>
              <Trans i18nKey="save">Save</Trans>
            </button>
          </div>
        ) : (
          <button
            className={css_button}
            onClick={() => setEditFormSwitch(true)}
          >
            <Trans i18nKey="edit">Edit</Trans>
          </button>
        )}
        <button
          className={`${css_button} self-center w-fit`}
          onClick={handleLogout}
        >
          <Trans i18nKey="logout">Log out</Trans>
        </button>
      </section>
    </div>
  );
}

export default Profile;
