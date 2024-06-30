import express from "express";

// This will help us connect to the database
import db from "../connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// returns a list of all projects
router.get("/",  async (req, res) => {
  let collection = await db.collection(process.env.PROJECTS_COLLECTION);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

// add a project
router.post("/addProject", async (req, res) => {
    try {
      let newProject = {
        name: req.body.projectName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: req.body.skills
      };
      let collection = await db.collection(process.env.PROJECTS_COLLECTION);
      let result = await collection.insertOne(newProject);
      res.send(result).status(204);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error adding project");
    }
})

export default router;