import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  res.render('client/pages/home-page/index', {
    pageTitle: "Trang chủ"
  })
}