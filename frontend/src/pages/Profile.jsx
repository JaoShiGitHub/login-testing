import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigator = useNavigate();
  const items_center = "flex flex-col items-center";
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    get_userData();
  }, []);

  const get_userData = async () => {
    try {
      const data = await axios.get(
        "http://localhost:4000/profile?customer_id=3",
        { withCredentials: true }
      );

      setUserData(data.data.user_data);
      console.log("User data fetched successfully:", data.data.user_data);
    } catch (error) {
      console.error("Error fetching user data");
    }
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout", { withCredentials: true })
      .then((response) => {
        console.log("Logout successful:", response.data);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
    navigator(`/login`);
  };

  return (
    <div className={`${items_center} h-screen`}>
      <h1 className="font-bold text-4xl mb-10 mt-20">Profile</h1>
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
