const { mongoose } = require('../data/mongooseConnection');

const usersSchema = new mongoose.Schema(
  {
    githubId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, trim: true, default: null },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { collection: 'users', timestamps: true }
);

module.exports = mongoose.model('users', usersSchema);
