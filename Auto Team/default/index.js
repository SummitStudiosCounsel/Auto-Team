require("dotenv").config;
const express = require("express.js");
const noblox = require("noblox.js");
const app = express();

const groupID = process.env.GROUP_ID;
const cookie = process.env.COOKIE;

app.use(express.json());

app.use(async (req, res, next) => {
    if (!cookie) {
        return res.status(400).json({error: "Cookie no set"})
    }

    await noblox.setCookie(cookie);
    let currentUser = await noblox.getCurrentUser();
    next();
})

app.post("/ranker", async (req, res) => {
    try {
        const { userid, rank } = req.body;
        await noblox.setRank(groupId. parseInt(userid), parseInt(rank));
        res.json({message: "Ranked!"})
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error"})
        }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is up and running on port $(PORT)")
});