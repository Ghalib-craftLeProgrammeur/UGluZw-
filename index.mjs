// server.mjs
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

const urls = [
  "https://ot-streaming.onrender.com/",
  "https://ot-streaming.onrender.com/getAnimeDetails?name=Naruto",
];
const pingSuccess = "ping success";
const method = "GET";
const toStr = "toString";
const consoleError = "error in pingService";
const appType = "application/json";
const pingInterval = 10000; // 10 seconds interval

function pingService(url, message) {
  return fetch(url, {
    method: method,
    headers: {
      Accept: appType,
      "Content-Type": appType,
    },
  })
    .then((response) => response[toStr]())
    .then((data) => {
      console.log(message);
    })
    .catch((error) => {
      console.error(consoleError, error);
    });
}

app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
  pingService(urls[0], pingSuccess);
});

app.get("/ping", (req, res) => {
  pingService(urls[0], pingSuccess);
  res.send("Ping request sent.");
});

app.get("/ping-details", (req, res) => {
  pingService(urls[1], pingSuccess);
  res.send("Ping request for details sent.");
});

app.get("/ping-render", (req, res) => {
  res.send(`
    <iframe src="${urls[0]}" width="100%" height="500"></iframe>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Start the pinging loop
  setInterval(function () {
    pingService(urls[0], pingSuccess);
  }, pingInterval);
});
