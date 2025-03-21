-- DDL

CREATE DATABASE DBparchon;
CREATE USER USERparchon@'%' IDENTIFIED BY 'PASSparchon';
GRANT ALL PRIVILEGES ON DBparchon.* TO USERparchon@'%';
FLUSH PRIVILEGES;

CREATE TABLE `Department` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `department` varchar(255) NOT NULL
);

CREATE TABLE `City` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `city` varchar(255) NOT NULL,
  `id_department` integer NOT NULL
);

CREATE TABLE `User` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `birth` date NOT NULL,
  `gender` enum('m','f','o') NOT NULL,
  `phone` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_city` integer NOT NULL,
  `id_role` integer NOT NULL DEFAULT 1
);

CREATE TABLE `Role` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL
);

CREATE TABLE `Place` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `place` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `id_city` integer NOT NULL
);

CREATE TABLE `Event` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `event` varchar(255) NOT NULL,
  `description` varchar(1000),
  `details` TEXT NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `image` varchar(255),
  `capacity` integer NOT NULL,
  `rating` integer,
  `id_user` integer NOT NULL,
  `id_place` integer NOT NULL,
  `id_category` integer NOT NULL
);

CREATE TABLE `Category` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL
);

CREATE TABLE `Ticket` (
  `id_event` integer NOT NULL,
  `id` integer,
  `price` varchar(25),
  `remaining` integer,
  `id_tier` integer NOT NULL,
  PRIMARY KEY (`id_event`, `id`)
);

CREATE TABLE `Tier` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `tier` varchar(255) NOT NULL,
  `description` varchar(500)
);

CREATE TABLE `TicketUser` (
  `id_user` integer NOT NULL,
  `id_event` integer NOT NULL,
  `id_ticket` integer,
  `quantity` integer NOT NULL,
  PRIMARY KEY (`id_user`, `id_event`, `id_ticket`)
);

CREATE TABLE `UserEvent` (
  `id_user` integer NOT NULL,
  `id_event` integer NOT NULL,
  PRIMARY KEY (`id_user`, `id_event`)
);

CREATE TABLE `Image` (
  `id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `url` TEXT NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_event` INT NOT NULL,
  `id_user` INT NOT NULL
);

CREATE TABLE 'Like' (
  `id_image` integer NOT NULL,
  `id_user` integer NOT NULL,
  PRIMARY KEY (`id_image`, `id_user`)
);


ALTER TABLE `City` ADD FOREIGN KEY (`id_department`) REFERENCES `Department` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`id_city`) REFERENCES `City` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`id_role`) REFERENCES `Role` (`id`);

ALTER TABLE `Place` ADD FOREIGN KEY (`id_city`) REFERENCES `City` (`id`); 

ALTER TABLE `Event` ADD FOREIGN KEY (`id_category`) REFERENCES `Category` (`id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`id_place`) REFERENCES `Place` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`id_event`) REFERENCES `Event` (`id`);

ALTER TABLE `Ticket` ADD FOREIGN KEY (`id_tier`) REFERENCES `Tier` (`id`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_event`) REFERENCES `Ticket` (`id_event`);

ALTER TABLE `TicketUser` ADD FOREIGN KEY (`id_event`, `id_ticket`) REFERENCES `Ticket` (`id_event`, `id`);

ALTER TABLE `UserEvent` ADD FOREIGN KEY (`id_event`) REFERENCES `Event` (`id`);

ALTER TABLE `UserEvent` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `Image` ADD FOREIGN KEY (`id_event`) REFERENCES `Event` (`id`);

ALTER TABLE `Image` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);

ALTER TABLE `Like` ADD FOREIGN KEY (`id_image`) REFERENCES `Image` (`id`);

ALTER TABLE `Like` ADD FOREIGN KEY (`id_user`) REFERENCES `User` (`id`);
-- If need a Superuser to create the Trigger
-- Login as root and type:
-- SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$

CREATE TRIGGER `before_ticket_insert` 
BEFORE INSERT ON `Ticket`
FOR EACH ROW 
BEGIN
  DECLARE max_id INT;

  -- Obtener el mayor id para el id_event actual
  SELECT IFNULL(MAX(id), 0) INTO max_id 
  FROM Ticket 
  WHERE id_event = NEW.id_event;

  -- Incrementar en 1 el mayor id para el nuevo ticket
  SET NEW.id = max_id + 1;
END$$

DELIMITER ;

-- DML
INSERT INTO 'Role' ('role') VALUES 
('User'),
('Guest'),
('Administrator');

INSERT INTO 'Department' ('department') VALUES
('Amazonas'),
('Antioquía'),
('Arauca'),
('Atlántico'),
('Bolívar'),
('Boyacá'),
('Caldas'),
('Caquetá'),
('Casanare'),
('Cauca'),
('Cesar'),
('Chocó'),
('Córdoba'),
('Cundinamarca'),
('Guainía'),
('Guaviare'),
('Huila'),
('La Guajira'),
('Magdalena'),
('Meta'),
('Nariño'),
('Norte de Santander'),
('Putumayo'),
('Quindío'),
('Risaralda'),
('San Andrés y Providencia'),
('Santander'),
('Sucre'),
('Tolima'),
('Valle del Cauca'),
('Vaupés'),
('Vichada');

INSERT INTO 'City' ('city', 'id_department') VALUES
('Leticia', 1),
('Medellín', 2),
('Arauca', 3),
('Barranquilla', 4),
('Cartagena de Indias', 5),
('Tunja', 6),
('Manizales', 7),
('Florencia', 8),
('Yopal', 9),
('Popayán', 10),
('Valledupar', 11),
('Quibdó', 12),
('Montería', 13),
('Bogotá', 14),
('Inírida', 15),
('San José del Guaviare', 16),
('Neiva', 17),
('Riohacha', 18),
('Santa Marta', 19),
('Villavicencio', 20),
('San Juan de Pasto', 21),
('San José de Cúcuta', 22),
('Mocoa', 23),
('Armenia', 24),
('Pereira', 25),
('San Andrés', 26),
('Bucaramanga', 27),
('Sincelejo', 28),
('Ibagué', 29),
('Cali', 30),
('Mitú', 31),
('Puerto Carreño', 32);

INSERT INTO `Tier` (`tier`, `description`) VALUES
('General', 'Acceso general para todos los asistentes'),
('Meet and Greet', 'Oportunidad de conocer a los artistas o conferencistas'),
('VIP', 'Acceso VIP con beneficios adicionales como bebidas y aperitivos gratuitos'),
('Platino', 'Acceso exclusivo con asientos prioritarios y beneficios adicionales'),
('Oro', 'Acceso preferencial con asientos mejorados y beneficios adicionales'),
('Plata', 'Acceso mejorado con asientos preferenciales y algunos beneficios adicionales'),
('Bronce', 'Acceso básico con asientos asignados');

INSERT INTO `Category` (`category`) VALUES
('Parche'),
('Concierto'),
('Conferencia'),
('Festival'),
('Taller'),
('Seminario'),
('Feria'),
('Exposición'),
('Evento Deportivo'),
('Obra de Teatro'),
('Película'),
('Gastronomía'),
('Tecnología'),
('Ciencia'),
('Literatura'),
('Arte'),
('Música'),
('Danza'),
('Cultura'),
('Otros');

INSERT INTO `Place` (`place`, `address`, `id_city`) VALUES
('Estadio Atanasio Girardot', 'Cra. 74 #48010', 2),
('2150', 'Cra. 23 #65-45}', 7);

INSERT INTO `Event` (`event`, `description`, `details`, `date`, `time`, `image`, `capacity`,`id_user`, `id_place`, `id_category`) VALUES
('Ferxxo Calipsis','Disfruta de un concierto de Feid completamente en vivo', 'Ferxxo Calipsis es el concierto más esperado del año, trayendo consigo la energía vibrante y la presencia arrolladora de Feid. Este evento promete una noche inolvidable en el Estadio Atanasio Girardot en Medellín, un lugar icónico que ha sido testigo de los espectáculos más grandiosos.

Desde el momento en que las puertas se abran, los asistentes serán recibidos con una atmósfera cargada de anticipación y emoción. La noche comenzará con una increíble serie de teloneros, seleccionados cuidadosamente para calentar el escenario y preparar al público para la actuación principal.

Feid, conocido por su estilo único y su capacidad para conectar con la audiencia, ofrecerá un repertorio que incluirá sus mayores éxitos y algunas sorpresas exclusivas. Su espectáculo en vivo combinará una impresionante producción visual, efectos especiales de última generación y una calidad de sonido impecable que hará que cada nota resuene en el corazón de los asistentes.

Además de la música, Ferxxo Calipsis contará con zonas VIP donde los fans podrán disfrutar de beneficios adicionales, como acceso a áreas exclusivas, bebidas y aperitivos gratuitos, y la posibilidad de conocer al artista en persona. Los asistentes también podrán encontrar una variada oferta gastronómica dentro del estadio, que incluirá opciones para todos los gustos.

Este evento no es solo un concierto, es una experiencia completa diseñada para ofrecer una noche de diversión, buena música y recuerdos imborrables. Si eres fanático de Feid o simplemente amante de los conciertos en vivo, Ferxxo Calipsis es un evento que no querrás perderte. ¡Nos vemos allí!', '2024-12-08', '21:00', '/det.png', 45000, 1, 1, 2),

('RCP 2024',
'La mejor fiesta para los estudiantes de medicina de Manizales.',
'RCP 2024 será una noche llena de música, diversión y camaradería para todos los estudiantes de medicina de Manizales. Este evento ofrecerá un ambiente vibrante con los mejores DJs locales y nacionales, iluminación espectacular y una pista de baile diseñada para que nadie pare de moverse.

Además, habrá áreas de descanso, barras de bebidas con opciones variadas y zonas de comidas con una amplia oferta gastronómica.

Los asistentes podrán disfrutar de juegos y actividades interactivas, creando así una experiencia inolvidable que va más allá de una simple fiesta. ¡Prepárate para una noche épica en la RCP 2024!',
'2024-10-18',
'22:00',
'/2150.png',
500,
1,
2,
4);

-- Tickets to "Ferxxo Calipsis"
INSERT INTO `Ticket` (`id_event`, `price`, `remaining`, `id_tier`) VALUES
(1, '500000', 20000, (SELECT id FROM Tier WHERE tier = 'General')),
(1, '1500000', 5000, (SELECT id FROM Tier WHERE tier = 'VIP')),
(1, '1000000', 3000, (SELECT id FROM Tier WHERE tier = 'Platino')),
(1, '800000', 4000, (SELECT id FROM Tier WHERE tier = 'Oro')),
(1, '600000', 5000, (SELECT id FROM Tier WHERE tier = 'Plata')),
(1, '400000', 8000, (SELECT id FROM Tier WHERE tier = 'Bronce'));

-- Tickets to "RCP 2024"
INSERT INTO `Ticket` (`id_event`, `price`, `remaining`, `id_tier`) VALUES
(2, '25000', 400, (SELECT id FROM Tier WHERE tier = 'General')),
(2, '40000', 500, (SELECT id FROM Tier WHERE tier = 'Oro'));
