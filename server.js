//Install express server
const express = require("express");
const rateLimit = require('express-rate-limit')

const path = require("path");

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + "/dist/almox"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/almox/index.html"));
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// Start the app by listening on the default port
app.listen(process.env.PORT || 8080);
