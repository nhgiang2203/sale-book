import { Request, Response } from "express";

export const dashboard = (req: Request, res: Response) => {
  res.render('admin/pages/dashboard/index', {
    pageTitle: "Trang tổng quan"
  })
}