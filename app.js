const express = require("express")
const fs = require("fs")

const app = express()
const PORT = 5000;

app.set("view engine", "ejs")

// chatgpt file handler code.
app.use((req, res, next) => {
    fs.readFile('store.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading store.json:', err);
        next(err); // Pass the error to the error-handling middleware
        return;
      }
  
      try {
        req.storeData = JSON.parse(data); // Store the parsed data in the request object
        next(); // Move to the next middleware
      } catch (err) {
        console.error('Error parsing store.json:', err);
        next(err); // Pass the error to the error-handling middleware
      }
    });
  });

app.get("/", (req, res) => {
    res.send("This is supposed to be the homepage. Please visit locahost:5000/ddmmyy. For example, locahost:5000/141023")
})

app.get("/:date", (req, res) => {
    if (req.storeData != undefined) {
        res.render('index.ejs', { text: req.storeData[req.params.date]["text"],
                                  title: req.storeData[req.params.date]["title"],
                                  mood: req.storeData[req.params.date]["mood"],
                                date: req.storeData[req.params.date]["ddmmyy"],
                              weather: req.storeData[req.params.date]["weather"],
                            outfit: req.storeData[req.params.date]["outfit"]})
        res.send("Send you to some cool page with dynamically rendered content." + req.storeData[req.params.date]["text"])
    } else {
        res.send("apparently, undefined??")
    }
})

app.listen(PORT, () => {
    console.log("Listening on https://localhost:" + PORT)
})