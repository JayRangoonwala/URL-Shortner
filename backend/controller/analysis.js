import { URL } from "../models/url.js";

export const handleAnalysis = async(req, res) => {
    const user = req.user;

    const userData = await URL.find({createdby : user.id})

    return res.status(200).json({data : userData})
}