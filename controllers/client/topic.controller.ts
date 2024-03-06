import { Request, Response } from "express";
import Topic from "../../models/topic.model";

//[GET]/topics/
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: 'active'
  });

  res.render('client/pages/topics/index', {
    pageTitle: "Trang danh mục",
    topics: topics
  });
}