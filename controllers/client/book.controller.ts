import { Request, Response } from 'express';
import Book from "../../models/book.model";
import Topic from '../../models/topic.model';
import Category from '../../models/category.model';

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

//[GET]/books/detail/:slug
export const info = async (req: Request, res: Response) => {
  const book = await Book.findOne({
    slug: req.params.slug,
    deleted: false,
    status: 'active'
  });

  const numType = await Category.find({
    bookId: book.id,
    deleted: false
  });

  book["typeBook"] = [];
  for (const item of numType) {
    book["typeBook"].push(item.typeBook);
  }

  res.render('client/pages/books/detail', {
    pageTitle: book["title"],
    book: book
  })
}
