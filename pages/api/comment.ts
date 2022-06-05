import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import { MessageModel, CommentModel } from "../../models/User";
dbConnect();
type Data = {
  message: string;
  comment: string[];
};

type Error = any;

const DataComment = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const { method } = req;
  // console.log(req.body);
  const { query } = req;
  console.log(req.body, query);
  switch (method) {
    case "GET":
      try {
        MessageModel.findOne({ _id: query.id })
          .populate("comment")
          .exec((err, message) => {
            if (err) {
              res.status(500).json({ error: err });
            } else {
              res.status(200).json(message);
            }
          });
      } catch (err: Error) {
        res.status(404).json({ msg: err.message });
      }
      break;
    case "POST":
      try {
        await CommentModel.create({
          text: req.body.comment,
        }).then((comment) => {
          MessageModel.findOneAndUpdate(
            { _id: query.id },
            { $push: { comment: comment._id } },
            { new: true }
          ).then((message) => {
            MessageModel.findOne({ _id: message._id })
              .populate("comment")
              .exec((err, message) => {
                if (err) {
                  res.status(500).json({ error: err });
                } else {
                  res.status(201).json(message);
                }
              });
          });
        });
      } catch (error: Error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default DataComment;
