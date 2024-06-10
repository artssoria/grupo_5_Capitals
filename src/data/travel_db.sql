-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2024 a las 22:13:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `travel_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `total_price` decimal(40,2) DEFAULT NULL,
  `amount_elements` int(11) DEFAULT NULL,
  `concreted` tinyint(1) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carts`
--

INSERT INTO `carts` (`id`, `total_price`, `amount_elements`, `concreted`, `users_id`) VALUES
(1, 80000.00, 2, 1, 2),
(2, 40000.00, 1, 1, 2),
(3, 70000.00, 1, 1, 2),
(4, 0.00, 0, 0, 3),
(5, 0.00, 0, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentaries`
--

CREATE TABLE `comentaries` (
  `id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `score` int(11) DEFAULT NULL CHECK (`score` >= 0 and `score` <= 5),
  `products_id` int(11) DEFAULT NULL,
  `users_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lodgings`
--

CREATE TABLE `lodgings` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lodgings`
--

INSERT INTO `lodgings` (`id`, `name`, `description`) VALUES
(1, 'Hotel', 'Se brinda un circuito a través de diferentes hoteles de 3 a 5 estrellas, con desayuno, almuerzo, cena y coffee break incluidos durante su estadía'),
(2, 'Hostal', 'Se brinda un circuito a través de diferentes hoteles de 3 a 5 estrellas, con desayuno, almuerzo, cena y coffee break incluidos durante su estadía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nationalities`
--

CREATE TABLE `nationalities` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nationalities`
--

INSERT INTO `nationalities` (`id`, `name`) VALUES
(1, 'Argentina'),
(2, 'Brasil'),
(3, 'Bolivia'),
(4, 'Chile'),
(5, 'Paraguay'),
(6, 'Perú'),
(7, 'Uruguay');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img` text DEFAULT NULL,
  `price` decimal(40,2) DEFAULT NULL,
  `lodgings_id` int(11) DEFAULT NULL,
  `services_id` int(11) DEFAULT NULL,
  `regions_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `img`, `price`, `lodgings_id`, `services_id`, `regions_id`) VALUES
(1, 'Termas de caimancito', 'Un viaje de autoconocimiento y sanación en el que, además, podrás sacar a relucir toda tu pasión, ya sea por aventurero y viajero o por complaciente y conocedor. Sumergete hacia rutas y paisajes imperdibles que permiten desatar toda tu curiosidad de querer adentrarte más y más.\r\nEste paquete de viaje express permite una experiencia única y de valor por los 6 días que incluye, más desayuno y merienda.', '/images/imagen-1718043997220.jpg', 50000.00, 1, 3, 4),
(2, 'Termas de Reyes ', 'Un viaje de aventura hacia rutas y paisajes impredibles más una buena dosis de fiestas y cultura imperdibles, a través de unlugar mágico en el que podrás disfrutar de las míticas termas del valle de Reyes. Disfruta de 7 días imperdibles de relajación y diversión mientras aprecias las altas montañas que rodean este escenario de grandes hazañas culturales.', '/images/imagen-1718042351355.jpg', 70000.00, 1, 2, 1),
(3, 'Viaje de descubrimiento', 'Un viaje de seis días a la Quebrada de Jujuy es una experiencia inolvidable llena de descubrimiento y pasión. Día 1: Explora Purmamarca y el majestuoso Cerro de los Siete Colores. Día 2: Visita las Salinas Grandes, un deslumbrante paisaje blanco. Día 3: Descubre la historia y la cultura en Tilcara, con su Pucará y el Jardín Botánico. Día 4: Sumérgete en la belleza natural de Humahuaca y su imponente Monumento a los Héroes de la Independencia. Día 5: Aventúrate a Iruya, un pintoresco pueblo de montaña. Día 6: Disfruta de la artesanía local y la gastronomía andina antes de despedirte de este mágico lugar.', '/images/1709362335536.png', 150000.00, 1, 3, 2),
(4, 'Viaje por los campos', 'Un viaje tradicional que contempla hermosos paisajes a través de...', '/images/imagen-1718046301572.jpg', 60000.00, 2, 1, 4),
(7, 'asdasdasd', 'asdasdasd', '/images/defecto.png', 15000.00, 1, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_carts`
--

CREATE TABLE `products_carts` (
  `id` int(11) NOT NULL,
  `amount_products` int(11) DEFAULT NULL,
  `carts_id` int(11) DEFAULT NULL,
  `products_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products_carts`
--

INSERT INTO `products_carts` (`id`, `amount_products`, `carts_id`, `products_id`) VALUES
(6, 2, 1, 1),
(18, 1, 2, 1),
(20, 1, 3, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `nationalities_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provinces`
--

INSERT INTO `provinces` (`id`, `name`, `nationalities_id`) VALUES
(1, 'Buenos Aires', 1),
(2, 'Córdoba', 1),
(3, 'Santa Fe', 1),
(4, 'Mendoza', 1),
(5, 'Tucumán', 1),
(6, 'Jujuy', 1),
(7, 'Salta', 1),
(8, 'Santiago del Estero', 1),
(9, 'Río Negro', 1),
(10, 'Catamarca', 1),
(11, 'La Rioja', 1),
(12, 'Santa Cruz', 1),
(13, 'Chubut', 1),
(14, 'Entre Ríos', 1),
(15, 'São Paulo', 2),
(16, 'Rio de Janeiro', 2),
(17, 'Minas Gerais', 2),
(18, 'Bahia', 2),
(19, 'Rio Grande do Sul', 2),
(20, 'La Paz', 3),
(21, 'Santa Cruz', 3),
(22, 'Cochabamba', 3),
(23, 'Potosí', 3),
(24, 'Tarija', 3),
(25, 'Santiago', 4),
(26, 'Valparaíso', 4),
(27, 'Maule', 4),
(28, 'Biobío', 4),
(29, 'Araucanía', 4),
(30, 'Asunción', 5),
(31, 'Central', 5),
(32, 'Alto Paraná', 5),
(33, 'Cordillera', 5),
(34, 'Guairá', 5),
(35, 'Lima', 6),
(36, 'Cuzco', 6),
(37, 'Arequipa', 6),
(38, 'Piura', 6),
(39, 'Junín', 6),
(40, 'Montevideo', 7),
(41, 'Canelones', 7),
(42, 'Maldonado', 7),
(43, 'Rocha', 7),
(44, 'Artigas', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regions`
--

CREATE TABLE `regions` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `regions`
--

INSERT INTO `regions` (`id`, `name`, `description`) VALUES
(1, 'Valles', 'Los Valles de Jujuy te invitan a explorar pintorescos pueblos. Rodeados de campos cultivados y montañas ondulantes, los Valles ofrecen una experiencia tranquila y auténtica. Descubre la calidez de la gente local, prueba los productos frescos de la región y déjate cautivar por la serenidad de este rincón encantador.'),
(2, 'Quebrada', 'Adéntrate en la majestuosa Quebrada de Humahuaca, declarada Patrimonio de la Humanidad. Aquí, las montañas se elevan como guardianes silenciosos mientras te sumerges en la rica historia cultural. Descubre pueblos pintorescos, sitios arqueológicos y colores vibrantes que narran la historia ancestral de la región. Cada rincón de la Quebrada cuenta una historia única.'),
(3, 'Puna', 'En la región de la Puna, la altitud y la vastedad del paisaje te desafían a explorar un mundo de altiplanos y lagunas de aguas cristalinas. Experimenta la conexión con la naturaleza en su estado más puro mientras te maravillas con la flora y fauna adaptadas a estas alturas. La Puna te ofrece un viaje único a través de paisajes remotos y una serenidad que solo se encuentra en las alturas.'),
(4, 'Yungas', 'Sumérgete en la exuberante vegetación de las Yungas, una región donde la selva se encuentra con las montañas. Descubre una biodiversidad única mientras exploras senderos serpenteantes que te llevarán a cascadas ocultas y maravillosas vistas panorámicas. La frescura del clima y la riqueza natural te transportarán a un oasis verde y mágico.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id`, `name`, `description`) VALUES
(1, 'Egresados', 'Paquete que incluye hasta 40 estudiantes que se encuentran en los últimos 2 años de su graduación. Se debe notificar con certificado de la institución'),
(2, 'Familiar', 'Paquete que incluye hasta 8 miembros de la familia del comprador. Se debe acreditar dni de los miembros familiares'),
(3, 'Express', 'Paquete individual');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `phone` text DEFAULT NULL,
  `nationalities_id` int(11) DEFAULT NULL,
  `provinces_id` int(11) DEFAULT NULL,
  `roles_id` int(11) DEFAULT NULL,
  `profile_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `nationalities_id`, `provinces_id`, `roles_id`, `profile_img`) VALUES
(1, 'Diego', 'Arjona', 'admin@admin.com', '$2a$10$75LDTeCntfIHrvE5yIQq/uef6CSNlz55M8omzRWQ2UG2s0RVbsDzC', 'asdasdasd', 1, 1, 2, '/images/usuario_defecto.png'),
(2, 'Diego', 'Arjona', 'admin-1@admin.com', '$2b$10$x2n3SbHz0Rn7dHPmy6Jo/uc3NzjiZIdHsP98cjLLh0RF6LcnuPXh6', '+54388-4867850', 1, 6, 2, '/images/imagen-1717565776772.jpg'),
(3, 'Diego', 'Arjona', 'admin-2@admin.com', '$2a$10$YYIDGR2RH1e6cjuv1YfQk.YLeJSPGELgi57ZMzUhmjuI0ajsNtzf2', '3884-867850', 1, 6, 1, '/images/usuario_defecto.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indices de la tabla `comentaries`
--
ALTER TABLE `comentaries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_id` (`products_id`),
  ADD KEY `users_id` (`users_id`);

--
-- Indices de la tabla `lodgings`
--
ALTER TABLE `lodgings`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lodgings_id` (`lodgings_id`),
  ADD KEY `services_id` (`services_id`),
  ADD KEY `fk_regions_id` (`regions_id`);

--
-- Indices de la tabla `products_carts`
--
ALTER TABLE `products_carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_id` (`carts_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Indices de la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nationalities_id` (`nationalities_id`);

--
-- Indices de la tabla `regions`
--
ALTER TABLE `regions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nationalities_id` (`nationalities_id`),
  ADD KEY `provinces_id` (`provinces_id`),
  ADD KEY `roles_id` (`roles_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `comentaries`
--
ALTER TABLE `comentaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `products_carts`
--
ALTER TABLE `products_carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `comentaries`
--
ALTER TABLE `comentaries`
  ADD CONSTRAINT `comentaries_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `comentaries_ibfk_2` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_regions_id` FOREIGN KEY (`regions_id`) REFERENCES `regions` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`lodgings_id`) REFERENCES `lodgings` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`);

--
-- Filtros para la tabla `products_carts`
--
ALTER TABLE `products_carts`
  ADD CONSTRAINT `products_carts_ibfk_1` FOREIGN KEY (`carts_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `products_carts_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD CONSTRAINT `provinces_ibfk_1` FOREIGN KEY (`nationalities_id`) REFERENCES `nationalities` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`nationalities_id`) REFERENCES `nationalities` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`provinces_id`) REFERENCES `provinces` (`id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
