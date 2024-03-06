import { Request, Response } from 'express';
import Category from "../../models/category.model";

//[GET]/books/detail/:bookId
export const detail = async (req: Request, res: Response) => {
  const typeBook = req.params.typeBook;
  const book = await Category.findOne({
    bookId: req.params.bookId,
    typeBook: typeBook,
    deleted: false,
    status: 'active'
  });

  const price_special = book["price"] * (1 - book["discount"]/100);

  res.json({
    code: 200,
    book: book,
    price_special: price_special
  })
  
}