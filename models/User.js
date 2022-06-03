const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
  MessageModel,
  CommentModel,
};
