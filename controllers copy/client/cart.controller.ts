import { Request, Response } from 'express';
import Book from '../../models/book.model';
import Category from '../../models/category.model';

//[GET]/cart/
export const index = (req: Request, res: Response) => {
  res.render('client/pages/cart/index', {
    pageTitle: 'Trang giỏ hàng'
  })
}

//[POST]/cart/list-json
export const listJson = async (req: Request, res: Response) => {
  console.log(req.body)
  const books = req.body;
  
  for (const book of books) {
    const infoBook = await Book.findOne({
      _id: book.bookId,
      deleted: false,
      status: 'active'
    });

    const dataBook = await Category.findOne({
      bookId: book.bookId,
      typeBook: book.typeBook
    })

    console.log(dataBook);
    book['info'] = infoBook;
    book['price_special'] = dataBook['price'] * (1 - dataBook["discount"]/100);
    book['total'] = book.quantity * book['price_special'];
  }

  res.json({
    code: 200,
    books: books
  })
}