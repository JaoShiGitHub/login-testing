import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authentication";
import { useTranslation, Trans } from "react-i18next";

const langs = {
  en: { nativeName: "English" },
  esp: { nativeName: "Spanish" },
};

function Profile() {
  const { logout, user } = useAuth();
  const items_center = "flex flex-col items-center";
  const [userData, setUserData] = useState(null);
  const { t, i18n } = useTranslation();

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
      <div className="flex gap-x-4">
        {Object.keys(langs).map((lang) => {
          return (
            <button
              type="submit"
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              disabled={i18n.resolvedLanguage === lang}
            >
              {langs[lang].nativeName}
            </button>
          );
        })}
      </div>
      <h1 className="font-bold text-4xl mb-10 mt-20">
        {t("welcome")} {userData?.username} {":)"}
      </h1>
      <div className="w-[200px] h-[200px] bg-pink-200"></div>
      <section className={`${items_center} gap-y-2 mt-8 mb-20`}>
        <p>
          <b>Username</b>: {userData?.username}
        </p>
        <p>
          <b>Email</b>: {userData?.email}
        </p>
        <p>
          <b>Status</b>: {userData?.status}
        </p>
      </section>
      <button
        className="hover:font-bold hover:text-white hover:bg-gray-950 px-2 border-2 rounded-md"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}

export default Profile;
