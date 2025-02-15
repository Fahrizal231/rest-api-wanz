const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const cloudscraper = require('cloudscraper');
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt'); // Adjust path as needed
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext'); // Adjust path as needed
const { geminiAi } = require('../ai'); // Adjust path as needed

const router = express.Router();

const FOUNDER = "AHMMI-KUN";
const COMPANY = "Xlicon Botz Inc";

// Helper function to format paragraphs
const formatParagraph = (text) => text ? text.replace(/\.\s+/g, ".\n\n") : "Tidak ada jawaban.";

async function kanyutkanyut(url, method = "GET", payload = null) {
    try {
        const response = method === "POST"
            ? await cloudscraper.post(url, { json: payload })
            : await cloudscraper.get(url);

        return JSON.parse(response);
    } catch (error) {
        console.error(`Cloudscraper ERROR dalam method ${method}:`, error.message);
        return { error: error.message }; // Kembalikan informasi kesalahan dalam format objek
    }
}

// Fungsi-fungsi untuk mengakses API Roblox (dipanggil di dalam handler endpoint)
async function getUserInfo(userId) { return kanyutkanyut(`https://users.roblox.com/v1/users/${userId}`); }
async function getUserGroups(userId) { return kanyutkanyut(`https://groups.roblox.com/v1/users/${userId}/groups/roles`); }
async function getUserBadges(userId) { return kanyutkanyut(`https://badges.roblox.com/v1/users/${userId}/badges`); }
async function getUserGames(userId) { return kanyutkanyut(`https://games.roblox.com/v2/users/${userId}/games`); }
async function getUserAvatar(userId) {
    return kanyutkanyut(
        `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=720x720&format=Png&isCircular=false`
    );
}
async function getUsernameHistory(userId) {
    return kanyutkanyut(`https://users.roblox.com/v1/users/${userId}/username-history`);
}
async function getUserFriends(userId) { return kanyutkanyut(`https://friends.roblox.com/v1/users/${userId}/friends`); }
async function getUserFriendCount(userId) {
    return kanyutkanyut(`https://friends.roblox.com/v1/users/${userId}/friends/count`);
}
async function getUserFollowers(userId) {
    return kanyutkanyut(`https://friends.roblox.com/v1/users/${userId}/followers`);
}
async function getUserFollowing(userId) {
    return kanyutkanyut(`https://friends.roblox.com/v1/users/${userId}/followings`);
}
async function getUserCreatedAssets(userId) {
    return kanyutkanyut(`https://catalog.roblox.com/v1/search/items?CreatorId=${userId}&CreatorType=User`);
}
async function robloxStalk(userId) {
    const results = {
        userInfo: await getUserInfo(userId),
        userGroups: await getUserGroups(userId),
        userBadges: await getUserBadges(userId),
        userGames: await getUserGames(userId),
        userAvatar: await getUserAvatar(userId),
        usernameHistory: await getUsernameHistory(userId),
        userFriends: await getUserFriends(userId),
        userFriendCount: await getUserFriendCount(userId),
        userFollowers: await getUserFollowers(userId),
        userFollowing: await getUserFollowing(userId),
        userCreatedAssets: await getUserCreatedAssets(userId),
    };

    return results;
                            }

// API Endpoints (Adapting from your provided server (5).js and api.js)
// ----------------------------------------------------------------------
// HTML serving routes (if you want to include these in the module)
router.get("/kebijakan", (req, res) => {
    res.sendFile(path.join(__dirname, "kebijakan.html"));
});

router.get("/docs", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

router.get('/daftar', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


router.get('/ai/deepseek-chat', async (req, res) => {
    const query = req.query.content || "halo";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(query)}`);
        console.log('Deepseek Chat request completed.'); // Moved log inside try
        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "Deepseek Chat",
            data: formatParagraph(data?.data)
        });
    } catch (error) {
        console.error("Deepseek Chat error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Deepseek Chat mengalami masalah.",
            error: error.message
        });
    }
});

router.get('/ai/image2text', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/ai/image2text?url=https://cataas.com/cat");
        console.log('Image to Text request completed.');
        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "Image to Text",
            data: formatParagraph(data?.data)
        });
    } catch (error) {
        console.error("Image to Text error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Image to Text mengalami masalah.",
            error: error.message
        });
    }
});

router.get('/ai/gemini-pro', async (req, res) => {
    const query = req.query.content || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`);
        console.log('Gemini Pro AI request completed.');
        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "Gemini Pro AI",
            data: formatParagraph(data?.data)
        });
    } catch (error) {
        console.error("Gemini Pro error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Gemini Pro mengalami masalah.",
            error: error.message
        });
    }
});

router.get('/anime/latest', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/anime/latest");
        console.log('Anime Terbaru request completed.');
        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "Anime Terbaru",
            data: data
        });
    } catch (error) {
        console.error("Anime Terbaru error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Anime Terbaru mengalami masalah.",
            error: error.message
        });
    }
});

function formatResponse(founder, status, message, data = null) {
    return {
        founder: founder,
        company: COMPANY,
        status: status,
        message: message,
        data: data
    };
}

router.get('/stalk/roblox', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json(formatResponse(FOUNDER, false, "ID Pengguna Roblox diperlukan. Parameter 'userId' harus ditambahkan."));
    }

    try {
        const data = await robloxStalk(userId);
        console.log(`Roblox Stalk selesai untuk userId: ${userId}`);
        res.json(formatResponse(FOUNDER, true, "Informasi Roblox Stalk", data));
    } catch (error) {
        console.error("Kesalahan saat melakukan Roblox Stalk:", error);
        res.status(500).json(formatResponse(FOUNDER, false, "Gagal melakukan Roblox Stalk. Coba lagi nanti."));
    }
});

module.exports = router;
