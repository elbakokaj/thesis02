const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/find_all", async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/find_all_students", async (req, res) => {
    try {
        const users = await Users.find({ "role": "student" });
        console.log('req', req)
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
