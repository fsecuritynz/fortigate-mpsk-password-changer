const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const https = require("https");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==== CONFIG ====
const FORTIGATE_URL = "https://<HOSTNAME_or_IP>/api/v2/cmdb/wireless-controller/mpsk-profile/<MPSK_ID>";
const API_TOKEN = "<YOUR_API_KEY>";
// =================

const agent = new https.Agent({ rejectUnauthorized: false }); // ignore self-signed certs (lab/test only)

// GET rooms list
app.get("/get_rooms", async (req, res) => {
    try {
        const getResp = await fetch(`${FORTIGATE_URL}?vdom=root&with_meta=true`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${API_TOKEN}` },
            agent
        });
        const profile = await getResp.json();
        const groups = profile.results?.[0]?.["mpsk-group"] || [];
        res.json(groups);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
});

// POST update password
app.post("/update_mpsk", async (req, res) => {
    const { roomName, password } = req.body;

    if (!roomName || !password || password.length < 8) {
        return res.status(400).json({ error: "Invalid input (password must be at least 8 characters)" });
    }

    try {
        // GET current profile
        const getResp = await fetch(`${FORTIGATE_URL}?vdom=root&with_meta=true`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${API_TOKEN}` },
            agent
        });
        const profile = await getResp.json();
        const profileObj = profile.results?.[0];
        if (!profileObj) return res.status(500).json({ error: "MPSK profile not found" });

        const group = profileObj["mpsk-group"].find(g => g.name === roomName);
        if (!group) return res.status(404).json({ error: "Room not found in MPSK profile" });

        // Update password
        console.log("Old password:", group["mpsk-key"][0].passphrase);
        group["mpsk-key"][0].passphrase = password;
        console.log("New password:", group["mpsk-key"][0].passphrase);

        // Include vdom in payload and PUT
        const payload = { ...profileObj, vdom: "root" };
        const putResp = await fetch(`${FORTIGATE_URL}?plain-text-password=true`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
            agent
        });

        const resultText = await putResp.text();
        console.log("PUT response:", resultText);

        res.json({ status: "success", room: roomName, putResponse: resultText });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(3000, () => console.log("WebUI running on http://localhost:3000"));
