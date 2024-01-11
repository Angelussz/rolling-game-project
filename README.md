# rolling-game-project
## Reglas 
- Se va trabajar en ingles
- Los strings deben estar entre dobles comillas "string"
## Estructura de carpeta de como se debe seguir
- Crear ramas por cada logica de tarea dejaada en trello por ejemplo **rama pagina administrador** crear subramas de cada tarea(en trello) que se asocie a esa rama 
## BD del localstorage:
- Campos:
    ```
    users={
        name, 
        email, 
        password, 
        role, 
        favorites:(si es admin favorites debe estar vacio)
    }
    games: {
        category, 
        code, 
        price:(en dolares), 
        URLimage, 
        description, 
        requirements, 
        stockQuantity, 
        platforms
        }
    ```
- Los roles son user y admin, user para registros y admin ya los tenemos en el archivo json