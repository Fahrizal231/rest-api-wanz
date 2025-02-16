const express = require('express');
const axios = require('axios');
const cloudscraper = require('cloudscraper'); 
const path = require('path');
const router = express.Router();
const FOUNDER = "wanzofc";
const COMPANY = "wanzofc-tech";
const formatParagraph = (text) => text ? text.replace(/\.\s+/g, ".\n\n") : "Tidak ada jawaban.";
async function kanyutkanyut(url, method = "GET", payload = null) {
    try {
        const response = method === "POST"
            ? await cloudscraper.post(url, { json: payload })
            : await cloudscraper.get(url);

        return JSON.parse(response);
    } catch (error) {
        console.error(`Cloudscraper ERROR dalam method ${method}:`, error.message);
        return { error: error.message };
    }
}
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

router.get('/ai/deepseek-chat', async (req, res) => {
    const query = req.query.content || "halo";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(query)}`);
        console.log('Deepseek Chat request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Deepseek Chat", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Deepseek Chat error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Deepseek Chat bermasalah.", error: error.message });
    }
});

router.get('/ai/image2text', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/ai/image2text?url=https://cataas.com/cat");
        console.log('Image to Text request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Image to Text", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Image to Text error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Image to Text bermasalah.", error: error.message });
    }
});

router.get('/ai/gemini-pro', async (req, res) => {
    const query = req.query.content || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`);
        console.log('Gemini Pro AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Gemini Pro AI", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Gemini Pro error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gemini Pro bermasalah.", error: error.message });
    }
});

router.get('/ai/meta-llama', async (req, res) => {
    const query = req.query.content || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(query)}`);
        console.log('Meta Llama request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Meta Llama", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Meta Llama error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Meta Llama bermasalah.", error: error.message });
    }
});

router.get('/ai/dbrx-instruct', async (req, res) => {
    const query = req.query.content || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/dbrx-instruct?content=${encodeURIComponent(query)}`);
        console.log('DBRX Instruct request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "DBRX Instruct", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("DBRX Instruct error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "DBRX Instruct bermasalah.", error: error.message });
    }
});

router.get('/ai/deepseek-r1', async (req, res) => {
    const query = req.query.content || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(query)}`);
        console.log('Deepseek R1 request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Deepseek R1", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Deepseek R1 error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Deepseek R1 bermasalah.", error: error.message });
    }
});

router.get('/gita', async (req, res) => {
    const query = req.query.q || "hai";
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/gita?q=${encodeURIComponent(query)}`);
        console.log('Gita AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Gita AI", data: formatParagraph(data?.data) });
    } catch (error) {
        console.error("Gita AI error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gita AI bermasalah.", error: error.message });
    }
});

router.get('/anime/latest', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/anime/latest");
        console.log('Anime Terbaru request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Anime Terbaru", data: data });
    } catch (error) {
        console.error("Anime Terbaru error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Anime Terbaru mengalami masalah.", error: error.message });
    }
});

router.get('/anime/anichin-episode', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tolong tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/anime/anichin-episode?url=${encodeURIComponent(url)}`);
        console.log('Anichin Episode request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Anichin Episode", data: data });
    } catch (error) {
        console.error("Anichin Episode error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Anichin Episode bermasalah.", error: error.message });
    }
});

router.get('/d/mediafire', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(url)}`);
        console.log('MediaFire Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "MediaFire Downloader", data: data });
    } catch (error) {
        console.error("MediaFire Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "MediaFire Downloader bermasalah.", error: error.message });
    }
});

router.get('/r/blue-archive', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/r/blue-archive");
        console.log('Random Blue Archive Image request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Random Blue Archive Image", data: data });
    } catch (error) {
        console.error("Random Blue Archive Image error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil gambar Blue Archive.", error: error.message });
    }
});

router.get('/r/quotesanime', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/r/quotesanime");
        console.log('Random Anime Quotes request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Random Anime Quotes", data: data });
    } catch (error) {
        console.error("Random Anime Quotes error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil quote anime.", error: error.message });
    }
});

router.get('/d/tiktok', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tiktok?url=${encodeURIComponent(url)}`);
        console.log('TikTok Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "TikTok Downloader", data: data });
    } catch (error) {
        console.error("TikTok Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "TikTok Downloader bermasalah.", error: error.message });
    }
});

router.get('/d/igdl', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/igdl?url=${encodeURIComponent(url)}`);
        console.log('Instagram Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Instagram Downloader", data: data });
    } catch (error) {
        console.error("Instagram Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Instagram Downloader bermasalah.", error: error.message });
    }
});

router.get('/d/snackvideo', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/snackvideo?url=${encodeURIComponent(url)}`);
        console.log('SnackVideo Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "SnackVideo Downloader", data: data });
    } catch (error) {
        console.error("SnackVideo Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "SnackVideo Downloader bermasalah.", error: error.message });
    }
});

router.get('/d/capcut', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`);
        console.log('CapCut Template Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "CapCut Template Downloader", data: data });
    } catch (error) {
        console.error("CapCut Template Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "CapCut Template Downloader bermasalah.", error: error.message });
    }
});

router.get('/stalk/youtube', async (req, res) => {
    const username = req.query.username;
    if (!username) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'username'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(username)}`);
        console.log('YouTube Stalker request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "YouTube Stalker", data: data });
    } catch (error) {
        console.error("YouTube Stalker error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "YouTube Stalker bermasalah.", error: error.message });
    }
});

router.get('/stalk/tiktok', async (req, res) => {
    const username = req.query.username;
    if (!username) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'username'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(username)}`);
        console.log('TikTok Stalker request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "TikTok Stalker", data: data });
    } catch (error) {
        console.error("TikTok Stalker error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "TikTok Stalker bermasalah.", error: error.message });
    }
});

router.get('/stalk/github', async (req, res) => {
    const user = req.query.user;
    if (!user) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'user'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/stalk/github?user=${encodeURIComponent(user)}`);
        console.log('GitHub Stalker request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "GitHub Stalker", data: data });
    } catch (error) {
        console.error("GitHub Stalker error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "GitHub Stalker bermasalah.", error: error.message });
    }
});

router.get('/s/tiktok', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'query'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/tiktok?query=${encodeURIComponent(query)}`);
        console.log('TikTok Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "TikTok Search", data: data });
    } catch (error) {
        console.error("TikTok Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "TikTok Search bermasalah.", error: error.message });
    }
});

router.get('/ai/uncovr', async (req, res) => {
    const content = req.query.content;
    if (!content) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'content'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/uncovr?content=${encodeURIComponent(content)}`);
        console.log('AI - Uncovr Chat request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "AI - Uncovr Chat", data: data });
    } catch (error) {
        console.error("AI - Uncovr Chat error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "AI - Uncovr Chat bermasalah.", error: error.message });
    }
});

router.get('/ai/wanzofc', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'text'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/yousearch?text=${encodeURIComponent(text)}`);
        console.log('AI - wanzofc request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "AI - wanzofc", data: data });
    } catch (error) {
        console.error("AI - wanzofc error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "AI - wanzofc bermasalah.", error: error.message });
    }
});

router.get('/anime/otakudesu/search', async (req, res) => {
    const s = req.query.s;
    if (!s) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 's'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/anime/otakudesu/search?s=${encodeURIComponent(s)}`);
        console.log('Anime - Otakudesu Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Anime - Otakudesu Search", data: data });
    } catch (error) {
        console.error("Anime - Otakudesu Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Anime - Otakudesu Search bermasalah.", error: error.message });
    }
});

router.get('/d/savefrom', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/savefrom?url=${encodeURIComponent(url)}`);
        console.log('Downloader - SaveFrom request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Downloader - SaveFrom", data: data });
    } catch (error) {
        console.error("Downloader - SaveFrom error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Downloader - SaveFrom bermasalah.", error: error.message });
    }
});

router.get('/d/github', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/github?url=${encodeURIComponent(url)}`);
        console.log('Downloader - GitHub Repository request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Downloader - GitHub Repository", data: data });
    } catch (error) {
        console.error("Downloader - GitHub Repository error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Downloader - GitHub Repository bermasalah.", error: error.message });
    }
});

router.get('/info/jadwaltv', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/info/jadwaltv`);
        console.log('Informasi - Jadwal TV request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Informasi - Jadwal TV", data: data });
    } catch (error) {
        console.error("Informasi - Jadwal TV error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Informasi - Jadwal TV bermasalah.", error: error.message });
    }
});

router.get('/info/liburnasional', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/info/liburnasional`);
        console.log('Informasi - Hari Libur Nasional request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Informasi - Hari Libur Nasional", data: data });
    } catch (error) {
        console.error("Informasi - Hari Libur Nasional error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Informasi - Hari Libur Nasional bermasalah.", error: error.message });
    }
});

router.get('/info/bmkg', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/info/bmkg`);
        console.log('Informasi - BMKG request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Informasi - BMKG", data: data });
    } catch (error) {
        console.error("Informasi - BMKG error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Informasi - BMKG bermasalah.", error: error.message });
    }
});

router.get('/info/cuaca', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/info/cuaca`);
        console.log('Informasi - Cuaca request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Informasi - Cuaca", data: data });
    } catch (error) {
        console.error("Informasi - Cuaca error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Informasi - Cuaca bermasalah.", error: error.message });
    }
});

router.get('/s/gitagram', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/gitagram`);
        console.log('Search - Gitagram request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Search - Gitagram", data: data });
    } catch (error) {
        console.error("Search - Gitagram error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Search - Gitagram bermasalah.", error: error.message });
    }
});

router.get('/s/duckduckgo', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/duckduckgo`);
        console.log('Search - DuckDuckGo request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Search - DuckDuckGo", data: data });
    } catch (error) {
        console.error("Search - DuckDuckGo error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Search - DuckDuckGo bermasalah.", error: error.message });
    }
});

router.get('/s/combot', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/combot`);
        console.log('Search - Combot request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Search - Combot", data: data });
    } catch (error) {
        console.error("Search - Combot error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Search - Combot bermasalah.", error: error.message });
    }
});

router.get('/s/bukalapak', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/bukalapak`);
        console.log('Search - Bukalapak request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Search - Bukalapak", data: data });
    } catch (error) {
        console.error("Search - Bukalapak error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Search - Bukalapak bermasalah.", error: error.message });
    }
});

router.get('/s/brave', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/brave`);
        console.log('Search - Brave request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Search - Brave", data: data });
    } catch (error) {
        console.error("Search - Brave error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Search - Brave bermasalah.", error: error.message });
    }
});

router.get('/berita/kompas', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/kompas`);
        console.log('Berita - Kompas request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Kompas", data: data });
    } catch (error) {
        console.error("Berita - Kompas error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Kompas bermasalah.", error: error.message });
    }
});

router.get('/berita/jkt48', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/jkt48`);
        console.log('Berita - JKT48 request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - JKT48", data: data });
    } catch (error) {
        console.error("Berita - JKT48 error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - JKT48 bermasalah.", error: error.message });
    }
});

router.get('/berita/cnn', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/cnn`);
        console.log('Berita - CNN request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - CNN", data: data });
    } catch (error) {
        console.error("Berita - CNN error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - CNN bermasalah.", error: error.message });
    }
});

router.get('/berita/cnbcindonesia', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/cnbcindonesia`);
        console.log('Berita - CNBC Indonesia request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - CNBC Indonesia", data: data });
    } catch (error) {
        console.error("Berita - CNBC Indonesia error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - CNBC Indonesia bermasalah.", error: error.message });
    }
});

router.get('/berita/antara', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/antara`);
        console.log('Berita - Antara request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Antara", data: data });
    } catch (error) {
        console.error("Berita - Antara error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Antara bermasalah.", error: error.message });
    }
});

router.get('/berita/tribunnews', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/tribunnews`);
        console.log('Berita - Tribunnews request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Tribunnews", data: data });
    } catch (error) {
        console.error("Berita - Tribunnews error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Tribunnews bermasalah.", error: error.message });
    }
});

router.get('/berita/suara', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/suara`);
        console.log('Berita - Suara request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Suara", data: data });
    } catch (error) {
        console.error("Berita - Suara error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Suara bermasalah.", error: error.message });
    }
});

router.get('/berita/merdeka', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/merdeka`);
        console.log('Berita - Merdeka request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Merdeka", data: data });
    } catch (error) {
        console.error("Berita - Merdeka error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Merdeka bermasalah.", error: error.message });
    }
});

router.get('/berita/sindonews', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/sindonews`);
        console.log('Berita - Sindonews request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Sindonews", data: data });
    } catch (error) {
        console.error("Berita - Sindonews error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Sindonews bermasalah.", error: error.message });
    }
});

router.get('/berita/liputan6', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/berita/liputan6`);
        console.log('Berita - Liputan6 request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Berita - Liputan6", data: data });
    } catch (error) {
        console.error("Berita - Liputan6 error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Berita - Liputan6 bermasalah.", error: error.message });
    }
});

router.get('/apk/playstore', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/apk/playstore`);
        console.log('APK - Play Store request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "APK - Play Store", data: data });
    } catch (error) {
        console.error("APK - Play Store error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data dari Play Store.", error: error.message });
    }
});

router.get('/apk/happymod', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/apk/happymod`);
        console.log('APK - HappyMod request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "APK - HappyMod", data: data });
    } catch (error) {
        console.error("APK - HappyMod error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data dari HappyMod.", error: error.message });
    }
});

router.get('/apk/appstore', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/apk/appstore`);
        console.log('APK - App Store request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "APK - App Store", data: data });
    } catch (error) {
        console.error("APK - App Store error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data dari App Store.", error: error.message });
    }
});

router.get('/apk/apkpure', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/apk/apkpure`);
        console.log('APK - APKPure request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "APK - APKPure", data: data });
    } catch (error) {
        console.error("APK - APKPure error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data dari APKPure.", error: error.message });
    }
});

router.get('/apk/apkmody', async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/apk/apkmody`);
        console.log('APK - APKMody request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "APK - APKMody", data: data });
    } catch (error) {
        console.error("APK - APKMody error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data dari APKMody.", error: error.message });
    }
});

router.get('/tools/subdomains', async (req, res) => {
    const domain = req.query.domain;
    if (!domain) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter domain!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/subdomains?domain=${encodeURIComponent(domain)}`);
        console.log('Subdomain Scanner request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: `Subdomain Scanner untuk ${domain}`, data: data });
    } catch (error) {
        console.error("Subdomain Scanner error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan data subdomain.", error: error.message });
    }
});

router.get('/tools/text2base64', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan teks untuk dikonversi!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/text2base64?text=${encodeURIComponent(text)}`);
        console.log('Text to Base64 request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Text to Base64", data: data });
    } catch (error) {
        console.error("Text to Base64 error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengonversi teks ke Base64.", error: error.message });
    }
});

router.get('/tools/text2qr', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan teks untuk dikonversi!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/text2qr?text=${encodeURIComponent(text)}`);
        console.log('Text to QR Code request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Text to QR Code", data: data });
    } catch (error) {
        console.error("Text to QR Code error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengonversi teks ke QR Code.", error: error.message });
    }
});

router.get('/tools/translate', async (req, res) => {
    const text = req.query.text;
    const lang = req.query.lang || "en";
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan teks untuk diterjemahkan!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/translate?text=${encodeURIComponent(text)}&lang=${lang}`);
        console.log('Text Translation request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Text Translation", data: data });
    } catch (error) {
        console.error("Text Translation error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal menerjemahkan teks.", error: error.message });
    }
});

router.get('/ai/lepton', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter text!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/lepton?text=${encodeURIComponent(text)}`);
        console.log('Lepton AI Response request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Lepton AI Response", data: data });
    } catch (error) {
        console.error("Lepton AI Response error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan respons dari Lepton AI.", error: error.message });
    }
});

router.get('/ai/gpt3', async (req, res) => {
    const prompt = req.query.prompt;
    const content = req.query.content;
    if (!prompt || !content) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter prompt dan content!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/gpt3?prompt=${encodeURIComponent(prompt)}&content=${encodeURIComponent(content)}`);
        console.log('GPT-3 AI Response request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "GPT-3 AI Response", data: data });
    } catch (error) {
        console.error("GPT-3 AI Response error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan respons dari GPT-3 AI.", error: error.message });
    }
});

router.get('/r/waifu', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/r/waifu");
        console.log('Random Waifu Image request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Random Waifu Image", data: data });
    } catch (error) {
        console.error("Random Waifu Image error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan waifu random.", error: error.message });
    }
});

router.get('/cf/sentiment', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter text!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/cf/sentiment?text=${encodeURIComponent(text)}`);
        console.log('Sentiment Analysis Result request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Sentiment Analysis Result", data: data });
    } catch (error) {
        console.error("Sentiment Analysis Result error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan hasil analisis sentimen.", error: error.message });
    }
});

router.get('/cf/image-classification', async (req, res) => {
    const imageUrl = req.query.imageUrl;
    if (!imageUrl) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter imageUrl!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/cf/image-classification?imageUrl=${encodeURIComponent(imageUrl)}`);
        console.log('Image Classification Result request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Image Classification Result", data: data });
    } catch (error) {
        console.error("Image Classification Result error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengklasifikasikan gambar.", error: error.message });
    }
});

router.get('/cf/embedding', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter text!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/cf/embedding?text=${encodeURIComponent(text)}`);
        console.log('Text Embedding Result request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Text Embedding Result", data: data });
    } catch (error) {
        console.error("Text Embedding Result error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan embedding teks.", error: error.message });
    }
});

router.get('/cf/chat', async (req, res) => {
    const prompt = req.query.prompt;
    const system = req.query.system;
    if (!prompt || !system) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter prompt dan system!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/cf/chat?prompt=${encodeURIComponent(prompt)}&system=${encodeURIComponent(system)}`);
        console.log('Cloudflare AI Chat Response request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Cloudflare AI Chat Response", data: data });
    } catch (error) {
        console.error("Cloudflare AI Chat Response error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan respons dari chatbot AI.", error: error.message });
    }
});

router.get('/ai/qwen257b', async (req, res) => {
    const prompt = req.query.prompt;
    const text = req.query.text;
    if (!prompt || !text) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter prompt dan text!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/qwen257b?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(text)}`);
        console.log('Qwen 257B AI Response request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Qwen 257B AI Response", data: data });
    } catch (error) {
        console.error("Qwen 257B AI Response error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan respons dari AI Qwen 257B.", error: error.message });
    }
});

router.get('/ai/qwq-32b-preview', async (req, res) => {
    const content = req.query.content;
    if (!content) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter content!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/qwq-32b-preview?content=${encodeURIComponent(content)}`);
        console.log('QWQ 32B AI Response request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "QWQ 32B AI Response", data: data });
    } catch (error) {
        console.error("QWQ 32B AI Response error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan respons dari AI QWQ 32B.", error: error.message });
    }
});

router.get('/s/pinterest', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}`);
        console.log('Hasil pencarian Pinterest request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Hasil pencarian Pinterest", data: data });
    } catch (error) {
        console.error("Hasil pencarian Pinterest error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan hasil dari Pinterest.", error: error.message });
    }
});

router.get('/s/soundcloud', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/soundcloud?query=${encodeURIComponent(query)}`);
        console.log('Hasil pencarian SoundCloud request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Hasil pencarian SoundCloud", data: data });
    } catch (error) {
        console.error("Hasil pencarian SoundCloud error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan hasil dari SoundCloud.", error: error.message });
    }
});

router.get('/stalk/npm', async (req, res) => {
    const packageName = req.query.packageName;
    if (!packageName) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter packageName!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/stalk/npm?packageName=${encodeURIComponent(packageName)}`);
        console.log('Informasi NPM Package request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Informasi NPM Package", data: data });
    } catch (error) {
        console.error("Informasi NPM Package error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan informasi dari NPM.", error: error.message });
    }
});

router.get('/ai/stabilityai', async (req, res) => {
    const prompt = req.query.prompt;
    if (!prompt) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter prompt!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/stabilityai?prompt=${encodeURIComponent(prompt)}`);
        console.log('Gambar dari Stability AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Gambar dari Stability AI", data: data });
    } catch (error) {
        console.error("Gambar dari Stability AI error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendapatkan gambar dari Stability AI.", error: error.message });
    }
});

router.get('/s/wikipedia', async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/wikipedia?query=${encodeURIComponent(query)}`);
        console.log('Wikipedia Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Wikipedia Search", data: data });
    } catch (error) {
        console.error("Wikipedia Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Wikipedia.", error: error.message });
    }
});

router.get('/s/spotify', async (req, res) => {
     const query = req.query.query;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });
    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/s/spotify?query=${encodeURIComponent(query)}`);
         console.log('Spotify Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Spotify Search", data: data });
    } catch (error) {
        console.error("Spotify Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Spotify.", error: error.message });
    }
});

router.get('/tools/fake-data', async (req, res) => {
    try {
        const type = req.query.type || "person";
        const count = req.query.count || 5;

        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/fake-data?type=${type}&count=${count}`);
         console.log('Fake Data request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Fake Data", data: data });
    } catch (error) {
        console.error("Fake Data error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil fake data.", error: error.message });
    }
});

router.get('/primbon/cek_potensi_penyakit', async (req, res) => {
    try {
        const { tgl, bln, thn } = req.query;
        if (!tgl || !bln || !thn) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter tgl, bln, dan thn!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/cek_potensi_penyakit?tgl=${tgl}&bln=${bln}&thn=${thn}`);
        console.log('Primbon Penyakit request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Primbon Penyakit", data: data });
    } catch (error) {
         console.error("Primbon Penyakit error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Primbon Penyakit.", error: error.message });
    }
});

router.get('/primbon/ramalanjodoh', async (req, res) => {
    try {
        const { nama1, tgl1, bln1, thn1, nama2, tgl2, bln2, thn2 } = req.query;
        if (!nama1 || !tgl1 || !bln1 || !thn1 || !nama2 || !tgl2 || !bln2 || !thn2)
             return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan semua parameter yang diperlukan!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/ramalanjodoh?nama1=${encodeURIComponent(nama1)}&tgl1=${tgl1}&bln1=${bln1}&thn1=${thn1}&nama2=${encodeURIComponent(nama2)}&tgl2=${tgl2}&bln2=${bln2}&thn2=${thn2}`);
          console.log('Ramalan Jodoh request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Ramalan Jodoh", data: data });
    } catch (error) {
        console.error("Ramalan Jodoh error:", error);
          res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Ramalan Jodoh.", error: error.message });
    }
});

router.get('/primbon/rejeki_hoki_weton', async (req, res) => {
    try {
        const { tgl, bln, thn } = req.query;
        if (!tgl || !bln || !thn)  return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter tgl, bln, dan thn!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/rejeki_hoki_weton?tgl=${tgl}&bln=${bln}&thn=${thn}`);
         console.log('Rejeki Weton request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Rejeki Weton", data: data });
    } catch (error) {
         console.error("Rejeki Weton error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Rejeki Weton.", error: error.message });
    }
});

router.get('/primbon/sifat_usaha_bisnis', async (req, res) => {
    try {
        const { tgl, bln, thn } = req.query;
        if (!tgl || !bln || !thn) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter tgl, bln, dan thn!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/sifat_usaha_bisnis?tgl=${tgl}&bln=${bln}&thn=${thn}`);
        console.log('Sifat Usaha request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Sifat Usaha", data: data });
    } catch (error) {
        console.error("Sifat Usaha error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Sifat Usaha.", error: error.message });
    }
});

router.get('/primbon/tafsirmimpi', async (req, res) => {
    try {
        const mimpi = req.query.mimpi;
        if (!mimpi) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter mimpi!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/tafsirmimpi?mimpi=${encodeURIComponent(mimpi)}`);
        console.log('Tafsir Mimpi request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Tafsir Mimpi", data: data });
    } catch (error) {
        console.error("Tafsir Mimpi error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Tafsir Mimpi.", error: error.message });
    }
});

router.get('/primbon/artinama', async (req, res) => {
    try {
        const nama = req.query.nama;
        if (!nama) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter nama!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/artinama?nama=${encodeURIComponent(nama)}`);
        console.log('Arti Nama request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Arti Nama", data: data });
    } catch (error) {
        console.error("Arti Nama error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Arti Nama.", error: error.message });
    }
});

router.get('/primbon/kecocokan_nama_pasangan', async (req, res) => {
    try {
        const { nama1, nama2 } = req.query;
        if (!nama1 || !nama2) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter nama1 dan nama2!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/kecocokan_nama_pasangan?nama1=${encodeURIComponent(nama1)}&nama2=${encodeURIComponent(nama2)}`);
        console.log('Kecocokan Nama Pasangan request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Kecocokan Nama Pasangan", data: data });
    } catch (error) {
        console.error("Kecocokan Nama Pasangan error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Kecocokan Nama Pasangan.", error: error.message });
    }
});

router.get('/primbon/nomorhoki', async (req, res) => {
    try {
        const phoneNumber = req.query.phoneNumber;
        if (!phoneNumber) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter phoneNumber!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/nomorhoki?phoneNumber=${phoneNumber}`);
        console.log('Nomor Hoki request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Nomor Hoki", data: data });
    } catch (error) {
        console.error("Nomor Hoki error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Nomor Hoki.", error: error.message });
    }
});

router.get('/primbon/zodiak', async (req, res) => {
    try {
        const zodiak = req.query.zodiak;
        if (!zodiak) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter zodiak!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/primbon/zodiak?zodiak=${encodeURIComponent(zodiak)}`);
        console.log('Zodiak request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Zodiak", data: data });
    } catch (error) {
        console.error("Zodiak error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Zodiak.", error: error.message });
    }
});

router.get('/ai/metaai', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/metaai?query=${encodeURIComponent(query)}`);
        console.log('Meta AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Meta AI", data: data });
    } catch (error) {
        console.error("Meta AI error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Meta AI.", error: error.message });
    }
});

router.get('/ai/ustadz', async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter query!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/muslimai?query=${encodeURIComponent(query)}`);
        console.log('USTADZ AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "USTADZ AI", data: data });
    } catch (error) {
        console.error("USTADZ AI error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data USTADZ AI.", error: error.message });
    }
});

router.get('/ai/khodam', async (req, res) => {
    try {
        const content = req.query.content;
        if (!content) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter content!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/dukun?content=${encodeURIComponent(content)}`);
        console.log('Khodam AI request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Khodam AI", data: data });
    } catch (error) {
        console.error("Khodam AI error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data Khodam AI.", error: error.message });
    }
});

router.get('/ai/wanzofc-you', async (req, res) => {
    try {
        const q = req.query.q;
        if (!q) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter q!" });
        const { data } = await axios.get(`https://api.neoxr.eu/api/you?q=${encodeURIComponent(q)}&apikey=PJaLJu`);
        console.log('wanzofc You request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "wanzofc You", data: data });
    } catch (error) {
        console.error("wanzofc You error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari wanzofc You.", error: error.message });
    }
});

router.get('/ai/wanzofc-llama', async (req, res) => {
    try {
        const q = req.query.q;
        if (!q) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter q!" });
        const { data } = await axios.get(`https://api.neoxr.eu/api/llama?q=${encodeURIComponent(q)}&apikey=PJaLJu`);
        console.log('wanzofc Llama request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "wanzofc Llama", data: data });
    } catch (error) {
        console.error("wanzofc Llama error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari wanzofc Llama.", error: error.message });
    }
});

router.get('/ai/meta-llama', async (req, res) => {
    try {
        const content = req.query.content;
        if (!content) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter content!" });

        const { data } = await axios.get(`https://api.siputzx.my.id/api/ai/meta-llama-33-70B-instruct-turbo?content=${encodeURIComponent(content)}`);
        console.log('Meta LLaMA request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Meta LLaMA", data: data });
    } catch (error) {
        console.error("Meta LLaMA error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari Meta LLaMA.", error: error.message });
    }
});

router.get('/search/xnxx', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter q!" });

        const { data } = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/xnxx?q=${encodeURIComponent(query)}`);
        console.log('XNXX Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "XNXX Search", data: data });
    } catch (error) {
        console.error("XNXX Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari XNXX.", error: error.message });
    }
});

router.get('/r/cecan/china', async (req, res) => {
    try {
        const { data } = await axios.get("https://api.siputzx.my.id/api/r/cecan/china");
        console.log('Random Chinese Cecan Image request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Random Chinese Cecan Image", data: data });
    } catch (error) {
        console.error("Random Chinese Cecan Image error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil gambar Cecan China.", error: error.message });
    }
});

router.get('/d/spotify', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'url'." });

    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/d/spotify?url=${encodeURIComponent(url)}`);
        console.log('Spotify Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Spotify Downloader", data: data });
    } catch (error) {
        console.error("Spotify Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Spotify Downloader bermasalah.", error: error.message });
    }
});

router.get('/tools/ngl', async (req, res) => {
    const link = req.query.link;
    const text = req.query.text;

    if (!link || !text) {
        return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Tambahkan parameter 'link' dan 'text'." });
    }

    try {
        const { data } = await axios.get(`https://api.siputzx.my.id/api/tools/ngl?link=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
        console.log('NGL Tool request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "NGL Tool", data: data });
    } catch (error) {
        console.error("NGL Tool bermasalah.", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "NGL Tool bermasalah.", error: error.message });
    }
});

router.get('/api/e/dana', async (req, res) => {
    try {
        const response = await axios.get('https://apis.xyrezz.online-server.biz.id/api/okeconnect/dana');
        const data = response.data;
        console.log('Permintaan ke API Dana selesai.');
        res.json({ 
            founder: FOUNDER, 
            company: COMPANY, 
            status: true, 
            message: "Data dari API Dana berhasil diambil.", 
            data: data 
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat memanggil API Dana:", error);
        res.status(500).json({ 
            founder: FOUNDER, 
            company: COMPANY, 
            status: false, 
            message: "Terjadi kesalahan server saat memanggil API Dana: " + error.message,
            error: error.message
        });
    }
});

router.get('/s/reddit', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter q!" });

    try {
        const { data } = await axios.get(`https://www.reddit.com/search.json?q=${encodeURIComponent(query)}`);
        console.log('Reddit Search request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Hasil pencarian Reddit", data: data });
    } catch (error) {
        console.error("Reddit Search error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari Reddit.", error: error.message });
    }
});

router.get('/stalk/reddit', async (req, res) => {
    const username = req.query.username;
    if (!username) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter username!" });

    try {
        const { data } = await axios.get(`https://www.reddit.com/user/${encodeURIComponent(username)}/submitted.json`);
        console.log('Reddit User Stalk request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Reddit User Stalk", data: data });
    } catch (error) {
        console.error("Reddit User Stalk error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mengambil data dari Reddit User.", error: error.message });
    }
});

router.get('/d/reddit', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Harap masukkan parameter url!" });

    try {
        const { data } = await axios.get(`${url}.json`);
        console.log('Reddit Downloader request completed.');
        res.json({ founder: FOUNDER, company: COMPANY, status: true, message: "Reddit Downloader", data: data });
    } catch (error) {
        console.error("Reddit Downloader error:", error);
        res.status(500).json({ founder: FOUNDER, company: COMPANY, status: false, message: "Gagal mendownload data dari Reddit.", error: error.message });
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

router.get('/api/orkut/cekstatus', async (req, res) => {
    const { merchant, keyorkut } = req.query;

    if (!merchant || !keyorkut) {
        return res.status(400).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Parameter 'merchant' dan 'keyorkut' diperlukan.",
        });
    }

    try {
        const { data } = await axios.get(`https://api.skyzopedia.us.kg/api/orkut/cekstatus?merchant=${encodeURIComponent(merchant)}&keyorkut=${encodeURIComponent(keyorkut)}`);
        console.log('Cek Status Orkut request completed.');

        // Adaptasi Data (penting!):  Pastikan data dari Skyzopedia sesuai format kita.
        // Ini HANYA contoh, Sesuaikan berdasarkan struktur respons API Skyzopedia.
        const adaptedData = {
            status: data.status,  // Asumsikan respons Skyzopedia punya properti 'status'
            message: data.message, // Asumsikan respons Skyzopedia punya properti 'message'
            result: data.result   // Asumsikan respons Skyzopedia punya properti 'result'
        };

        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "Cek Status Orkut",
            data: adaptedData // Menggunakan data yang sudah diadaptasi
        });
    } catch (error) {
        console.error("Cek Status Orkut error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Gagal mengambil data api.",
            error: error.message, // Tambahkan detail kesalahan
        });
    }
});

router.get('/api/lookup-phone', async (req, res) => {
    const { number, country_code } = req.query;

    if (!number) {
        return res.status(400).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Parameter 'number' diperlukan.",
        });
    }

    const access_key = "d342db1c7f999d9d01d5483792c504c3"; // Simpan API key di environment variable!

    let url = `http://apilayer.net/api/validate?access_key=${access_key}&number=${encodeURIComponent(number)}&format=2`;

    if (country_code) {
        url += `&country_code=${encodeURIComponent(country_code)}`;
    }

    try {
        const { data } = await axios.get(url);
        console.log('lookup Phone request completed.');

        // Adaptasi Data (penting!): Sesuaikan dengan respons dari apilayer.net
        const adaptedData = {
            valid: data.valid,
            number: data.number,
            local_format: data.local_format,
            international_format: data.international_format,
            country_code: data.country_code,
            country_name: data.country_name,
            location: data.location,
            carrier: data.carrier
        };

        res.json({
            founder: FOUNDER,
            company: COMPANY,
            status: true,
            message: "lookup Nomor Telepon",
            data: adaptedData
        });
    } catch (error) {
        console.error("lookup Phone error:", error);
        res.status(500).json({
            founder: FOUNDER,
            company: COMPANY,
            status: false,
            message: "Gagal lookup nomor telepon.",
            error: error.message,
        });
    }
});

module.exports = router;
