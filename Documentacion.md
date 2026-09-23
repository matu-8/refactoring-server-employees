# Documentación: Refactorización y Principios SOLID

Documento de referencia sobre la arquitectura y la aplicación de los principios SOLID en el proyecto `refactoring-server-employees`.

---

## 1. Estructura del Proyecto (`src/`)

El directorio `src/` está organizado en una arquitectura por capas desacoplada:

* **`src/app.ts`**: Configuración de Express, middlewares globales y montaje de rutas.
* **`src/server.ts`**: Punto de entrada, conexión a la base de datos y levantamiento del servidor.
* **`src/controllers/`** (`employee.controller.ts`): Gestión de la capa de transporte HTTP (`req`, `res`, códigos de estado).
* **`src/services/`** (`employee.service.ts`): Lógica de negocio y validaciones de dominio.
* **`src/repositories/`** (`employee.repository.ts`): Acceso a datos y operaciones directas con el ODM (Mongoose).
* **`src/models/`** (`employee.model.ts`): Esquema y definición del modelo en MongoDB.
* **`src/routes/`** (`employee.route.ts`): Definición de rutas, metodos HTTP, instanciacion e inyeccion de dependencias.
* **`src/interfaces/`** (`employee.interface.ts`): Tipos y contratos (entidades, DTOs e interfaces de repositorios).
* **`src/errorHandler/`** (`error.handler.ts`, `error.handler.middleware.ts`): Jerarquía de excepciones personalizadas y middleware global de errores.

---

## 2. Aplicación de los Principios SOLID en el Código

### S — Single Responsibility Principle (Responsabilidad Única)
* **Dónde encontrarlo:**
  * `src/controllers/employee.controller.ts`: Se limita únicamente a interactuar con el protocolo HTTP (extraer datos de la petición y emitir la respuesta).
  * `src/services/employee.service.ts`: Contiene exclusivamente las reglas de negocio; no conoce nada sobre peticiones Express (`req`, `res`).
  * `src/repositories/employee.repository.ts`: Responsable únicamente de interactuar con la base de datos y ejecutar consultas Mongoose.
  * `src/errorHandler/error.handler.middleware.ts`: Centraliza la captura y formato de respuestas de error, evitando bloques de manejo de errores redundantes en cada capa.

### O — Open/Closed Principle (Abierto / Cerrado)
* **Dónde encontrarlo:**
  * `src/errorHandler/error.handler.ts`: Permite crear nuevos tipos de error extendiendo de una clase base común sin modificar el middleware de control.
  * `src/errorHandler/error.handler.middleware.ts`: Está cerrado a modificaciones; cualquier error nuevo derivado es procesado automáticamente por su código de estado.
  * `src/routes/employee.route.ts`: Permite registrar nuevos endpoints y operaciones sin alterar la configuración del servidor en `src/app.ts`.

### L — Liskov Substitution Principle (Sustitución de Liskov)
* **Dónde encontrarlo:**
  * `src/errorHandler/error.handler.ts`: Las clases de error personalizadas heredan de la clase base y de `Error`, pudiendo sustituirse entre sí en el middleware sin romper la aplicación.
  * `src/interfaces/employee.interface.ts`: Cualquier clase que implemente los contratos de repositorio puede sustituir a la implementación real sin alterar el comportamiento esperado por el servicio.

### I — Interface Segregation Principle (Segregación de Interfaces)
* **Dónde encontrarlo:**
  * `src/interfaces/employee.interface.ts`:
    * Contratos segregados para creación/actualización (DTOs) que no fuerzan a utilizar campos generados por el sistema (como `id` o marcas de tiempo).
    * Contratos específicos para la persistencia, evitando que el servicio dependa de métodos del ODM que no necesita.

### D — Dependency Inversion Principle (Inversión de Dependencias)
* **Dónde encontrarlo:**
  * `src/services/employee.service.ts`: Recibe el repositorio por constructor; depende de la abstracción de persistencia y no directamente de Mongoose ni del modelo.
  * `src/controllers/employee.controller.ts`: Recibe la instancia del servicio mediante inyección de dependencias en su constructor.
  * `src/routes/employee.route.ts`: Actúa como punto de composición donde se instancian e inyectan las capas (Repositorio $\rightarrow$ Servicio $\rightarrow$ Controlador).
