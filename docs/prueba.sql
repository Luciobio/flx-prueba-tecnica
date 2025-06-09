-- Crear tabla LOCALIDADES
CREATE TABLE localidades (
  id SERIAL PRIMARY KEY,
  activo INT NOT NULL,
  localidad VARCHAR(80) NOT NULL
);

-- Crear tabla DEPARTAMENTOS
CREATE TABLE departamentos (
  id SERIAL PRIMARY KEY,
  denominacion VARCHAR(80) NOT NULL,
  localidad_id INT NOT NULL,
  CONSTRAINT fk_localidad FOREIGN KEY (localidad_id) REFERENCES localidades(id)
);

-- Crear tabla PUESTOS
CREATE TABLE puestos (
  id SERIAL PRIMARY KEY,
  activo INT NOT NULL,
  puesto VARCHAR(80) NOT NULL
);

-- Crear tabla EMPLEADOS
CREATE TABLE empleados (
  id SERIAL PRIMARY KEY,
  apellido VARCHAR(80) NOT NULL,
  comision DOUBLE PRECISION,
  departamento_id INT NOT NULL,
  edad INT,
  fechaalta DATE,
  nombres VARCHAR(80) NOT NULL,
  puesto_id INT NOT NULL,
  sueldo DOUBLE PRECISION,
  CONSTRAINT fk_departamento FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
  CONSTRAINT fk_puesto FOREIGN KEY (puesto_id) REFERENCES puestos(id)
);

-- Insertar datos en LOCALIDADES
INSERT INTO localidades (activo, localidad) VALUES
(1, 'Córdoba'),
(1, 'Carlos Paz'),
(1, 'Villa María'),
(1, 'Río Cuarto');


-- Insertar datos en DEPARTAMENTOS
INSERT INTO departamentos (denominacion, localidad_id) VALUES
('Refinamiento de Macro-datos', 1),
('Soporte', 2),
('Mamiferos Criables', 3),
('Óptica y diseño', 1),
('Coreografía y jolgorio', 4),
('Bienestar', 1),
('Genética e ingeniería', 1),
('Seguridad e Inteligencia', 1),
('Gestion', 1),
('Elevador Negro', 1);


-- Insertar datos en PUESTOS
INSERT INTO puestos (activo, puesto) VALUES
(1, 'Soporte'),
(1, 'Analista'),
(1, 'Programador');


-- Insertar datos en EMPLEADOS
INSERT INTO empleados (apellido, comision, departamento_id, edad, fechaalta, nombres, puesto_id, sueldo) VALUES
('González', 500.50, 2, 35, '2020-05-10', 'Ana', 1, 850),
('Pérez', 300.00, 1, 29, '2019-03-15', 'Juan', 3, 1500),
('Pardo', 500.50, 2, 35, '2020-05-10', 'Luciano', 3, 920),
('Matorraz', 250.00, 2, 32, '2021-06-20', 'Nicanor', 1, 830),
('Moreno', 300.00, 3, 29, '2019-03-15', 'Mariano', 3, 1500),
('Ramírez', NULL, 4, 42, '2018-11-30', 'Lucía', 2, 1300),
('Ramírez', NULL, 10, 42, '2018-11-30', 'Joselo', 2, 11000),
('Pérez', 300.00, 1, 28, '2019-03-15', 'Urbano', 3, 15000), 
('Pérez', 300.00, 1, 32, '2019-03-15', 'Jacinto', 2, 13000), 
('Pérez', 300.00, 1, 22, '2019-03-15', 'Mikaela', 3, 15000), 
('Pérez', 300.00, 1, 40, '2019-03-15', 'Monica', 3, 15000),
('Jobs', 300.00, 1, 40, '2019-03-15', 'Steve', 3, 15000),
('Pérez', 300.00, 10, 29, '2019-03-15', 'Alister', 3, 30000);