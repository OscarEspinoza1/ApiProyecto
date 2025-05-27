# API Cadenas de Comida

## Descripción
Esta API permite gestionar restaurantes y sus menús, utilizando una base de datos PostgreSQL. Provee endpoints para operaciones CRUD (crear, leer, actualizar, eliminar) sobre las entidades `restaurants` y `menus`. Además, cuenta con documentación Swagger para su exploración.

## Datos manejados

### Restaurantes (`restaurants`)
- `id`: Identificador único del restaurante
- `name`: Nombre del restaurante
- `address`: Dirección
- `phone`: Teléfono de contacto

### Menús (`menus`)
- `id`: Identificador único del menú
- `restaurant_id`: Identificador del restaurante asociado
- `name`: Nombre del menú
- `description`: Descripción del menú
- `price`: Precio del menú
