import express from "express";

const router = express.Router();

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentsController.js";

router.route("/").post(createComment);
router.route("/").get(getComments);
router.route("/:id").delete(deleteComment).patch(updateComment);

export default router;
