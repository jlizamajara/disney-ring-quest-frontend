# grupo-jose-trini-frontend

# 📚 Documentación de la Aplicación - Instrucciones para construir el entorno de desarrollo del Frontend
Esta documentación proporciona instrucciones para levantar la interfaz de la aplicación y establecer la conexión con la API (front-end).

## 👣 Configuración de la aplicación
Por favor seguir los siguientes los pasos a continuación para configurar la interfaz de la aplicación
1. Clonar el respositorio del frotend desde https://github.com/IIC2513/grupo-jose-trini-frontend.git

2. Navegar hasta el directorio rapíz de **Disney Ring Quest 💍**, desde `grupo-jose-trini-frontend` ejecutar 
```
cd disney-ring-quest
```
3. Instalación de dependencias de la aplicación  usando yarn 🧶
```
yarn install
```
4. Configuración de variables de entorno en el directorio raíz 🌳 Crear un archivo `.env` e incluir
la siguiente variable: 
```
VITE_BACKEND_URL = [URL_BACKEND]
```
Donde [URL_BACKEND] es la URL de tu servidor de backend. Como la siguiente:`
```
VITE_BACKEND_URL="http://localhost:3000"
```

5. Iniciar el servidor de desarrollo, para ejecutar la aplicación en el servidor y acceder a ttavés del browser 🌐
```
yarn dev
```
## ❗❗Información importante
Es importante tener en cuenta lo siguiente para que la aplicación de front-end se pueda conectar correctamente con la API en el back-end:
### La URL del front-end debe coincidir con la URL configurada en la API. 
(Por default este valor es `localhost`)


### MockUp 💻
El link mockup de la página se encuentra a continuaciónhttps://www.figma.com/file/149f09Sf78Q53tCkMSTZzQ/Disney-Ring-Quest-MockUp?node-id=0%3A1&t=E7v4EyWplCpXDacX-1

### Referencias 🔍
1. Página usada para que la letras tuvieran borde de algún color http://owumaro.github.io/text-stroke-generator/
2. Página usada de referencia para crear grillas https://css-tricks.com/snippets/css/complete-guide-grid/
3. Se usó parte del código de la barra de navegación creada en el taller de React para crear la barra  (específicamente en los Link)
4. Se usó parte del código del CSS de esta página para crear la lista de mejores jugadores en la Main Page https://catalin.red/css3-ordered-list-styles/
5. Se usó parte del código de este video https://www.youtube.com/watch?v=LrGfxexv4nM para crear una barra de navegación responsiva.
6. El logo del juego se hizo con esta página https://looka.com
7. Para crear el archivo `Layout.jsx ` también se usó el taller de react. Es el mismo archivo y es para que la navBar esté en todas las páginas.

