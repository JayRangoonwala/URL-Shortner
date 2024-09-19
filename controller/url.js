import shortid from "shortid";
import { URL } from "../models/url.js";
import express from "express";

export async function handleGenerateNewShortUrl(req, res) {

    const body = req.body;

    if(!body.url) return res.status(400).json({error:"url is not Given"});
    
    const shortID = shortid.generate(8);    

    await URL.create({
        shortid : shortID,
        redirecturl : body.url,
        visited: []
    })

    return res.json({id : shortID});
}

export async function handleGetUrl(req, res) {
    const shortId = req.params.shortId;
    
    const entry = await URL.findOneAndUpdate({
        shortid:shortId
    },{
        $push :{
            visited: {
                timestamp: Date.now()
            }
        }
    })
    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirecturl);
}