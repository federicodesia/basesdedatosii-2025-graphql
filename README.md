# Ejemplo básico de API en GraphQL con conexión a MySQL

Pasos para ejecutar el proyecto:
1. Clonar el repositorio
2. Abrir una terminal en la carpeta del proyecto
3. Iniciar el contenedor de Docker con el comando ```docker-compose up -d```
4. Instalar las dependencias con el comando ```npm install```
5. Ejecutar el servidor con el comando ```node --watch index.js```

<br>

Consultas de ejemplo:
```
query {
  getUserCount
}
```

```
query {
  getUsers {
     id
     name
     email
  }
}
```

```
query {
  getUser(id: 1) {
    id
    name
    email
  }
}
```

Mutaciones de ejemplo:
```
mutation {
  createUser(name: "Federico", email: "federico@gmail.com") {
    id
    email
    name
  }
}
```

```
mutation {
  deleteUser(id: 1)
}
```
