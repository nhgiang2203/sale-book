import { Request, Response } from "express";
import Book from "../../models/book.model";
import Category from "../../models/category.model";
import { pagination } from "../../helpers/pagination";
import { systemConfig } from "../../config/config";
import Topic from "../../models/topic.model";

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
          id: book.id,
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


  const startIndex = objectPagination.skip;
  const endIndex = startIndex + objectPagination.limitedItems;
  const items = bookTotal.slice(startIndex, endIndex);

  res.render('admin/pages/books/index', {
    pageTitle: "Quản lý sách",
    books: items,
    pagination: objectPagination
  });
}

//[GET]/admin/books/edit/:id/:typeBook
export const edit = async (req: Request, res: Response) => {
  const book = await Book.findOne({
    _id: req.params.id,
    deleted: false
  });

  if(book){
    const detailBook = await Category.findOne({
      bookId: book.id,
      typeBook: req.params.typeBook,
      deleted: false
    })
    book["typeBook"] = req.params.typeBook;
    book["price"] = detailBook.price;
    book["discount"] = detailBook.discount;
    book["stock"] = detailBook.stock;
    book["status"] = detailBook.status;
  }
  res.render('admin/pages/books/edit', {
    pageTitle: "Trang chỉnh sửa",
    book: book
  })
}

//[PATCH]/admin/books/edit/:id/:typeBook
export const editPatch = async (req: Request, res: Response) => {
  try {
    const book = {
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      description: req.body.description
    }
  
    const detailBook = {
      typeBook: req.body.typeBook,
      price: req.body.price,
      discount: req.body.discount,
      stock: req.body.stock,
      status: req.body.status
    }
  
    if(req.body.thumbnail){
      book["thumbnail"] = req.body.thumbnail;
    }

  
    await Book.updateOne({ _id: req.params.id }, book);
    await Category.updateOne({
      bookId: req.params.id,
      typeBook: req.params.typeBook
    }, detailBook);

    req.flash('success', "Cập nhật thành công!");
  } catch (error) {
    req.flash('error', "Cập nhật thất bại!");
  }

  res.redirect('back');
  

}

//[GET]/admin/books/create
export const create = async(req: Request, res: Response) => {

  const topics = await Topic.find({
    deleted: false,
  })

  res.render('admin/pages/books/create', {
    pageTitle: "Trang thêm mới",
    topics: topics
  })
}

//[POST]/admin/books/create
export const createPost = async (req: Request, res: Response) => {
  try {

    const existBook = await Book.findOne({
      title: req.body.title,
      author: req.body.author,
      topicId: req.body.topicId
    });

    if(existBook){
      const exitsTypeBook = await Category.findOne({
        bookId: existBook.id,
        typeBook: req.body.typeBook
      });

      if(exitsTypeBook){
        req.flash('error', 'Đã tồn tại!');
        res.redirect('back');
      }
      else {
        const detailBook = {
          bookId: existBook.id,
          typeBook: req.body.typeBook,
          price: req.body.price,
          discount: req.body.discount,
          stock: req.body.stock,
          status: req.body.status
        }
    
        const newDetail = new Category(detailBook);
        await newDetail.save();
      }
    } 
    else {
      const book = {
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        author: req.body.author,
        publisher: req.body.publisher,
        description: req.body.description,
        topicId: req.body.topicId,
        status: req.body.status
      }

      const newBook = new Book(book);
      await newBook.save();

      const detailBook = {
        bookId: newBook.id,
        typeBook: req.body.typeBook,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        status: req.body.status
      }
  
      const newDetail = new Category(detailBook);
      await newDetail.save();
    }

    req.flash('success', "Cập nhật thành công!");
  } catch (error) {
    req.flash('error', "Cập nhật thất bại!");
  }

  res.redirect(`/${systemConfig.prefixAdmin}/books/`);
}

//[DELETE]/admin/books/delete
export const deleteBook = async (req: Request, res: Response) => {
  await Book.deleteOne({
    _id: req.params.id,
  })

  await Category.deleteOne({
    bookId: req.params.id,
    typeBook: req.params.typeBook
  })

  res.redirect('back');
}

//[GET]/admin/books/detail/:id
export const detail = async (req: Request, res: Response) => {
  const book = await Book.findOne({
    _id: req.params.id,
    deleted: false
  });

  const detailBook = await Category.findOne({
    bookId: req.params.id,
    typeBook: req.params.typeBook,
    deleted: false
  });

  const topic = await Topic.findOne({
    _id: book.topicId,
    deleted: false
  });

  book["topic"] = topic.title;
  book["typeBook"] = detailBook.typeBook;
  book["price"] = detailBook.price;
  book["discount"] = detailBook.discount;
  book["stock"] = detailBook.stock;
  book["status"] = detailBook.status;

  res.render('admin/pages/books/detail', {
    pageTitle: "Trang chi tiết",
    book: book
  })
}