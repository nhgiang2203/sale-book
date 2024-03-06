import { Request, Response } from "express";
import Category from "../../models/category.model";
import Order from "../../models/order.model";
import * as helper from "../../helpers/generate";
import Book from "../../models/book.model";

//[POST]/order
export const order = async (req: Request, res: Response) => {
  const data = req.body;
  console.log(typeof data["cart"]);
  console.log(data)
  //console.log(carts)

  for (const book of data["cart"]) {
    const infoBook = await Category.findOne({
      bookId: book.bookId,
      typeBook: book.typeBook
    });

    book["price"] = infoBook.price;
    book["discount"] = infoBook.discount;
    console.log(book);
  }


  const randomNumber: number = parseInt(helper.generateRandomNumber(8));
  const code = helper.generateOrderCode(randomNumber);

  console.log(typeof data["cart"]);
  const orderData = {
    code: code,
    info: data["info"],
    cart: data["cart"],
  }

  
  console.log(orderData);
  const order = new Order(orderData);
  await order.save();

  

  res.json({
    code: 200,
    orderCode: code
  })

}

//[GET]/order/success
export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;

  const order = await Order.findOne({
    code: orderCode
  });

  for (const item of order["cart"]) {
    item["price_special"] = item["price"] * (1 - item["discount"]/100);
    item["total"] = item["quantity"] * item["price_special"];

    const bookInfo = await Book.findOne({
      _id: item["bookId"],
      deleted: false,
      status: "active"
    });

    const purchase = bookInfo.purchase + item["quantity"];
    await Book.updateOne({
      _id: item["bookId"]
    }, {
      purchase: purchase
    });

    const typeBook = await Category.findOne({
      bookId: item["bookId"],
      typeBook: item["typeBook"]
    });
    const stock = typeBook["stock"] - item["quantity"];
    await Category.updateOne({
      bookId: item["bookId"],
      typeBook: item["typeBook"]
    }, {
      stock: stock
    });

    item["title"] = bookInfo.title;
    item["thumbnail"] = bookInfo.thumbnail;
    item["slug"] = bookInfo.slug;
  }

  order["total_price"] = order["cart"].reduce((sum, item) => sum + item["total"], 0);

  
  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order
  });
}