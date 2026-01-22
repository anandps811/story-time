import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  lesson: { type: String, required: true }, // The big lesson from STEP 3
  theme: { type: String, required: false }, // Theme from STEP 1: FAIRY TALE, SPACE, ADVENTURE, SPOOKY
  length: { type: String, required: false }, // Length from STEP 2: QUICK, NORMAL, LONG
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
