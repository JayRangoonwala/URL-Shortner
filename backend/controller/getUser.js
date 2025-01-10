export const getUser = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ error: "Unauthorized user!" });
    }
    console.log("User:", user.username);
    res.status(200).json({ username: user.username });
};