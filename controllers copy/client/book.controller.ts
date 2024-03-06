import { Request, Response } from 'express';
import Book from "../../models/book.model";
import Topic from '../../models/topic.model';

//[GET]/books/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slug = req.params.slugCategory;
  const topic = await Topic.findOne({
    slug: slug,
    deleted: false,
    status: 'active'
  });

  const books = await Book.find({
    topicId: topic.id,
    deleted: false,
    status: 'active'
  });

  res.render('client/pages/books/index', {
    pageTitle: "Trang sách",
    books: books
  })
  
}

//[GET]/books/detail/:bookId
export const info = async (req: Request, res: Response) => {
  const book = await Book.findOne({
    _id: req.params.bookId,
    deleted: false,
    status: 'active'
  });
  console.log(book);
  res.render('client/pages/books/detail', {
    pageTitle: book["title"],
    book: book
  })
}
