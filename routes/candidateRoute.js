import express from "express";
const router = express.Router();
import { getAllCandidates,getCandidateUsingEmail,search} from "../controllers/candidateController.js";


router.get("/all", getAllCandidates);
router.get("/:email", getCandidateUsingEmail);
router.get("/search/:query", search);
export default router;