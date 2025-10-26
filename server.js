const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // 可選：放前端

// 讀取帳號資料
app.get("/api/accounts", (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, "data", "accounts.json"), "utf8");
  res.json(JSON.parse(data));
});

// 匯入帳號資料
app.post("/api/accounts", (req, res) => {
  const newData = req.body;
  fs.writeFileSync(path.join(__dirname, "data", "accounts.json"), JSON.stringify(newData, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
