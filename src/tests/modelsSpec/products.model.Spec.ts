import { Product } from '../../types/product.type';
import { Products } from '../../models/products.model';
import client from './../../database/index';

describe('Testing Products Model', () => {
  beforeAll(async () => {
    const products = new Products();

    const product1: Product = {
      name: 'test1',
      price: 1,
    };
    await products.create(product1);

    const product2: Product = {
      name: 'test2',
      price: 2,
    };
    await products.create(product2);

    const product3: Product = {
      name: 'test3',
      price: 3,
    };
    await products.create(product3);
  });

  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;';
    await connection.query(sql);
  });

  describe('Testing Index Function', () => {
    it('Defined', () => {
      const products = new Products();
      expect(products.index).toBeDefined();
    });

    it('Works', async () => {
      const products = new Products();
      const res = await products.index();

      const p1: Product = {
        name: 'test1',
        price: 1,
      };
      const p2: Product = {
        name: 'test2',
        price: 2,
      };
      const p3: Product = {
        name: 'test3',
        price: 3,
      };

      expect(res).toEqual([
        { id: 1, ...p1 },
        { id: 2, ...p2 },
        { id: 3, ...p3 },
      ]);
    });
  });

  describe('Testing Show Function', () => {
    it('Defined', () => {
      const products = new Products();
      expect(products.show).toBeDefined();
    });

    it('Works', async () => {
      const products = new Products();
      const res = await products.show(2);

      const shownProduct: Product = {
        name: 'test2',
        price: 2,
      };

      expect(res).toEqual({ id: 2, ...shownProduct });
    });
  });

  describe('Testing Create Function', () => {
    it('Defined', () => {
      const products = new Products();
      expect(products.create).toBeDefined();
    });

    it('Works', async () => {
      const products = new Products();

      const newProduct: Product = {
        name: 'test4',
        price: 4,
      };
      const res = await products.create(newProduct);

      expect(res).toEqual({ id: 4, ...newProduct });
    });
  });

  describe('Testing Destroy Function', () => {
    it('Defined', () => {
      const products = new Products();
      expect(products.destroy).toBeDefined();
    });

    it('Works', async () => {
      const products = new Products();
      const res = await products.destroy(4);

      const deletedProduct: Product = {
        name: 'test4',
        price: 4,
      };

      expect(res).toEqual({ id: 4, ...deletedProduct });
    });
  });

  describe('Testing Update Price Function', () => {
    it('Defined', () => {
      const products = new Products();
      expect(products.updatePrice).toBeDefined();
    });

    it('Works', async () => {
      const products = new Products();
      const res = await products.updatePrice(3, 30);

      const updatedProduct: Product = {
        name: 'test3',
        price: 30,
      };

      expect(res).toEqual({ id: 3, ...updatedProduct });
    });
  });
});
