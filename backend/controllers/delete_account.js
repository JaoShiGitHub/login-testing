const delete_account = async (req, res) => {
  const { id } = req.query;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.json({ error: "Something went wrong" });
  }
};

export default delete_account;
