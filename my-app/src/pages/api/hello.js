// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectDatabase } from "../../../utils/db";

export default function handler(req, res) {
  connectDatabase();

  res.status(200).json({ name: "teamX" });
}
