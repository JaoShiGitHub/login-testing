# Login Testing
A project for testing full-stack development.
### What I've practiced
  * State management
  * API handling with Axios
  * Express routing
  * CRUD (Create, Read, Update, Delete)
  * Authentication & protected routes
  * Image Handling (Base64)

## Note

  ### bcrypt
   * **`bcrypt.genSalt`**:
     Creates random string
     
   * **`bcrypt.hash`**:
     The random string is used to hash user.password securely. It is used to hash the password. You never get the original password back — only compare hashes.
     
  ### Hashing vs Encryption
   * Hashing = one-way (you can’t undo it)
   * Encryption = two-way (you can decrypt)

  ### JWT with Cookies
   * The JWT token is stored in an HTTP-only cookie on the client side (browser).
   * When the React app makes a request to the backend, the cookie is automatically sent with the request.
   * The backend verifies the token in the cookie before responding.
     
   * This gives you better security than storing the JWT in localStorage or sessionStorage.

### Without withCredentials
   * Your browser will not send cookies to the backend, so the backend will think you're not logged in, even if the cookie is stored in the browser.

## Errors
   ### Payload Too Large (413)
   * **`Profile.jsx:65  PUT http://localhost:4000/edit?id=18 net::ERR_FAILED 413 (Payload Too Large)`**:
     Means your backend rejects the request because the size of the request body is bigger than the server allows. This usually happens if you upload files or large JSON bodies, and the server has limits.
     To fix this: Increase backend payload size limit.
     For example:
     `app.use(express.json({ limit: '10mb' }));`
## FAQ

  ### input losing focus
   * Want to make a small component for similar input tags in a file, but it doesn’t work, and whenever you type on each input, the input out of focus.
   * That's because you defined the component inside another component (which contains your form), and it gets re-created on every render, causing side effects like the input losing focus.
   * To solve the issue: Move your custom components outside the main component. (Example: `src/pages/RegisterPage.jsx`)

## LEARN MORE
  ### Articles
  * Deployment: [`Deploy a Postgres, Express, React and Nodejs Fullstack App on Heroku and Netlify`](https://levelup.gitconnected.com/deploy-pern-fullstack-app-on-heroku-and-netlify-automatic-deploy-9b61ac6a254e)
