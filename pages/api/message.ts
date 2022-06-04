import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import { MessageModel, UserModel } from "../../models/User";
dbConnect();

type Data = {
  message: string;
  comment: string[];
};

type Error = any;

const DataMessage = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const { method } = req;
  console.log(req.body);
  const { query } = req;
  // console.log(req.body, query);
  switch (method) {
    case "POST":
      try {
        await MessageModel.create({
          message: req.body.message,
        }).then((message) => {
          UserModel.findOneAndUpdate(
            { _id: query.id },
            { $push: { data: message._id } },
            { new: true }
          ).then(() => {
            res.status(201).json(message);
          });
        });
      } catch (error: Error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default DataMessage;
