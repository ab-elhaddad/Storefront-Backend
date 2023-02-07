# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (GET all products)
  [GET] '/products'
  Ex: Response data: [{
  id: 1, name:Lays Chips, price: 5
  }, {}...]

- Show (args: product id) (GET specified product by its id number)
  [GET] '/products/:id'
  Ex: Request data: {
  id: 1
  }
  Response data: {
  id: 1, name:Lays Chips, price: 5
  }

- Create (args: product name, product price) (POST (Create) a new product and add it to the products table) [token required]
  [POST] '/products'
  Ex: Request data: {
  name:Lays Chips, price: 5
  }
  Response data: {
  id: 1, name:Lays Chips, price: 5
  }

- Delete (args: product id) (DELETE (Destroy) specified product by its id number) [token required]
  [DELETE] '/products/:id'
  Ex: Request data: {
  id: 1
  Response data: {
  id: 1, name:Lays Chips, price: 5
  }

- Update Price (args: product id, product new price) (PATCH (Update price) of a specified product by its id number) [token required]
  [PATCH] '/products/updatePrice/:id'
  Ex: Request data: {
  id: 1, newPrice:
  Response data: {
  id: 1, name: Lays Chips, price: 10
  }

#### Users

- Index (GET all users) [token required]
  [GET] '/users'
  Ex: Response data: [{
  id: 1, first_name: Abdelrrahman, last_name: Elhaddad
  }, {}...]

- Show (args: user id) (GET specified user by its id number) [token required]
  [GET] '/users/:id'
  Ex: Request data: {
  id: 1
  }
  Response data: {
  id: 1, first_name: Abdelrrahman, last_name: Elhaddad
  }

- Create (args: user first name, user last name, user password) (POST (Create) a new user and add it to the users table)
  [POST] '/users'
  Ex: Request data: {
  first_name: Abdelrrahman, last_name: Elhaddad, password: 123abc
  }
  Response data: {token}

- Delete (args: user id) (DELETE (Destroy) specified user by its id number) [token required]
  [DELETE] '/users/:id'
  Ex: Request data: {
  id: 1
  }
  Response data: {
  id: 1, first_name: Abdelrrahman, last_name: Elhaddad
  }

- Authenticate (args: user first name, user last name, user password) (Make sure that the user has an account and generate a new token)
  [GET] '/users/:id'
  Ex: Request data: {
  first_name: Abdelrrahman,
  last_name: Elhaddad,
  password: 123abc
  }
  Response data: {token}

#### Orders

- Index (GET all orders) [token required]
  [GET] '/orders'
  Ex: Response data: [{
  status: active,
  user_id: 1
  }, {}...]

- Show (args: order id) (GET specified order by its id number) [token required]
  [GET] '/orders/:id'
  Ex: Request data: {
  id: 1
  }
  Response data: {
  status: active,
  user_id: 1
  }

- Create (args: orders status, order users id) (POST (Create) a new order and add it to the orders table) [token required]
  [POST] '/orders'
  Ex: Request data: {
  status: active,
  user_id: 1
  }
  Response data: {
  id: 1,
  status: active,
  user_id: 1
  }

- Delete (args: order id) (DELETE (Destroy) specified order by its id number) [token required]
  [DELETE] '/orders/:id'
  Ex: Request data: {
  id: 1
  }
  Response data: {
  id: 1,
  status: active,
  user_id: 1
  }

- Current Order by user (args: user id) (GET the order which status = active and user_id equals the entered id) [token required]
  [GET] '/orders/currentOrder/:id'
  Ex: Request data: {
  id: 2
  }
  Response data: {
  id: 1,
  status: active,
  user_id: 2
  }

- Completed Orders by user (args: user id) (GET the orders which status = complete and user_id equals the entered id) [token required]
  [GET] '/orders/completedOrders/:id'
  Ex: Request data: {
  id: 2
  }
  Response data: [{
  id: 1,
  status: complete,
  user_id: 2
  }]

## Data Shapes

#### Product

Column | Type | Collation | Nullable | Default
--------+------------------------+-----------+----------+--------------------------------------
id | integer | | not null | nextval('products_id_seq'::regclass)
name | character varying(255) | | not null |
price | integer | | not null |

Indexes:
products_pkey PRIMARY KEY, btree (id)

Referenced by:
TABLE `order_products` CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

#### User

Column | Type | Collation | Nullable | Default
------------+------------------------+-----------+----------+-----------------------------------
id | integer | | not null | nextval('users_id_seq'::regclass)
first_name | character varying(100) | | not null |
last_name | character varying(100) | | not null |
password | character varying(255) | | not null |

Indexes:
"users_pkey" PRIMARY KEY, btree (id)

Referenced by:
TABLE `orders` CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### Orders

Column | Type | Collation | Nullable | Default
---------+-----------------------+-----------+----------+------------------------------------
id | integer | | not null | nextval('orders_id_seq'::regclass)
status | character varying(15) | | not null |
user_id | integer | | not null |

Indexes:
"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:

    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

Referenced by:
TABLE `order_products` CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

#### order_products

Column | Type | Collation | Nullable | Default
------------+---------+-----------+----------+--------------------------------------------
id | integer | | not null | nextval('order_products_id_seq'::regclass)
quantity | integer | | not null |
order_id | integer | | not null |
product_id | integer | | not null |

Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)

Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
