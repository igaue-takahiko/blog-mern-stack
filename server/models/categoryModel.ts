import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "カテゴリを追加してください"],
      trim: true,
      unique: true,
      maxLength: [50, "名前の長さは最大50文字です。"],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Category", categorySchema)
