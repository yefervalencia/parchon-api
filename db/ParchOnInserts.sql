use parchon;

INSERT INTO roles (name, description) VALUES 
('User', 'normal user who accesses the website'),
('Owner', 'user with ownership privileges and full control over their content'),
('Admin', 'user with full permissions to manage the entire website');

-- Insertar permisos
INSERT INTO permissions (name, description, route) VALUES
-- Permisos para usuarios (user)
('read_images', 'Permiso para leer imágenes de cualquier entidad', '/api/images'),
('read_single_image', 'Permiso para leer una imagen específica', '/api/images/{id}'),
('read_events', 'Permiso para leer eventos', '/api/events'),
('read_single_event', 'Permiso para leer un evento específico', '/api/events/{id}'),
('read_places', 'Permiso para leer lugares', '/api/places'),
('read_single_place', 'Permiso para leer un lugar específico', '/api/places/{id}'),
('read_services', 'Permiso para leer servicios', '/api/services'),
('read_single_service', 'Permiso para leer un servicio específico', '/api/services/{id}'),
('update_user', 'Permiso para actualizar su propio usuario', '/api/users/{id}'),
('delete_user', 'Permiso para eliminar su propio usuario', '/api/users/{id}'),
('read_user', 'Permiso para ver su propio usuario', '/api/users/{id}'),
('read_categories', 'Permiso para ver todas las categorías de cualquier entidad', '/api/categories'),
('read_single_category', 'Permiso para ver una categoría específica', '/api/categories/{id}'),

-- Permisos para dueños (owner)
('create_local', 'Permiso para crear un local', '/api/locals'),
('read_local', 'Permiso para leer un local', '/api/locals/{id}'),
('update_local', 'Permiso para actualizar un local', '/api/locals/{id}'),
('delete_local', 'Permiso para eliminar un local', '/api/locals/{id}'),
('create_event', 'Permiso para crear un evento', '/api/events'),
('read_event', 'Permiso para leer un evento', '/api/events/{id}'),
('update_event', 'Permiso para actualizar un evento', '/api/events/{id}'),
('delete_event', 'Permiso para eliminar un evento', '/api/events/{id}'),
('read_event_categories', 'Permiso para leer categorías de eventos', '/api/categories/events'),
('read_local_categories', 'Permiso para leer categorías de locales', '/api/categories/locals'),
('read_addresses', 'Permiso para leer direcciones', '/api/addresses'),
('read_single_address', 'Permiso para leer una dirección específica', '/api/addresses/{id}'),

-- Permisos para administradores (admin)
('full_access', 'Permiso para realizar cualquier acción en la base de datos', '*');

-- Insertar relaciones entre roles y permisos (role_permission)
-- Permisos para el rol 'user'
INSERT INTO role_permission (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_images')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_single_image')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_events')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_single_event')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_places')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_single_place')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_services')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_single_service')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'update_user')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'delete_user')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_user')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_categories')),
((SELECT id FROM roles WHERE name = 'user'), (SELECT id FROM permissions WHERE name = 'read_single_category')),

-- Permisos para el rol 'owner'
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'create_local')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_local')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'update_local')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'delete_local')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'create_event')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_event')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'update_event')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'delete_event')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_event_categories')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_local_categories')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_addresses')),
((SELECT id FROM roles WHERE name = 'owner'), (SELECT id FROM permissions WHERE name = 'read_single_address')),

-- Permisos para el rol 'admin'
((SELECT id FROM roles WHERE name = 'admin'), (SELECT id FROM permissions WHERE name = 'full_access'));

-- Direcciones en Manizales, Caldas
INSERT INTO addresses (street, city_id) VALUES
('Carrera 23 # 65-12', 337),
('Avenida Santander # 12-45', 337),
('Calle 59 # 22-10', 337),
('Carrera 19 # 44-20', 337),
('Avenida Kevin Ángel # 15-30', 337),
('Calle 66 # 23-45', 337),
('Carrera 25 # 50-60', 337),
('Avenida Paralela # 10-25', 337),
('Calle 72 # 19-33', 337),
('Carrera 21 # 32-11', 337),
('Avenida 12 de Octubre # 20-40', 337),
('Calle 50 # 15-22', 337),
('Carrera 27 # 62-18', 337),
('Avenida Centenario # 30-50', 337),
('Calle 55 # 25-14', 337),
('Carrera 18 # 40-30', 337),
('Avenida del Río # 5-10', 337),
('Calle 60 # 18-27', 337),
('Carrera 22 # 55-12', 337),
('Avenida Cervantes # 8-15', 337),
('Calle 65 # 20-35', 337),
('Carrera 20 # 38-42', 337),
('Avenida Los Cámbulos # 25-60', 337),
('Calle 53 # 30-18', 337),
('Carrera 24 # 52-14', 337),
('Avenida Alberto Mendoza # 12-22', 337),
('Calle 58 # 17-29', 337),
('Carrera 17 # 35-40', 337),
('Avenida Colón # 18-33', 337),
('Calle 63 # 24-16', 337),
('Carrera 26 # 58-20', 337),
('Avenida del Ferrocarril # 7-12', 337),
('Calle 51 # 28-19', 337),
('Carrera 16 # 42-25', 337),
('Avenida Panamericana # 22-48', 337),
('Calle 67 # 21-30', 337),
('Carrera 28 # 60-15', 337),
('Avenida del Café # 9-17', 337),
('Calle 54 # 26-13', 337),
('Carrera 29 # 63-22', 337),
('Avenida Los Naranjos # 14-28', 337),
('Calle 61 # 19-24', 337),
('Carrera 30 # 64-10', 337),
('Avenida Los Fundadores # 11-20', 337),
('Calle 56 # 23-17', 337),
('Carrera 31 # 66-19', 337),
('Avenida Perseo # 6-14', 337),
('Calle 52 # 27-21', 337),
('Carrera 32 # 67-23', 337),
('Avenida Los Andes # 13-26', 337),
('Calle 68 # 22-32', 337),
('Carrera 33 # 68-17', 337),
('Avenida Los Alpes # 16-31', 337),
('Calle 57 # 29-15', 337),
('Carrera 34 # 69-21', 337),
('Avenida Los Cerezos # 19-34', 337),
('Calle 62 # 25-18', 337),
('Carrera 35 # 70-14', 337),
('Avenida Los Pinos # 21-36', 337),
('Calle 64 # 30-20', 337),
('Carrera 36 # 71-16', 337),
('Avenida Los Sauces # 23-38', 337),
('Calle 69 # 26-22', 337),
('Carrera 37 # 72-18', 337),
('Avenida Los Robles # 24-40', 337),
('Calle 70 # 31-24', 337),
('Carrera 38 # 73-20', 337),
('Avenida Los Olivos # 26-42', 337),
('Calle 71 # 32-26', 337),
('Carrera 39 # 74-22', 337),
('Avenida Los Laureles # 27-44', 337),
('Calle 72 # 33-28', 337),
('Carrera 40 # 75-24', 337),
('Avenida Los Girasoles # 28-46', 337),
('Calle 73 # 34-30', 337),
('Carrera 41 # 76-26', 337),
('Avenida Los Claveles # 29-48', 337),
('Calle 74 # 35-32', 337),
('Carrera 42 # 77-28', 337),
('Avenida Los Lirios # 30-50', 337),
('Calle 75 # 36-34', 337),
('Carrera 43 # 78-30', 337),
('Avenida Los Tulipanes # 31-52', 337),
('Calle 76 # 37-36', 337),
('Carrera 44 # 79-32', 337),
('Avenida Los Jazmines # 32-54', 337),
('Calle 77 # 38-38', 337),
('Carrera 45 # 80-34', 337),
('Avenida Los Rosales # 33-56', 337),
('Calle 78 # 39-40', 337),
('Carrera 46 # 81-36', 337),
('Avenida Los Duraznos # 34-58', 337),
('Calle 79 # 40-42', 337),
('Carrera 47 # 82-38', 337),
('Avenida Los Manzanos # 35-60', 337),
('Calle 80 # 41-44', 337),
('Carrera 48 # 83-40', 337),
('Avenida Los Perales # 36-62', 337),
('Calle 81 # 42-46', 337),
('Carrera 49 # 84-42', 337),
('Avenida Los Ciruelos # 37-64', 337),
('Calle 82 # 43-48', 337),
('Carrera 50 # 85-44', 337),
('Avenida Los Guayacanes # 38-66', 337),
('Calle 83 # 44-50', 337),
('Carrera 51 # 86-46', 337),
('Avenida Los Acacios # 39-68', 337),
('Calle 84 # 45-52', 337),
('Carrera 52 # 87-48', 337),
('Avenida Los Ceibos # 40-70', 337);

INSERT INTO categories_locals (name, description) VALUES
('Restaurante', 'Lugares para comer y disfrutar de diferentes gastronomías'),
('Cafetería', 'Lugares para tomar café y acompañamientos'),
('Bar', 'Establecimientos para consumir bebidas alcohólicas'),
('Discoteca', 'Lugares para bailar y escuchar música'),
('Tienda', 'Establecimientos comerciales para comprar productos'),
('Panadería', 'Lugares especializados en pan y productos de repostería'),
('Heladería', 'Lugares especializados en helados y postres fríos'),
('Pizzería', 'Restaurantes especializados en pizzas'),
('Comida Rápida', 'Establecimientos de servicio rápido de alimentos'),
('Gourmet', 'Restaurantes de alta cocina y experiencia gastronómica');

INSERT INTO locals (name, description, cellphone, address_id, owner_id, category_local_id) VALUES
('La Cocina de Mamá', 'Restaurante de comida tradicional colombiana', '7528861234', 1, 6, 1),
('Café del Centro', 'Acogedora cafetería en el corazón de Manizales', '8845662345', 5, 2, 2),
('Bar La 23', 'Bar temático con música en vivo los fines de semana', '8867864345', 10, 3, 3),
('Pizza Nostra', 'Auténtica pizza italiana en Manizales', '8864567527', 15, 4, 8),
('Helados Artesanales', 'Heladería con sabores únicos y naturales', '8868615678', 20, 5, 7);

INSERT INTO categories_services (name) VALUES
('Salud'), 
('Seguridad'),
('Transporte'),
('Alojamiento'),
('Educación'),
('Financieros'),
('Gobierno'),
('Emergencias');

-- Salud (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Hospital de Caldas', 'Principal hospital de la región', 25, '8468866789', 1),
('Clínica Manizales', 'Clínica privada con múltiples especialidades', 30, '8867832890', 1),
('Laboratorio Clínico Labco', 'Análisis clínicos y pruebas diagnósticas', 35, '8846568901', 1),
('Óptica Nacional', 'Servicios de optometría y venta de lentes', 40, '8869795012', 1),
('Dental Center', 'Clínica odontológica especializada', 45, '8867950123', 1),
('Farmacia La Rebaja', 'Cadena de farmacias con servicio 24 horas', 50, '8235861234', 1);

-- Seguridad (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Estación de Policía Centro', 'Comando de policía del centro de Manizales', 55, '8795862345', 2),
('CAI La Fuente', 'Puesto de policía de atención inmediata', 60, '8863452456', 2),
('Seguridad Privada Vigilarmas', 'Empresa de vigilancia y seguridad privada', 65, '8869654567', 2),
('Bomberos Manizales', 'Cuerpo oficial de bomberos', 70, '8865452678', 2),
('Defensa Civil', 'Organización de protección civil', 75, '8866745889', 2),
('Centro de Monitoreo Municipal', 'Sistema de videovigilancia de la ciudad', 80, '8867846204', 2);

-- Transporte (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Terminal de Transportes', 'Terminal intermunicipal de buses', 85, '8878568901', 3),
('Taxi Seguro', 'Cooperativa de taxis con servicio las 24 horas', 90, '8852469012', 3),
('Bus Urbano Línea 1', 'Ruta principal de transporte público', 2, '8864560123', 3),
('Alquiler de Autos Rápidos', 'Servicio de alquiler de vehículos', 7, '8861852234', 3),
('Estación de Servicio La 50', 'Gasolinera y taller mecánico', 12, '8862385445', 3),
('Taller Mecánico El Motor', 'Reparación y mantenimiento de vehículos', 17, '8725863456', 3);

-- Alojamiento (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Hotel Varuna', 'Hotel 4 estrellas en el centro', 22, '8845864567', 4),
('Hostal Casa del Viajero', 'Alojamiento económico para mochileros', 27, '8864255678', 4),
('Apartaestudios La Colina', 'Apartamentos amoblados para estancias cortas', 32, '8854266789', 4),
('Hotel Estelar', 'Cadena hotelera de lujo', 37, '8864527890', 4),
('Posada del Café', 'Hotel temático con experiencia cafetera', 42, '8868583901', 4),
('Airbnb Centro Manizales', 'Departamentos para alquiler temporal', 47, '8869052812', 4);

-- Educación (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Universidad de Caldas', 'Principal universidad pública', 52, '8976860123', 5),
('Universidad Nacional', 'Sede Manizales de la UNAL', 57, '8864581234', 5),
('Colegio San Luis Gonzaga', 'Colegio privado tradicional', 62, '8862432345', 5),
('Academia de Idiomas Berlitz', 'Cursos de inglés y otros idiomas', 67, '8863423456', 5),
('Biblioteca Pública', 'Biblioteca central de Manizales', 72, '8864964567', 5),
('SENA Regional Caldas', 'Centro de formación técnica', 77, '8887565678', 5);

-- Financieros (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Bancolombia Centro', 'Sucursal principal en Manizales', 82, '8866797889', 6),
('Davivienda La 50', 'Oficina bancaria con múltiples servicios', 87, '8867465890', 6),
('BBVA Santander', 'Banco con servicios financieros completos', 92, '8864988901', 6),
('Cooperativa Confiar', 'Cooperativa financiera', 97, '8872569012', 6),
('Cajero Bancolombia 24h', 'Cajero automático disponible las 24 horas', 3, '8825601238', 6),
('Western Union', 'Servicios de giros y transferencias', 8, '8847361234', 6);

-- Gobierno (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Alcaldía de Manizales', 'Sede principal de la administración municipal', 13, '8869672345', 7),
('Gobernación de Caldas', 'Sede del gobierno departamental', 18, '8845663456', 7),
('Registro Civil', 'Trámites de identificación y registro', 23, '8868974567', 7),
('Oficina de Impuestos', 'Recaudo de impuestos municipales', 28, '8865677238', 7),
('Secretaría de Tránsito', 'Trámites vehiculares y licencias', 33, '8845666789', 7),
('Cámara de Comercio', 'Registro mercantil y empresarial', 38, '8867897890', 7);

-- Emergencias (6)
INSERT INTO services (name, description, address_id, cellphone, category_service_id) VALUES
('Línea de Emergencias 123', 'Número único de emergencias', 43, '0000000123', 8),
('Cruz Roja Manizales', 'Atención prehospitalaria y emergencias', 48, '8864658891', 8),
('Urgencias Clínica Las Américas', 'Servicio de urgencias 24 horas', 53, '8869423602', 8),
('Centro de Toxicología', 'Atención por intoxicaciones', 58, '8860495123', 8),
('Rescate Montaña', 'Grupo especializado en rescate en montaña', 63, '8864232342', 8),
('Protección Civil', 'Atención de emergencias y desastres', 68, '8864682345', 8);

INSERT INTO categories_places (name) VALUES
('Centro Comercial'),
('Parque Natural'),
('Centro Recreativo'),
('Colegio'),
('Universidad'),
('Museo'),
('Teatro'),
('Biblioteca'),
('Estadio'),
('Mirador');

-- Centros Comerciales (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Fundadores', 'Principal centro comercial de Manizales', '8863658456', 4, 1),
('Cable Plaza', 'Centro comercial con vista a la ciudad', '8436864567', 9, 1),
('Sancancio', 'Centro comercial en el barrio Sancancio', '8849665678', 14, 1),
('Palermo', 'Centro comercial con variedad de tiendas', '8866748989', 19, 1);

-- Parques Naturales (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Nevado del Ruiz', 'Parque natural con volcán activo', '8868527890', 24, 2),
('Los Yarumos', 'Parque ecológico con miradores', '8868996301', 29, 2),
('Ecoparque Los Alcázares', 'Reserva forestal urbana', '8868759012', 34, 2),
('Bosque Popular', 'Parque principal de la ciudad', '8860964123', 39, 2);

-- Centros Recreativos (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Recinto del Pensamiento', 'Parque temático y centro de convenciones', '8861897234', 44, 3),
('Parque de la Mujer', 'Espacio recreativo y cultural', '8867562345', 49, 3),
('Parque Caldas', 'Parque central de Manizales', '8867233456', 54, 3),
('Maloka del Café', 'Parque temático del café', '8867564567', 59, 3);

-- Colegios (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Instituto Universitario', 'Colegio privado tradicional', '8865456678', 64, 4),
('Gimnasio Campestre', 'Colegio privado con amplias instalaciones', '8862566789', 69, 4),
('Liceo Isabel La Católica', 'Colegio femenino reconocido', '8867899840', 74, 4),
('Colegio San Pío X', 'Institución educativa católica', '8423868901', 79, 4);

-- Universidades (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Universidad de Manizales', 'Universidad privada en el centro', '8869096412', 84, 5),
('Universidad Católica', 'Institución de educación superior católica', '8867950123', 89, 5),
('Universidad Autónoma', 'Universidad privada con múltiples programas', '8864261234', 94, 5),
('Universidad Luis Amigó', 'Universidad católica con enfoque social', '8862342345', 99, 5);

-- Museos (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Museo de Arte de Caldas', 'Exposiciones de arte regional', '8867893456', 6, 6),
('Museo del Oro', 'Colección arqueológica del Banco de la República', '8864564267', 11, 6),
('Museo Interactivo Samoga', 'Museo de ciencia y tecnología', '8865489678', 16, 6),
('Casa Museo Jorge Eliécer Gaitán', 'Museo histórico dedicado al líder político', '8842566789', 21, 6);

-- Teatros (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Teatro Los Fundadores', 'Principal teatro de la ciudad', '8867889590', 26, 7),
('Teatro Manizales', 'Espacio cultural para artes escénicas', '8865648901', 31, 7),
('Teatro Universitario', 'Teatro de la Universidad de Caldas', '8864899012', 36, 7),
('Teatro Estudio', 'Espacio alternativo para obras', '8860145623', 41, 7);

-- Bibliotecas (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Biblioteca Universidad de Caldas', 'Biblioteca principal de la universidad', '8867521234', 46, 8),
('Biblioteca Pública Municipal', 'Biblioteca de acceso público', '8862824345', 51, 8),
('Biblioteca del Banco de la República', 'Biblioteca con colección especializada', '8469863456', 56, 8),
('Biblioteca SENA', 'Biblioteca especializada en temas técnicos', '8864354567', 61, 8);

-- Estadios (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Estadio Palogrande', 'Estadio de fútbol y eventos', '8867895678', 66, 9),
('Coliseo Mayor', 'Escenario para deportes bajo techo', '8845666789', 71, 9),
('Unidad Deportiva Palogrande', 'Complejo deportivo universitario', '8812367890', 76, 9),
('Canchas La Francia', 'Espacio para deportes populares', '8868942301', 81, 9);

-- Miradores (4)
INSERT INTO places (name, description, cellphone, address_id, category_place_id) VALUES
('Chipre', 'Mirador tradicional de la ciudad', '8867899012', 86, 10),
('Monumento a los Colonizadores', 'Mirador con vista panorámica', '8845260123', 91, 10),
('Torre al Cielo', 'Mirador en el Recinto del Pensamiento', '8861469234', 96, 10),
('Mirador de La Manuela', 'Vista hacia el occidente de la ciudad', '8867232345', 100, 10);

INSERT INTO categories_events (name) VALUES
('Concierto'),
('Fiesta'),
('Carrera'),
('Feria'),
('Exposición'),
('Taller'),
('Conferencia'),
('Festival'),
('Deporte'),
('Cultural');

-- Conciertos (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Festival de Rock', 'Concierto de bandas locales de rock', 500, '2023-11-15 18:00:00', '2023-11-15 23:00:00', 1, 1),
('Noche de Jazz', 'Presentación de jazz con músicos nacionales', 200, '2023-11-20 19:00:00', '2023-11-20 22:00:00', 2, 1),
('Orquesta Sinfónica', 'Concierto de música clásica', 300, '2023-11-25 17:00:00', '2023-11-25 20:00:00', 3, 1),
('Festival de Trova', 'Encuentro de trovadores colombianos', 150, '2023-12-05 16:00:00', '2023-12-05 21:00:00', 4, 1),
('Electrónica en la Montaña', 'DJs nacionales e internacionales', 800, '2023-12-10 20:00:00', '2023-12-11 04:00:00', 5, 1);

-- Fiestas (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Fiesta de la Cerveza', 'Degustación de cervezas artesanales', 300, '2023-11-17 15:00:00', '2023-11-17 23:00:00', 1, 2),
('Halloween Party', 'Fiesta de disfraces de Halloween', 400, '2023-10-31 20:00:00', '2023-11-01 03:00:00', 2, 2),
('Noche de Gala', 'Evento elegante con música en vivo', 150, '2023-12-15 19:00:00', '2023-12-16 02:00:00', 3, 2),
('Fiesta Retro', 'Música de los 80s y 90s', 250, '2023-11-10 21:00:00', '2023-11-11 04:00:00', 4, 2),
('Año Nuevo en la Montaña', 'Celebración de fin de año', 500, '2023-12-31 22:00:00', '2024-01-01 06:00:00', 5, 2);

-- Carreras (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Media Maratón de Manizales', 'Carrera atlética 21K', 1000, '2023-11-19 06:00:00', '2023-11-19 12:00:00', NULL, 3),
('Carrera de la Montaña', 'Trail running por senderos naturales', 500, '2023-12-03 07:00:00', '2023-12-03 14:00:00', NULL, 3),
('5K por la Salud', 'Carrera familiar para promover hábitos saludables', 800, '2023-11-26 08:00:00', '2023-11-26 11:00:00', NULL, 3),
('Carrera de Observación', 'Prueba de orientación urbana', 200, '2023-12-09 09:00:00', '2023-12-09 16:00:00', NULL, 3),
('Duatlón Ciudad de Manizales', 'Competencia de ciclismo y carrera', 300, '2023-12-17 07:30:00', '2023-12-17 15:00:00', NULL, 3);

-- Ferias (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Feria de Manizales', 'Evento tradicional de la ciudad', 5000, '2024-01-05 10:00:00', '2024-01-12 22:00:00', NULL, 4),
('Feria del Libro', 'Evento literario con autores nacionales', 1000, '2023-11-22 09:00:00', '2023-11-26 20:00:00', NULL, 4),
('Expoartesanías', 'Feria de artesanías colombianas', 800, '2023-12-07 10:00:00', '2023-12-10 20:00:00', NULL, 4),
('Feria Gastronómica', 'Muestra de cocina regional', 600, '2023-11-30 11:00:00', '2023-12-03 21:00:00', NULL, 4),
('Feria de Emprendimiento', 'Exposición de proyectos innovadores', 400, '2023-12-14 09:00:00', '2023-12-16 19:00:00', NULL, 4);

-- Exposiciones (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Arte Contemporáneo', 'Exposición de artistas emergentes', 200, '2023-11-18 10:00:00', '2023-12-18 18:00:00', NULL, 5),
('Fotografía de Montaña', 'Exposición de paisajes andinos', 150, '2023-11-25 09:00:00', '2023-12-10 19:00:00', NULL, 5),
('Historia de Manizales', 'Exposición sobre la fundación de la ciudad', 100, '2023-12-05 08:00:00', '2024-01-05 17:00:00', NULL, 5),
('Biodiversidad Andina', 'Exposición sobre flora y fauna local', 120, '2023-12-12 10:00:00', '2024-01-12 18:00:00', NULL, 5),
('Arte en Café', 'Obras artísticas realizadas con café', 180, '2023-12-20 09:00:00', '2024-01-20 19:00:00', NULL, 5);

-- Talleres (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Taller de Fotografía', 'Aprende técnicas básicas de fotografía', 30, '2023-11-21 14:00:00', '2023-11-21 18:00:00', 1, 6),
('Cata de Café', 'Aprende a degustar café especial', 20, '2023-11-28 15:00:00', '2023-11-28 17:00:00', 2, 6),
('Cerámica para Principiantes', 'Taller práctico de modelado en arcilla', 15, '2023-12-06 10:00:00', '2023-12-06 13:00:00', 3, 6),
('Huerta Urbana', 'Aprende a cultivar en espacios pequeños', 25, '2023-12-13 09:00:00', '2023-12-13 12:00:00', 4, 6),
('Mixología Básica', 'Prepara cócteles clásicos', 20, '2023-12-19 16:00:00', '2023-12-19 19:00:00', 5, 6);

-- Conferencias (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Innovación Tecnológica', 'Charla sobre tendencias en tecnología', 100, '2023-11-22 16:00:00', '2023-11-22 19:00:00', NULL, 7),
('Sostenibilidad Ambiental', 'Conferencia sobre prácticas sostenibles', 80, '2023-11-29 17:00:00', '2023-11-29 20:00:00', NULL, 7),
('Emprendimiento Social', 'Experiencias de emprendedores sociales', 60, '2023-12-07 15:00:00', '2023-12-07 18:00:00', NULL, 7),
('Historia del Café', 'Conferencia sobre la cultura cafetera', 120, '2023-12-14 14:00:00', '2023-12-14 17:00:00', NULL, 7),
('Arquitectura Colombiana', 'Charla sobre arquitectura contemporánea', 90, '2023-12-21 16:00:00', '2023-12-21 19:00:00', NULL, 7);

-- Festivales (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Festival de Teatro', 'Presentación de obras teatrales', 300, '2023-11-23 10:00:00', '2023-11-26 22:00:00', NULL, 8),
('Festival de Cine', 'Proyección de películas independientes', 200, '2023-11-30 14:00:00', '2023-12-03 22:00:00', NULL, 8),
('Festival de la Luna', 'Celebración cultural nocturna', 400, '2023-12-08 18:00:00', '2023-12-10 23:00:00', NULL, 8),
('Festival de Danza', 'Presentación de grupos de danza', 250, '2023-12-15 15:00:00', '2023-12-17 21:00:00', NULL, 8),
('Festival de la Luz', 'Espectáculo de luces y proyecciones', 500, '2023-12-22 19:00:00', '2023-12-24 23:00:00', NULL, 8);

-- Deportes (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Torneo de Fútbol', 'Competencia local de fútbol amateur', 200, '2023-11-24 08:00:00', '2023-11-26 18:00:00', NULL, 9),
('Clínica de Ciclismo', 'Taller práctico de ciclismo de montaña', 50, '2023-12-01 07:00:00', '2023-12-01 12:00:00', NULL, 9),
('Torneo de Ajedrez', 'Competencia abierta de ajedrez', 40, '2023-12-09 09:00:00', '2023-12-09 17:00:00', NULL, 9),
('Yoga en el Parque', 'Sesión masiva de yoga al aire libre', 150, '2023-12-16 07:00:00', '2023-12-16 09:00:00', NULL, 9),
('Escalada Deportiva', 'Taller y demostración de escalada', 30, '2023-12-23 08:00:00', '2023-12-23 14:00:00', NULL, 9);

-- Culturales (5)
INSERT INTO events (name, description, capacity, start_date, end_date, local_id, category_event_id) VALUES
('Noche de Museos', 'Apertura nocturna de museos de la ciudad', 300, '2023-11-27 18:00:00', '2023-11-27 23:00:00', NULL, 10),
('Recorrido Histórico', 'Tour guiado por sitios históricos', 25, '2023-12-02 10:00:00', '2023-12-02 13:00:00', NULL, 10),
('Presentación de Libro', 'Lanzamiento de libro local', 80, '2023-12-11 17:00:00', '2023-12-11 19:00:00', NULL, 10),
('Poesía al Parque', 'Lectura de poesía al aire libre', 60, '2023-12-18 16:00:00', '2023-12-18 18:00:00', NULL, 10),
('Mercado Campesino', 'Feria de productos agrícolas locales', 200, '2023-12-24 08:00:00', '2023-12-24 14:00:00', NULL, 10);