CREATE DATABASE  my_app;
CREATE TABLE  Users (
    USER_ID SERIAL PRIMARY KEY,
    Username VARCHAR(100)  NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Categories(
    Category_id SERIAL PRIMARY KEY,
    Category_name VARCHAR(100) NOT NULL 
);
CREATE TABLE Products(
    Product_id SERIAL PRIMARY KEY,
    Image_url VARCHAR(255),
    Name VARCHAR(100) NOT NULL,
    Description TEXT,
    Price FLOAT NOT NULL,
    Stock INT NOT NULL,
    category_id INT REFERENCES Categories(Category_id)
);
CREATE TABLE Orders(
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(USER_ID),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount FLOAT NOT NULL
);
CREATE TABLE oreder_items(
    oreder_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
    product_id INT REFERENCES Products(Product_id),
    quentity INT NOT NULL,
    price FLOAT NOT NULL
);
CREATE TABLE payments(
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount FLOAT NOT NULL
);

CREATE TABLE credit_contracts(
    credit_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES Orders(order_id) ON DELETE CASCADE,
    credit_amount DECIMAL(10, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    installments INT NOT NULL,
    due_date TIMESTAMP NOT NULL
);


CREATE VIEW categories_with_products AS
SELECT 
    c.Category_id,
    c.Category_name,
    json_agg(
        json_build_object(
            'Product_ID', p.Product_id,
            'Image_url', p.Image_url,
            'Name', p.Name,
            'Description', p.Description,
            'Price', p.Price,
            'Stock', p.Stock
        )
    ) AS Products
FROM Categories c
LEFT JOIN Products p ON c.Category_id = p.Category_id
GROUP BY c.Category_id;

-- tekshirish
INSERT INTO Categories (Category_name) VALUES ('Maishiy texnika'), ('Mebel');
INSERT INTO Products (Name, Description, Price, Stock, Category_ID) VALUES 
('Televizor', 'HD Televizor', 300.00, 10, 1),
('Kir yuvish mashinasi', 'Automatik kir yuvish mashinasi', 250.00, 15, 1),
('Divan', 'Yumshoq divan', 150.00, 5, 2),
('Stol', 'Yogoch stol', 100.00, 20, 2);






