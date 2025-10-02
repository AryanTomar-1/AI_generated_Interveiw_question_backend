import express from "express";
const router = express.Router();
import { generateQuestions} from "../controllers/questionsController.js";
import { generateCandidateReview } from "../controllers/reviewController.js";

router.get("/ai_genrated", generateQuestions);
router.post("/review", generateCandidateReview);
export default router;