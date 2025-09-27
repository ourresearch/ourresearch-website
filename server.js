const express = require('express');
const app = express();

// Let Express trust Heroku's proxy headers (important for HTTPS detection)
app.enable('trust proxy');

// Optional but recommended: force HTTPS
app.use((req, res, next) => {
  if (req.get('x-forwarded-proto') === 'http') {
    return res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
  }
  next();
});

// Redirect all ourresearch.org traffic to openalex.org
app.use((req, res) => {
  const host = req.hostname?.toLowerCase();
  if (host === 'ourresearch.org' || host === 'www.ourresearch.org') {
    return res.redirect(301, `https://openalex.org${req.originalUrl}`);
  }
  // If some other hostname sneaks through, just return 404
  res.status(404).send('Not Found');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Redirector listening on port ${port}`);
});