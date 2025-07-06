function LoginPage() {
  const items_center = "flex flex-col items-center";
  const input_style = "border rounded-md p-2 mb-4";
  return (
    <div className={`${items_center} justify-center h-screen`}>
      <h1 className="font-bold text-4xl mb-10">Login User</h1>
      <form className={`${items_center} gap-y-2`}>
        <div className="form-group">
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              className={input_style}
              name="username"
              placeholder="Username or email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              className={input_style}
              name="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
