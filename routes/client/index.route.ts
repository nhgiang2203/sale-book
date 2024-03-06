import { Express } from 'express';
import { bookRoutes } from './book.route';
import { topicRoutes } from './topic.route';
import { categoryRoutes } from './category.route';
import { cartRoutes } from './cart.route';
import { orderRoutes } from './order.route';
import { userRoutes } from './user.route';

import * as middleware from '../../middlewares/client/user.middleware';

const clientRoutes = (app: Express) => {
  app.use(middleware.infoUser);

  app.use('/books', bookRoutes);
  app.use('/topics', topicRoutes);
  app.use('/categories', categoryRoutes);
  app.use('/cart', cartRoutes);
  app.use('/order', orderRoutes);
  app.use('/user', userRoutes);
}

export default clientRoutes;