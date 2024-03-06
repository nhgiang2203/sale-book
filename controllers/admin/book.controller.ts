import { Request, Response } from "express";
import Book from "../../models/book.model";
import Category from "../../models/category.model";
import { pagination } from "../../helpers/pagination";

export const index = async (req: Request, res: Response) => {
  const books = await Book.find({
    deleted: false
  });

  let bookTotal = [];
  for (const book of books) {
    const data = await Category.find({
      bookId: book.id,
      deleted: false
    }).select("typeBook");

    if(data){
      for (const typeItem of data) {
        const detailBook = await Category.findOne({
          bookId: book.id,
          typeBook: typeItem.typeBook
        });
        const item = {
          _id: book.id,
          title: book.title,
          thumbnail: book.thumbnail,
          typeBook: detailBook.typeBook,
          price: detailBook.price,
          discount: detailBook.discount,
          stock: detailBook.stock,
          status: detailBook.status
        }
        bookTotal.push(item);
      }
    }
  }

  //Pagination
  const countBooks = bookTotal.length;
  let objectPagination = pagination(
    {
      currentPage: 1,
      limitedItems: 5
    },
    req.query,
    countBooks
  );

  res.render('admin/pages/books/index', {
    pageTitle: "Quản lý sách",
    books: bookTotal,
    pagination: objectPagination
  });
}