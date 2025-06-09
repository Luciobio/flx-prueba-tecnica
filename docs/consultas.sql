-- En este archivo deben estar tus ejercicios de consultas sql

/* 1. **Empleados ordenados alfabéticamente (Z...A):**  
   Muestra los nombres de los empleados en orden alfabético descendente. */
SELECT nombres
FROM empleados
ORDER BY nombres DESC;

/* 2. **Empleados de Soporte:**  
   Muestra el nombre, el puesto y la localidad de los empleados con el puesto de 'Soporte'. */
SELECT 
  empleados.nombres,
  puestos.puesto,
  localidades.localidad
FROM empleados
JOIN puestos ON empleados.puesto_id = puestos.id
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE puestos.puesto = 'Soporte';

/* 3. **Nombres que terminan con 'o':**  
   Lista los nombres de los empleados cuyo nombre termina con la letra 'o'. */
SELECT nombres
FROM empleados
WHERE nombres LIKE '%o';

/* 4. **Empleados en Carlos Paz:**  
   Muestra el nombre, sueldo y localidad de los empleados que trabajan en la localidad Carlos Paz. */
SELECT 
  empleados.nombres,
  empleados.sueldo,
  localidades.localidad
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE localidades.localidad = 'Carlos Paz';

/* 5. **Sueldos entre 10000 y 13000:**  
   Muestra el nombre, sueldo y localidad de los empleados cuyo sueldo se encuentra entre 10000 y 13000. */
SELECT 
  empleados.nombres,
  empleados.sueldo,
  localidades.localidad
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
WHERE empleados.sueldo BETWEEN 10000 AND 13000;

/* 6. **Departamentos con más de 5 empleados:**  
   Visualiza los departamentos que tienen más de 5 empleados. */
SELECT 
  departamentos.denominacion --, COUNT(empleados.id) AS num_de_empleados // para agregar el número de empelados en el departamento
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
GROUP BY departamentos.id, departamentos.denominacion
HAVING COUNT(empleados.id) > 5;

/* 7. **Empleados en Córdoba con puesto de Analista o Programador:**  
   Muestra los nombres de los empleados que trabajan en Córdoba y tienen el puesto de 'Analista' o 'Programador'. */
SELECT empleados.nombres --, puestos.puesto // para visualizar el puesto de cada empleado
FROM empleados
JOIN departamentos ON empleados.departamento_id = departamentos.id
JOIN localidades ON departamentos.localidad_id = localidades.id
JOIN puestos ON empleados.puesto_id = puestos.id
WHERE localidades.localidad = 'Córdoba' AND puestos.puesto IN ('Analista', 'Programador');

/* 8. **Sueldo medio de todos los empleados:**  
   Calcula el sueldo medio de todos los empleados. */
SELECT AVG(sueldo) AS sueldo_medio
FROM empleados;

/* 9. **Máximo sueldo en el departamento 10:**  
   Muestra el máximo sueldo de los empleados del departamento 10. */
SELECT MAX(sueldo) AS sueldo_max_10
FROM empleados
WHERE departamento_id = 10;

/* 10. **Sueldo mínimo en el departamento Soporte:**  
    Calcula el sueldo mínimo de los empleados del departamento 'Soporte'. */
SELECT MIN(sueldo) AS sueldo_min_soporte
FROM empleados
WHERE departamentos.denominacion = 'Soporte';

/* 11. **Suma de sueldos por puesto:**  
    Calcula la suma de sueldos para cada puesto. */
SELECT puestos.puesto, SUM(empleados.sueldo) AS suma_sueldos_por_puesto
FROM empleados
JOIN puestos ON empleados.puesto_id = puestos.id
GROUP BY puestos.puesto;

/* Además de las consultas, creé las tablas necesarias y cargué registros de prueba para poder probarlas. 
do esto está incluido en el archivo prueba.sql. */