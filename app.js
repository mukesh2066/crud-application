const express = require('express');
const mongoose = require('mongoose');
const crud = require('./model');
const cors = require('cors');
const { name } = require('ejs');

const app = express();

app.use(express.json());
app.use(cors());
app.set('view engine','ejs')

mongoose.connect('mongodb://localhost:27017/info', { useNewUrlParser: true, useUnifiedTopology: true });

const PORT = 5500;

app.post("/post", async (req, res) => {
  const { name, age, city } = req.body;
  
  if (!name || !age || !city) {
    return res.json({ message: "Name, age, and city are required" });
  }
  
  try {
    const newuser = new crud({ name, age, city });
    await newuser.save();
    res.json({ message: "Data Saved Successfully" });
  } catch (error) {
    console.error("POST /post error:", error);
    res.status(500).json({ message: "Failed to save user", error: error.message });
  }
});


app.get("/get", async (req, res) => {
  try {
    const users = await crud.find();
    res.send(users);
  } catch (error) {
    console.error("GET /get error:", error);
    res.status(500).json({ message: "Failed to retrieve users", error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age , city } = req.body;
  try {
    await crud.findByIdAndUpdate(id,{ name, age , city });
    res.json({ message: "Successfully updated" });
  } catch (error) {
    console.error("PUT /update/:id error:", error);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await crud.findByIdAndDelete(id);
    res.json({ message: "Successfully Deleted" });
  } catch (error) {
    console.error("DELETE /delete/:id error:", error);
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});