import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useTranslation, Trans } from "react-i18next";
import LangButtons from "./LangButtons";

function Profile() {
  const { logout, user } = useAuth();
  const items_center = "flex flex-col items-center";
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();

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
      console.log("User data fetched successfully:", data?.data?.user_data);
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`${items_center} h-screen`}>
      {/* Text Greeting */}
      <div className="mt-10">
        <LangButtons />
      </div>
      <h1 className="font-bold text-4xl mb-10 mt-20">
        {t("welcome")} {userData?.username} {":)"}
      </h1>
      <div className="w-[200px] h-[200px] bg-pink-200"></div>
      <section className={`${items_center} gap-y-2 mt-8 mb-20`}>
        <p>
          <b>{t("username")}</b>: {userData?.username}
        </p>
        <p>
          <b>{t("email")}</b>: {userData?.email}
        </p>
        <p>
          <b>{t("status")}</b>: {userData?.status}
        </p>
      </section>
      <p></p>
      <button
        className="hover:font-bold hover:text-white hover:bg-gray-950 px-2 border-2 rounded-md"
        onClick={handleLogout}
      >
        {t("logout")}
      </button>
    </div>
  );
}

export default Profile;
