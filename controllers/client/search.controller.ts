import { Request, Response } from "express";
import { converToSlug } from "../../helpers/convertToSlug";
import Book from "../../models/book.model";

export const search = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const type: string = `${req.params.type}`;

  let newBook = [];
  if(keyword){
    const keywordRegex = new RegExp(keyword, 'i');
    const unicodeSlug = converToSlug(keyword);
    const slugRegex = new RegExp(unicodeSlug, 'i');

    const books = await Book.find({
      $or: [
        { title: keywordRegex },
        { slug: slugRegex }
      ]
    });

    switch(type){
      case 'result':
        res.render('client/pages/search/result', {
          pageTitle: `Kết quả ${keyword}`,
          keyword: keyword,
          books: books
        });
        break;

      case 'suggest':
        res.json({
          code: 200,
          books: books
        });
        break;

      default:
        res.json({
          code: 400,
          message: "Lỗi"
        });
    }
  }

}