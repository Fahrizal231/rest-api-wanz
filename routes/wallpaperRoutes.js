const express = require('express');

// Import crapers

const { konachan } = require('../scrapers/wallpaper/konachanScraper');
const { unsplash } = require('../scrapers/wallpaper/unsplashScraper');


const router = express.Router();


// Route for Konachan search
router.get('/konachan', async (req, res) => {
    const chara = req.query.chara; // character or tag for konachan

    if (!chara) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'chara' is required",
            },
        });
    }

    try {
        const results = await konachan(chara); // Call the konachan scraper
        return res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: results,
            },
        });
    } catch (error) {
        return res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: error.message,
            },
        });
    }
});


// Route for Unsplash search
router.get('/unsplash', async (req, res) => {
    const query = req.query.q; // Get the search query

    if (!query) {
        return res.status(400).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: "Query parameter 'q' is required",
            },
        });
    }

    try {
        const results = await unsplash(query); // Call Unsplash scraper
        return res.json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: true,
                data: results,
            },
        });
    } catch (error) {
        return res.status(500).json({
            Founder: "AHMMI-KUN",
            company: "Xlicon Botz Inc",
            data: {
                status: false,
                message: error.message,
            },
        });
    }
});




module.exports = router;
