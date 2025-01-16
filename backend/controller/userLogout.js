export const handleLogout = (req, res) => {
    res.clearCookie('uid');
    return res.status(200).json({message:"Log Out SuccessFully !!!"});
}