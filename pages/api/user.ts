// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../utils/dbConnect";
import { UserModel } from "../../models/User";

// type User = {
//   id: string
//   name: string
// }
dbConnect();

type Data = {
  name: string;
  data: string[];
};

type Error = any;

const DataUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) => {
  const { method } = req;
  console.log(req.body.name);

  switch (method) {
    case "GET":
      try {
        UserModel.findOne({ _id: req.query.id })
          .populate("data")
          // .populate("comment")
          .exec((err, user) => {
            if (err) {
              res.status(500).json({ error: err });
            } else {
              res.status(200).json(user);
            }
          });
      } catch (err: Error) {
        res.status(404).json({ msg: err.message });
      }
      break;
    case "POST":
      try {
        const user = await UserModel.create({
          name: req.body.name,
        });
        res.status(201).json(user);
      } catch (error: Error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default DataUser;
