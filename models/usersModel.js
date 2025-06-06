const { mongoose } = require("../data/mongooseConnection");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    githubId: { type: String, unique: true, sparse: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, required: true, minlength: 8 },
    role: {
      default: "attendant",
      type: String,
      required: true,
      enum: ["admin", "editor", "attendant"],
    },
    permissions: { type: [String], default: [] },
    events_created: {
      type: Number,
      default: 0,
      required: function () {
        return this.role !== "attendant";
      },
    },
    invitations: { type: [String], default: [] },
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("users", usersSchema);
