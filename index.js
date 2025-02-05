const express = require('express');
const PuppeteerFull = require('./PuppeteerFull'); // Import your function

const app = express();
const PORT = 3000; // Change as needed

// API Route: Fetch Instagram page title
app.get('/instagram/:username', async (req, res) => {
    const { username } = req.params;
    
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const result = await PuppeteerFull(username);
        res.send(result);
    } catch (error) {
        console.error("Error in Puppeteer:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});