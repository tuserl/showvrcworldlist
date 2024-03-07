const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/world/:worldId', async (req, res) => {
    const { worldId } = req.params;
    const apiUrl = `https://api.vrchat.cloud/api/1/worlds/${worldId}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'YourAppName/1.0.0 (your@email.com)',
            },
        });
        res.json(response.data);
        //const { name, imageUrl, previewYoutubeId } = response.data;
        //const worldInfo = {
        //    name,
        //    imageUrl,
        //    previewYoutubeId,
        //};
        //res.json(worldInfo);
    } catch (error) {
        console.error(`Error fetching data for World ID ${worldId}:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
