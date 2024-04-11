# Proyecto API JWT-Roles con MongoDB

## Descripción

Este proyecto consiste en una API (Interfaz de Programación de Aplicaciones) desarrollada en [Node.js](https://nodejs.org/) que utiliza JSON Web Tokens (JWT) para autenticación y autorización de usuarios, gestionando roles mediante la asignación de permisos específicos. La aplicación se conecta a una base de datos MongoDB para almacenar y gestionar la información de usuarios, roles y permisos.

## Características principales

- **Autenticación basada en JWT**: La API utiliza tokens JWT para autenticar a los usuarios y autorizar las solicitudes a recursos protegidos.
- **Gestión de roles y permisos**: Los usuarios son asignados a roles específicos, los cuales determinan los permisos que tienen en la aplicación.
- **Integración con MongoDB**: Se utiliza MongoDB como base de datos para almacenar la información de usuarios, roles y permisos.

## Tecnologías utilizadas

- **Node.js**: Plataforma de ejecución de JavaScript en el servidor.
- **Express.js**: Marco de aplicación web de Node.js utilizado para construir la API RESTful.
- **JSON Web Tokens (JWT)**: Estándar abierto utilizado para crear tokens de acceso.
- **MongoDB**: Sistema de base de datos NoSQL utilizado para almacenar datos de forma flexible y escalable.
- **Bcrypt**: librearia para poder encriptar la password del user en la bd y luego proceso de compare.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/arielZarate/restApi-node_y_express-jwt_y_roles-mongodb
```

2. Instala las dependencias:

   ```bash
   cd tu-proyecto
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`, incluyendo la URL de conexión a la base de datos MongoDB y las claves secretas para la generación de tokens JWT y el puerto donde se ejecutara nodejs (optional , puedes modificarlo)

```bash

URI_MONGO=mongodb://127.0.0.1:27017/[name de tu base de datos]


SECRET_KEY=YOUR_KEY_SECRET

PORT=3030

```

4. Inicia la aplicación:

   ```bash
   npm run dev (nodemon)
   npm run start
   ```

   ![server](public/servidor%20.png)

### Estructura del proyecto

![proyect](public/estructura.png))

## Endpoints de la API

### Autenticación

- `POST /api/auth/signup`: Permite a los usuarios autenticarse en la aplicación. Se requiere proporcionar un nombre de usuario y una contraseña válidos. Retorna un token JWT que debe ser incluido en las solicitudes posteriores para acceder a recursos protegidos.
- `POST /api/auth/signin`: Permite a los usuarios hacer login en la aplicación. Se requiere proporcionar un nombre de usuario y una contraseña válidos. Retorna un token JWT que debe ser incluido en las solicitudes posteriores para acceder a recursos protegidos

### Usuarios

- `POST /api/users`: Crea un nuevo usuario en la base de datos.
- `GET /api/users`: Obtiene todos los users.
- `GET /api/users/:id`: Obtiene los detalles de un usuario específico según su ID.
- `GET /api/users/:email`: Obtiene los detalles de un usuario específico según query email.
- `PUT /api/users/:id`: Actualiza la información de un usuario existente.
- `DELETE /api/users/:id`: Elimina un usuario de la base de datos.

### Roles

como solo es un ejemplo y al punto funcional solo decido tener 3 tipos de Roles. User | moderator | admin.
Cree una funcion que se inicia cuando arranca el programa y carga las 3 roles posibles en la bd , si existen no los vuelve a crear

```bash
async function createRoles() {
 try {
   const count = await Role.estimatedDocumentCount();

   //console.log(count);
   if (count === 0) {

     const roles = await Promise.all([
       //recibe un objeto name:con el valor la constante enum
       await new Role({ nameRole: enumRole.USER }).save(),
       await new Role({ nameRole: enumRole.MODERATOR }).save(),
       await new Role({ nameRole: enumRole.ADMIN }).save(),
     ]);

     console.log(roles);
   }}
  catch (error) {
   console.error(error.message);
  }
}

```

Ademas cree un tipo enum donde me devuelve los tipos de Roles .

```bash
export const enumRole = {
  ADMIN: "admin",
  USER: "user",
  MODERATOR: "moderator",
};

```

## Ejemplo de Uso

1. **Autenticación**:

   ```http
   POST /api/auth/signin
   Content-Type: application/json

   {
     "username": "usuario",
     "password": "contraseña"
   }
   ```

   Respuesta:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
   }
   ```

   Estos datos lo puede usar el front end para guardarlo en su localStorage o en cookies

## Decodificación de Token JWT

### ¿Qué es JWT?

JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define un formato compacto y autocontenido para la transmisión segura de información entre partes como un objeto JSON. Está compuesto por tres partes: el encabezado, la carga útil (payload) y la firma.

### Decodificación de un Token JWT en Node.js

En Node.js, podemos decodificar un token JWT utilizando una librería como `jsonwebtoken`. A continuación, se muestra un ejemplo de cómo decodificar un token JWT en Node.js:

```javascript
const jwt = require("jsonwebtoken");

// Token JWT a decodificar
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// Decodificar el token
const decoded = jwt.decode(token);

// Mostrar la carga útil decodificada
console.log(decoded);
```

<img src="public/jwt1.png" alt="jwt_sin_firma" style="width: 500px;"/> <img src="public/jwt2.png" alt="jwt_con_firma" style="width: 500px;"/>

2. **Obtener users**:

   ```
   GET http://localhost:3030/api/users
   ```

   Respuesta:

   ```json
   [
     {
       "_id": "661709b05f0d37c92338c4f5",
       "email": "user@gmail.com",
       "password": "$2b$10$QNXHIx4H5zuH684LDi7So.XtFlEaUIUihOtFp1nASds0jLwlUmDpq",
       "roles": [
         {
           "_id": "6616e7aabed3781f5825b323",
           "nameRole": "user"
         }
       ],
       "createdAt": "2024-04-10T21:50:40.892Z",
       "updatedAt": "2024-04-10T21:50:40.892Z",
       "__v": 0
     },
     {
       "_id": "66170d486ea3af9179f1afb5",
       "email": "javiermilei@gmail.com",
       "password": "$2b$10$vEhrZagoa9xf5trdi3/lf.ZJ4XMJhVuIV9IngVdjgFcvy0USeDgOG",
       "roles": [
         {
           "_id": "6616e7aabed3781f5825b329",
           "nameRole": "admin"
         },
         {
           "_id": "6616e7aabed3781f5825b327",
           "nameRole": "moderator"
         }
       ],
       "createdAt": "2024-04-10T22:06:00.722Z",
       "updatedAt": "2024-04-10T22:06:00.722Z",
       "__v": 0
     }
   ]
   ```

# Middleware de Verificación de Token

El siguiente código es un middleware de verificación de token en una aplicación Node.js con Express. Este middleware se utiliza para autenticar y autorizar las solicitudes entrantes basadas en un token JWT (JSON Web Token).

```javascript
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    // console.log("x-access-token\n", token);
    if (!token) {
      return res.status(403).json({ message: "token not provided" });
    }

    const token_decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!token_decode) {
      res.status(403).json({ message: "token invalid" });
    }

    //console.log("decode \n", token_decode.object);

    req.userId = token_decode.object.id; //guardo ese id

    let userById = await User.findById(req.userId);

    if (!userById) {
      return res.status(404).json("User not Found");
    }

    next();
  } catch (error) {
    //console.error(error.message);
    return res.json({ message: "Unauthorized 😫😫" });
  }
};
```

# Esquema del Modelo de Usuario

El siguiente código es el esquema del modelo de usuario en una aplicación Node.js utilizando Mongoose como ODM (Object-Document Mapper) para interactuar con la base de datos MongoDB.

```javascript
import mongoose from "mongoose";

// Definición del esquema de usuario utilizando Mongoose
const UserSchema = mongoose.Schema(
  {
    // Campo de correo electrónico
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"], // El correo electrónico es requerido
      unique: true, // Asegura que cada correo electrónico sea único en la base de datos
    },

    // Campo de contraseña
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"], // La contraseña es requerida
      minlength: [10, "La contraseña debe tener al menos 10 caracteres"], // La contraseña debe tener al menos 10 caracteres
      maxlength: [70, "La contraseña no puede tener más de 70 caracteres"], // La contraseña no puede tener más de 70 caracteres
    },

    // Campo de roles
    roles: [
      // Array de roles definido como referencias a documentos de la colección "Role"
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role", // Referencia al modelo Role
      },
    ],

    // Campos adicionales para completar en el perfil del usuario
    name: { type: String }, // Nombre del usuario
    lastName: { type: String }, // Apellido del usuario
    cuil: { type: String }, // CUIL del usuario
    address: {
      // Dirección del usuario
      street: { type: String }, // Calle
      number: { type: String }, // Número
    },
  },
  {
    timestamps: true, // Añade campos "createdAt" y "updatedAt" automáticamente
    collection: "User", // Define el nombre de la colección en la base de datos como "User"
  }
);

// Define el modelo de usuario utilizando el esquema definido
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
```

# Configuración de las Rutas del Usuario

El siguiente código configura las rutas para manejar las solicitudes relacionadas con los usuarios en una aplicación Express.js. Utiliza controladores para manejar la lógica de negocio de cada ruta y middleware para realizar la autenticación y autorización de los usuarios.

```javascript
import { Router } from "express";
const router = Router();
import controllers from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.middleware.js";
import {
  isAdmin,
  isModerator,
  hasRoles,
} from "../middleware/role.middleware.js";
import { enumRole } from "../enum/role.enum.js";

// Configuración de las rutas

// Obtener un usuario por su ID
router.get("/:id", controllers.getUserById);

// Obtener un usuario por su correo electrónico
router.get("/:email", controllers.getUser);

// Actualizar un usuario por su ID
router.put(
  "/:id",
  [verifyToken, hasRoles(`${enumRole.ADMIN}`, `${enumRole.MODERATOR}`)],
  controllers.updateUser
);

// Eliminar un usuario por su ID
router.delete("/:id", [verifyToken, isAdmin], controllers.deleteUser);

// Crear un nuevo usuario
router.post(
  "/",
  [verifyToken, hasRoles(`${enumRole.ADMIN}`, `${enumRole.MODERATOR}`)],
  controllers.createUser
);

// Obtener todos los usuarios
router.get("/", controllers.getUser);

export default router;
```

## THUNDER CLIENT

thunder client es una extension de vsc y es el rest que utilizo para realizar consultas post put del get, deje en una carpeta con el mismo nombre las consultas que realize , estan en un archivo exportado con extension.json , solo deben importarlas en su extension instalada.

![thunder](public/yhunder%20.png)

## Fuente

Este codigo lo base de acuerdo a la fuente de la pagina [BesKoder](https://www.bezkoder.com/node-js-mongodb-auth-jwt/)

### Recomendación: Descargar el Código Fuente

Si estás interesado en explorar el código fuente de este proyecto, te recomendamos descargar el archivo de git hub. Esto te permitirá ver el código de manera más detallada y cómoda, así como también te brindará la posibilidad de copiar partes del código para tu propio uso.

[Repositorio git hub codigo entero](https://github.com/arielZarate/restApi-node_y_express-jwt_y_roles-mongodb)
