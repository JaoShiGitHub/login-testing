function RegisterPage() {
  const items_center = "flex flex-col items-center";
  const FormLabel = (props) => {
    return (
      <label>
        <input
          type={props.type}
          placeholder={props.placeholder}
          className="border rounded-md p-2 mb-4"
        />
        {props.children}
      </label>
    );
  };
  return (
    <div className={`${items_center} h-screen`}>
      <h1 className="font-bold text-4xl mb-10">Register</h1>
      <form className={items_center}>
        <FormLabel type="text" placeholder="Username" />
        <FormLabel type="email" placeholder="Email" />
        <FormLabel type="password" placeholder="Password" />
        <FormLabel type="text" placeholder="Status" />

        <button className="bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
