function Profile() {
  const items_center = "flex flex-col items-center";

  return (
    <div className={`${items_center} h-screen`}>
      <h1 className="font-bold text-4xl mb-10 mt-20">Profile {"Alice"}</h1>
      <div className="w-[200px] h-[200px] bg-pink-200"></div>
      <section className={`${items_center} gap-y-2 mt-8 mb-20`}>
        <p>
          <b>Username</b>: TheCutestAlice
        </p>
        <p>
          <b>Email</b>: lovely_alice@email.com
        </p>
        <p>
          <b>Status</b>: Hello little Alice!
        </p>
      </section>
      <button className="hover:font-bold hover:text-white hover:bg-gray-950 px-2 border-2 rounded-md">
        logout
      </button>
    </div>
  );
}

export default Profile;
