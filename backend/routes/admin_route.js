import express from "express";
import multer from "multer";
import jwt from "jsonwebtoken";

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

router.post("/", (req, res) => {
  const token = req.cookies.token;

  if(!token) {
    return res.json({status: false});
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({status: false});
    } else {
      let collection = await db.collection(process.env.ADMIN_COLLECTION);
      let result = await collection.findOne({_id: ObjectId.createFromHexString(data.id)});

      if (result) {
        return res.json({status: true, user: result.username});
      } else {
        return res.json({status: false});
      }
    }
  })
  
})

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

// get a project by its name
router.get("/getProjectsByName/:name", async(req, res) => {
  let collection = await db.collection(process.env.PROJECTS_COLLECTION);
  let query = {name: req.params.name};
  let result = await collection.findOne(query);
  
  if (!result) {
    res.send({}).status(200);
  } else {
    res.send(result).status(200);
  }
})

// return a list of projects with specific field
router.get("/getProjectsByField/:field", async (req, res) => {
  let collection = await db.collection(process.env.PROJECTS_COLLECTION);
  let query = {field:  req.params.field};
  let result = await collection.find(query).toArray();
 
  if (!result) {
    res.send("Not found").status(404);
  } else {
    res.send(result).status(200);
  }
})

// return a list of experience at a company within a specific timeframe
router.get("/getExpByNameAndTime/:companyName/:startDate_firstDateOfMonth/:startDate_lastDateOfMonth/:endDate_firstDateOfMonth/:endDate_lastDateOfMonth", async (req, res) => {

  let collection = await db.collection(process.env.JOB_EXP);
  let query = {company: req.params.companyName, 
                startDate: {$gte: parseInt(req.params.startDate_firstDateOfMonth), 
                            $lte: parseInt(req.params.startDate_lastDateOfMonth)}, 
                endDate: {$gte: parseInt(req.params.endDate_firstDateOfMonth), 
                          $lte: parseInt(req.params.endDate_lastDateOfMonth)}};

  let result = await collection.find(query).toArray();
  
  if (!result) {
    res.send({}).status(200);
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

// update a project
router.patch("/addProject/:name", async (req, res) => {
  try {
    const query = {name: req.params.name};
    const updates = {
      $set: {
        name: req.body.projectName,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        skills: req.body.skills,
        thumbnail_base64: req.body.thumbnailBase64,
        githubURL: req.body.githubURL,
        field: req.body.field
      }
    };

    let collection = await db.collection(process.env.PROJECTS_COLLECTION);
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating project");
  }

})

// add an experience 
router.post("/addExp",
  async (req, res) => {
    try {
      console.log("Experience POST request")
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

// update job experience
router.patch("/addExp/:companyName/:startDate_firstDateOfMonth/:startDate_lastDateOfMonth/:endDate_firstDateOfMonth/:endDate_lastDateOfMonth",
  async (req, res) => {
    try {
      const query = {company: req.params.companyName,
                    startDate: {$gte: parseInt(req.params.startDate_firstDateOfMonth), 
                                $lte: parseInt(req.params.startDate_lastDateOfMonth)},
                    endDate: {$gte: parseInt(req.params.endDate_firstDateOfMonth), 
                              $lte: parseInt(req.params.endDate_lastDateOfMonth)}
      }
      const updates = {
        $set: {
          jobTitle: req.body.jobTitle,
          jobDesc: req.body.jobDesc
        }
      }

      console.log(query);
      let collection = await db.collection(process.env.JOB_EXP);
      let result = await collection.updateOne(query, updates);
      
      res.send(result).status(200);
    } catch (e) {
      console.error(err);
      res.status(500).send("Error updating job experience");
    }
  }
);

export default router;