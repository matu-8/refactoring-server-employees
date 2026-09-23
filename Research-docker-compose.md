# Documentación: Configuración de Contenedores con Docker Compose

## 1. Introducción

Docker Compose es una herramienta que permite definir y ejecutar aplicaciones Docker multi-contenedor mediante un archivo de configuración en formato YAML. El archivo `docker-compose.yml` presente en este proyecto constituye la especificación técnica que orquesta los servicios necesarios para el funcionamiento de la aplicación de gestión de empleados, específicamente la instancia de base de datos MongoDB.

---

## 2. Objetivos del Archivo

El archivo `docker-compose.yml` cumple con las siguientes finalidades:

- **Definición declarativa de infraestructura**: Especifica de manera centralizada y reproducible la configuración de los contenedores requeridos por la aplicación.
- **Automatización del despliegue**: Permite que cualquier desarrollador pueda iniciar el entorno completo con un único comando (`docker-compose up`).
- **Persistencia de datos**: Configura mecanismos de almacenamiento duradero para la base de datos, garantizando que los datos no se pierdan tras el ciclo de vida del contenedor.
- **Estandarización del entorno**: Asegura que todos los miembros del equipo trabajen con la misma configuración de servicios.

### 2.2 Alcance del Proyecto

Este archivo está diseñado específicamente para gestionar un único servicio principal: la base de datos MongoDB versión 8, que sirve como almacén de datos persistente para la aplicación de refactorización de gestión de empleados.

---

## 3. Estructura Jerárquica del Archivo

### 3.1 Niveles Principales

El archivo `docker-compose.yml` está organizado en dos niveles principales:

```
docker-compose.yml
├── services          (Nivel 1: Definición de contenedores)
│   └── mongodb       (Nivel 2: Configuración específica del servicio)
└── volumes          (Nivel 1: Definición de volúmenes persistentes)
    └── mongo_data   (Nivel 2: Especificación del volumen)
```

---

## 4. Análisis Detallado de Componentes

### 4.1 Sección `services`

La sección `services` constituye el núcleo del archivo de composición, donde se definen todos los contenedores que conformarán la aplicación.

#### 4.1.1 Servicio MongoDB

```yaml
services:
  mongodb:
    image: mongo:8
    container_name: empleados-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
```

**Descripción**: Define un servicio de base de datos MongoDB que ejecutará una instancia de la versión 8 del motor de base de datos.

#### 4.1.2 Campos de Configuración

##### `image: mongo:8`

- **Propósito**: Especifica la imagen Docker a partir de la cual se construirá el contenedor.
- **Valor**: `mongo:8` hace referencia a la versión 8 de MongoDB desde el registro oficial de Docker Hub.
- **Implicaciones técnicas**: Docker descargará automáticamente esta imagen la primera vez que se ejecute `docker-compose up`. Las actualizaciones de versión menor se obtendrán automáticamente.

##### `container_name: empleados-mongodb`

- **Propósito**: Asigna un nombre específico al contenedor en lugar de utilizar el identificador aleatorio generado por defecto.
- **Valor**: `empleados-mongodb` proporciona una identificación semántica clara del contenedor.
- **Ventajas**:
  - Facilita la identificación del contenedor en listados (`docker ps`).
  - Permite referencias consistentes en scripts y documentación.
  - Mejora la legibilidad de los logs y monitoreo.

##### `restart: unless-stopped`

- **Propósito**: Define la política de reinicio automático del contenedor ante fallos.
- **Valor**: `unless-stopped` indica que el contenedor se reiniciará automáticamente si se detiene inesperadamente, excepto si fue detenido manualmente.
- **Políticas disponibles**:
  - `no`: No reinicia automáticamente.
  - `always`: Siempre reinicia, incluso si se detiene manualmente.
  - `on-failure`: Reinicia solo si el contenedor termina con un código de error diferente a cero.
  - `unless-stopped`: Reinicia a menos que haya sido detenido explícitamente.

**Justificación**: La política `unless-stopped` es apropiada para servicios críticos como bases de datos, garantizando disponibilidad continua sin reiniciar contenedores que fueron detenidos deliberadamente.

##### `ports: "27017:27017"`

- **Propósito**: Establece el mapeo de puertos entre el host y el contenedor.
- **Formato**: `"puerto_host:puerto_contenedor"`
- **Interpretación**:
  - `27017` (puerto host): Puerto en la máquina local donde se accede a MongoDB.
  - `27017` (puerto contenedor): Puerto donde MongoDB escucha dentro del contenedor.

**Implicaciones técnicas**:
- Permite que aplicaciones ejecutándose en el host accedan a MongoDB mediante `localhost:27017`.
- Si el puerto 27017 estuviera ocupado en el host, se podría mapear a otro puerto (ej: `27018:27017`).
- Es necesario que el puerto no esté bloqueado por firewall o se esté usando por otro proceso.

##### `volumes: - mongo_data:/data/db`

- **Propósito**: Monta un volumen persistente en el contenedor para almacenar datos.
- **Desglose**:
  - `mongo_data`: Nombre del volumen definido en la sección `volumes`.
  - `/data/db`: Ruta dentro del contenedor donde MongoDB almacena sus datos.

**Importancia**: Sin este volumen, todos los datos se perderían cuando el contenedor se detuviera. Con el volumen, los datos persisten entre ciclos de vida del contenedor.

---

### 4.2 Sección `volumes`

```yaml
volumes:
  mongo_data:
```

**Propósito**: Define volúmenes nombrados que pueden ser referenciados por uno o más servicios.

**Especificación `mongo_data`**:
- Es un volumen nombrado que Docker crea automáticamente al ejecutar `docker-compose up`.
- Se almacena en la ruta del host gestionada por Docker (típicamente `/var/lib/docker/volumes/`).
- Permite persistencia de datos independiente del ciclo de vida del contenedor.
- Puede ser compartido entre múltiples contenedores si es necesario.

**Ventajas respecto a volúmenes bind mount**:
- Mayor rendimiento en sistemas Windows y Mac.
- Mejor portabilidad entre diferentes entornos.
- Gestión centralizada por Docker.
- Facilita backup y migración de datos.

---

## 5. Flujo de Ejecución

### 5.1 Inicialización del Entorno

Cuando se ejecuta `docker-compose up`, ocurre el siguiente proceso:

1. **Lectura de configuración**: Docker Compose lee el archivo `docker-compose.yml`.
2. **Validación de sintaxis**: Verifica que el YAML sea válido.
3. **Creación de volúmenes**: Si `mongo_data` no existe, lo crea.
4. **Descarga de imagen**: Si `mongo:8` no está en caché local, la descarga desde Docker Hub.
5. **Creación del contenedor**: Instancia el contenedor con el nombre `empleados-mongodb`.
6. **Configuración de puertos**: Mapea el puerto 27017.
7. **Montaje de volúmenes**: Conecta el volumen `mongo_data` a `/data/db` dentro del contenedor.
8. **Inicio del servicio**: Ejecuta MongoDB dentro del contenedor.

### 5.2 Operaciones Comunes

```bash
# Iniciar los servicios
docker-compose up

# Iniciar en modo detached (segundo plano)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f mongodb

# Detener servicios (preservan datos)
docker-compose stop

# Detener y eliminar contenedores (preservan volúmenes)
docker-compose down

# Eliminar todo incluyendo volúmenes
docker-compose down -v
```
