const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");
const imageRouter = require('./routes/imageRouter');

const port = 8000;
const app = express();

app.use(cors());
app.use('/images', imageRouter);
app.use((req, res, next) => {
  req.country_code = req.headers['country_code']; 
  next();
});

app.get("/", (req, res) => {
    res.send("hello");
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(bodyParser.json({ limit: 5000000 }));
app.use(routes);
