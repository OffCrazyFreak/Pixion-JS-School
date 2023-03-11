var express = require("express");
var router = express.Router();

const Robot = require("../models/Robot");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// parse path params
// router.get("/:id", function (req, res, next) {
//   res.json(req.params);
// });
// parse query params
// router.post("/", function (req, res, next) {
//   res.json(req.query);
// });
// parse body
// router.put("/", function (req, res, next) {
//   res.json(req.body);
// });

router.get("/robots", async function (req, res, next) {
  // return either name or empty string if no name is present in query (req.query.name ? req.query.name : "")
  // res.json({ type: "Robot", name: req.query.name ?? "" });

  let robots;
  try {
    if (!req.query.name) {
      robots = await Robot.find();
    } else {
      robots = await Robot.find({
        name: { $regex: new RegExp(req.query.name, "i") },
      });
    }
  } catch (error) {
    console.error(error);
  }

  robots && robots.length > 0 ? res.json(robots) : res.sendStatus(404);
});

router.get("/robots/:id", async function (req, res, next) {
  let robot;
  try {
    robot = await Robot.find({ _id: req.params.id });
  } catch (error) {
    console.error(error);
  }

  robot && robot.length > 0 ? res.json(robot) : res.sendStatus(404);
});

router.post("/robots", async (req, res, next) => {
  const newRobot = new Robot({ name: req.body.name });

  let nr;
  try {
    nr = await newRobot.save();
  } catch (error) {
    console.error(error);
  }
  res.json(nr);
});

module.exports = router;
