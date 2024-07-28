import express from "express";
import multer from "multer";

// This will help us connect to the database
import db from "../connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer(
  {
    storage: storage,
    limits: {
      fileSize: 16 * 1024 * 1024
    }
  }
)

// returns a list of all projects
router.get("/getProjects",  async (req, res) => {
  let collection = await db.collection(process.env.PROJECTS_COLLECTION);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

// return a list of all experiences
router.get("/getExp", async (req, res) => {
  let collection = await db.collection(process.env.JOB_EXP);
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
})

// return a list of projects with specific field
router.get("/getProjects/:field", async (req, res) => {
  let collection = await db.collection(process.env.PROJECTS_COLLECTION);
  let query = {field:  req.params.field};
  let result = await collection.find(query).toArray();
 
  if (!result) {
    res.send("Not found").status(404);
  } else {
    res.send(result).status(200);
  }
})

// add a project
router.post("/addProject", 
  upload.single("image"), 
  async (req, res) => {
    try {
      let newProject = {
        name: req.body.projectName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: req.body.skills,
        thumbnail_base64: req.body.thumbnailBase64,
        githubURL: req.body.githubURL,
        field: req.body.field
      };
      let collection = await db.collection(process.env.PROJECTS_COLLECTION);
      let result = await collection.insertOne(newProject);
      // console.log("added successfully!");
      res.send(result).status(204);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error adding project");
    }
})

// add an experience 
router.post("/addExp",
  async (req, res) => {
    try {
      let newExp = {
        jobTitle: req.body.jobTitle,
        jobDesc: req.body.jobDesc,
        company: req.body.company,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      }
      let collection = await db.collection(process.env.JOB_EXP);
      let result = await collection.insertOne(newExp);
      res.send(result).status(204);
    } catch (e) {
      console.error(e);
      res.status(500).send("Error adding project");
    }
  }
)

export default router;