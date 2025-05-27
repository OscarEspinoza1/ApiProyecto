CREATE DATABASE food_chains;

-- Tabla de restaurantes
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20)
);

-- Insertar restaurantes reales
INSERT INTO restaurants (name, address, phone) VALUES
('McDonald''s', 'Av. Insurgentes 123, Ciudad', '555-1111'),
('Burger King', 'Calle Reforma 45, Ciudad', '555-2222'),
('Subway', 'Blvd. Central 789, Ciudad', '555-3333'),
('KFC', 'Av. Universidad 56, Ciudad', '555-4444'),
('Domino''s Pizza', 'Calle Norte 12, Ciudad', '555-5555'),
('Taco Bell', 'Av. Revolución 345, Ciudad', '555-6666'),
('Wendy''s', 'Calle Sur 98, Ciudad', '555-7777'),
('Pizza Hut', 'Av. Las Torres 23, Ciudad', '555-8888'),
('Starbucks', 'Blvd. Colón 87, Ciudad', '555-9999'),
('Dunkin'' Donuts', 'Av. Sol 90, Ciudad', '555-0001'),
('Papa John''s', 'Calle Luna 77, Ciudad', '555-0002'),
('Little Caesars', 'Av. Río 34, Ciudad', '555-0003'),
('Carl''s Jr.', 'Blvd. Paseo 55, Ciudad', '555-0004'),
('Panda Express', 'Calle Oriente 22, Ciudad', '555-0005'),
('Chili''s', 'Av. Diamante 78, Ciudad', '555-0006'),
('Buffalo Wild Wings', 'Calle Zafiro 19, Ciudad', '555-0007'),
('Wingstop', 'Blvd. Esmeralda 66, Ciudad', '555-0008'),
('Applebee''s', 'Av. del Valle 32, Ciudad', '555-0009'),
('IHOP', 'Calle San Pedro 11, Ciudad', '555-0010'),
('Krispy Kreme', 'Av. Magnolia 29, Ciudad', '555-0011');

-- Tabla de menús
CREATE TABLE menus (
    id SERIAL PRIMARY KEY,
    restaurant_id INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Insertar menús (máximo 2 por restaurante)
INSERT INTO menus (restaurant_id, name, description, price) VALUES
(1, 'Big Mac', 'Hamburguesa con doble carne y queso', 85.00),
(1, 'McNuggets', 'Nuggets de pollo', 60.00),
(2, 'Whopper', 'Hamburguesa con carne de res a la parrilla', 90.00),
(2, 'Papas Fritas', 'Papas crujientes', 35.00),
(3, 'Sub de Pollo', 'Emparedado con pollo y vegetales', 75.00),
(3, 'Sub de Atún', 'Emparedado con atún y vegetales', 70.00),
(4, 'Pollo Crujiente', 'Pieza de pollo empanizada', 50.00),
(4, 'Papas Cajún', 'Papas sazonadas estilo Cajún', 40.00),
(5, 'Pizza de Pepperoni', 'Pizza con queso y pepperoni', 120.00),
(5, 'Pan de Ajo', 'Pan horneado con ajo y mantequilla', 45.00),
(6, 'Crunchy Taco', 'Taco crujiente con carne', 30.00),
(6, 'Burrito Supreme', 'Burrito con carne, frijoles y verduras', 85.00),
(7, 'Baconator', 'Hamburguesa con doble carne y tocino', 95.00),
(7, 'Papas con Queso', 'Papas fritas con salsa de queso', 50.00),
(8, 'Pan Pizza', 'Pizza esponjosa con pepperoni', 110.00),
(8, 'Alitas BBQ', 'Alitas de pollo con salsa BBQ', 75.00),
(9, 'Latte', 'Café con leche', 50.00),
(9, 'Muffin de Arándano', 'Muffin dulce con arándanos', 40.00),
(10, 'Donas Glaseadas', 'Donas con glaseado de azúcar', 20.00),
(10, 'Café Americano', 'Café negro', 30.00),
(11, 'Pizza Suprema', 'Pizza con variedad de carnes y vegetales', 130.00),
(11, 'Palitos de Queso', 'Bastones de pan con queso', 55.00),
(12, 'Pizza Extravaganzza', 'Pizza con toppings mixtos', 125.00),
(12, 'Crazy Bread', 'Pan con ajo y queso', 40.00),
(13, 'Famous Star', 'Hamburguesa con lechuga, tomate y mayonesa', 80.00),
(13, 'Onion Rings', 'Aros de cebolla empanizados', 45.00),
(14, 'Orange Chicken', 'Pollo agridulce con naranja', 90.00),
(14, 'Chow Mein', 'Fideos salteados con vegetales', 75.00),
(15, 'Baby Back Ribs', 'Costillas de cerdo a la BBQ', 180.00),
(15, 'Ensalada César', 'Lechuga romana con aderezo César', 60.00),
(16, 'Alitas Picantes', 'Alitas de pollo picantes', 85.00),
(16, 'Papas Cajún', 'Papas fritas sazonadas', 45.00),
(17, 'Wings Clásicas', 'Alitas de pollo con salsa', 80.00),
(17, 'Boneless', 'Trozos de pollo sin hueso', 90.00),
(18, 'Ribeye', 'Filete de res jugoso', 220.00),
(18, 'Ensalada Mixta', 'Mezcla de vegetales frescos', 65.00),
(19, 'Pancakes', 'Hotcakes esponjosos con miel', 55.00),
(19, 'Omelette', 'Omelette con verduras y queso', 70.00),
(20, 'Original Glazed', 'Dona glaseada clásica', 25.00),
(20, 'Café Mocha', 'Café con chocolate y leche', 45.00);