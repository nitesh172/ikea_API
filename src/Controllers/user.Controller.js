const { Router } = require("express");

const User = require("../Models/user.model");

const router = Router();

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
})

router.get("", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
});


router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec();
        return res.status(201).send(user);

    } catch (err) {
        return res.status(500).send({ error: err.message })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send({error: err.message})
    }
});

module.exports = router;