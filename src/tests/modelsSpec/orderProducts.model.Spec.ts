import { OrderProducts } from '../../models/orderProducts.model';
import { OrderProduct } from '../../types/orderProduct.type';
import client from '../../database';

describe('Testing OrderProducts Model', () => {
  beforeAll(async () => {
    const connection = await client.connect();
    let sql =
      "INSERT INTO users (id,first_name,last_name,password) VALUES (11,'test11','test1','test11')";
    await connection.query(sql);
    sql = "INSERT INTO orders (id,status,user_id) VALUES (11,'active',11)";
    await connection.query(sql);
    sql = "INSERT INTO products (id,name,price) VALUES (11,'testP',10)";
    await connection.query(sql);
  });

  describe('Testing Add Product To Order Function', () => {
    it('Defined', () => {
      const orderProducts = new OrderProducts();
      expect(orderProducts.addProductToOrder).toBeDefined();
    });

    it('Works', async () => {
      const orderProducts = new OrderProducts();
      const enterd: OrderProduct = {
        quantity: 5,
        order_id: 11,
        product_id: 11,
      };

      const res = await orderProducts.addProductToOrder(enterd);
      expect(res).toEqual({ id: 1, ...enterd });
    });
  });

  afterAll(async () => {
    const connection = await client.connect();
    let sql =
      'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;';
    await connection.query(sql);
    sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;';
    await connection.query(sql);
    sql =
      'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(sql);
    sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await connection.query(sql);
    connection.release();
  });
});
