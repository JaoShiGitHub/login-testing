import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { useTranslation, Trans } from "react-i18next";
import LangButtons from "./LangButtons";

const items_center = "flex flex-col items-center";
const css_button =
  "hover:font-bold hover:text-white hover:bg-gray-950 px-2 border-2 rounded-md w-fit";

function Profile() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  // Buttons states
  const [editFormSwitch, setEditFormSwitch] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  // input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

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

      console.log("User data fetched successfully:", user);
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const handleOnSubmitFormEdit = async (e) => {
    e.preventDefault();

    const image = newImage || imageUrl;

    try {
      const response = await axios.put(
        `http://localhost:4000/edit?id=${userId}`,
        { username, email, status, image },
        { withCredentials: true }
      );

      console.log("Update successfully ", response);
      console.log("newImage", newImage);
      console.log("img url: ", imageUrl);

      setEditFormSwitch(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // base64 string (works only after loading)
      };
      reader.readAsDataURL(file); // converts file to base64 (starts the loading)
      // console.log("file: ", file);
      // console.log("imageURL: ", imageURL);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return t(str).charAt(0).toUpperCase() + t(str).slice(1);
  };

  const handleOnClickCancel = () => {
    setUsername(userData?.username);
    setEmail(userData?.email);
    setStatus(userData?.status);
    setNewImage(null);
    setPreviewImage(null);

    setEditFormSwitch(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:4000/delete?id=${userId}`, {
        withCredentials: true,
      });
      setDeleteAccount(false);
      setIsAccountDeleted(true);
      console.log("Account has been deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`${items_center} h-screen`}>
      <div className="mt-10">
        <LangButtons />
      </div>
      {isAccountDeleted ? (
        <strong className="text-red-700 text-4xl  mb-10 mt-20">
          {userData?.username} has been deleted. 🥺
        </strong>
      ) : (
        <h1 className="font-bold text-4xl mb-10 mt-20">
          <Trans i18nKey="welcome">Welcome</Trans> {userData?.username} {":)"}
        </h1>
      )}

      {/* Edit Profile Condition: "editFormSwitch = true ? open form : show profile" */}
      {editFormSwitch ? (
        <form
          id="form-edit"
          className={`${items_center} gap-5 mb-10`}
          onSubmit={handleOnSubmitFormEdit}
        >
          <img
            src={previewImage || imageUrl}
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

      {isAccountDeleted ? (
        <p className="text-lg">
          Go back to{"  "}
          <button
            className="text-blue-500 font-bold ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      ) : (
        <section className="flex flex-col gap-y-16 gap-x-8 mb-10">
          {editFormSwitch ? (
            <div className="flex gap-4">
              <button className={css_button} onClick={handleOnClickCancel}>
                <Trans i18nKey="cancel">Cancel</Trans>
              </button>

              <button className={css_button} type="submit" form="form-edit">
                <Trans i18nKey="save">Save</Trans>
              </button>
            </div>
          ) : (
            <button
              className={`${css_button} self-center`}
              onClick={() => setEditFormSwitch(true)}
            >
              <Trans i18nKey="edit">Edit</Trans>
            </button>
          )}

          {deleteAccount ? (
            <section>
              <Trans i18nKey="deleteAccount">
                Do you really want to eliminate this account? 🥺
              </Trans>
              <div className="mt-5 flex gap-x-10 justify-center">
                <button className={css_button} onClick={handleDeleteAccount}>
                  <Trans i18nKey="yes">Yes</Trans>
                </button>
                <button
                  className={css_button}
                  onClick={() => setDeleteAccount(false)}
                >
                  <Trans i18nKey="no">No</Trans>
                </button>
              </div>
            </section>
          ) : (
            <section>
              <button
                className={`${css_button} mr-5 w-fit`}
                onClick={handleLogout}
              >
                <Trans i18nKey="logout">Log out</Trans>
              </button>
              <button
                className={css_button}
                onClick={() => setDeleteAccount(true)}
              >
                <Trans i18nKey="eliminateAccount">Eliminate this account</Trans>
              </button>
            </section>
          )}
        </section>
      )}
    </div>
  );
}

export default Profile;
