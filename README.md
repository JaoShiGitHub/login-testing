# Login Testing

## Note

  ### bcrypt
   * `bcrypt.genSalt` = creates random string
     
   * `bcrypt.hash` = the random string is used to hash user.password securely   
   * It is used to hash the password. You never get the original password back — only compare hashes.
     
  ### Hashing vs Encryption
   * Hashing = one-way (you can’t undo it)
   * Encryption = two-way (you can decrypt)

  ### JWT with Cookies
   * The JWT token is stored in an HTTP-only cookie on the client side (browser).
   * When the React app makes a request to the backend, the cookie is automatically sent with the request.
   * The backend verifies the token in the cookie before responding.
     
   * This gives you better security than storing the JWT in localStorage or sessionStorage.
