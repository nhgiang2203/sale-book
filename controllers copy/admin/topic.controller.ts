import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import { systemConfig } from "../../config/config";
import { pagination } from "../../helpers/pagination";

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  });

  const find = {
    deleted: false
  }
  //Pagination
  const countTopics = await Topic.countDocuments(find);
  let objectPagination = pagination(
    {
      currentPage: 1,
      limitedItems: 5
    },
    req.query,
    countTopics
  );


  res.render('admin/pages/topics/index', {
    pageTitle: "Quản lý danh mục",
    topics: topics,
    pagination: objectPagination
  });
}

export const create = async(req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  });

  res.render('admin/pages/topics/create', {
    pageTitle: "Thêm danh mục",
    topics: topics
  })
}

export const createPost = async(req: Request, res: Response) => {
  
  const topic = new Topic(req.body);
  await topic.save();
  req.flash('success', "Tạo mới thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/topics/`);

}

//[GET]/admin/topics/detail/:id
export const detail = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    _id: req.params.id,
    deleted: false
  });
  res.render('admin/pages/topics/detail', {
    pageTitle: "Chi tiết danh mục",
    topic: topic
  });
}

//[GET]/admin/topics/edit/:id
export const edit = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    _id: req.params.id,
    deleted: false
  });

  res.render('admin/pages/topics/edit', {
    pageTitle: "Chỉnh sửa danh mục",
    topic: topic
  })
}

//[PATCH]/admin/topics/edit/:id
export const editPatch = async(req: Request, res: Response) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.id,
      deleted: false
    })

    const data = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status
    }
    
    if(req.body.thumbnail){
      data["thumbnail"] = req.body.thumbnail;
    }
    
    await Topic.updateOne({
      _id: req.params.id
    }, data);
    
    req.flash('success', "Cập nhật thành công!");
  } catch(error){
    req.flash('error', "Cập nhật thất bại!");
  }
  res.redirect('back');
}

//[DELETE]/admin/topics/delete/:id
export const deleteItem = async (req: Request, res: Response) => {
  await Topic.deleteOne({
    _id: req.params.id
  });

  res.redirect('back');
}