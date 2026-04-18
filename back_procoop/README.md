Backend desarrollado con Java 21 y Spring Boot.

Se utilizó Spring Initializr para generar la estructura base del proyecto,
incluyendo las dependencias necesarias para la creación de una API REST.

Dependencias principales:
- Spring Web: para la creación de endpoints REST.
- Spring Data JPA: para la persistencia de datos.
- MySQL Driver: conexión con la base de datos.
- Lombok: reducción de código repetitivo (getters/setters).

El proyecto sigue una arquitectura en capas:
controller - service - repository - model.

Se configuró la conexión a una base de datos MySQL utilizando Spring Data JPA.
Se creó la entidad Producto, la cual representa los productos del sistema.
Se implementó el repositorio ProductoRepository utilizando Spring Data JPA.