> Milagros Corbera 

# BFF (Backend for Frontend)

## Desarrollo conceptual
Backend for Frontend (BFF) es una solución eficaz para crear arquitecturas componibles en el desarrollo de software. Este patrón aborda los requisitos únicos de varias plataformas de clientes, como dispositivos web, móviles y de IoT, al tiempo que preserva los beneficios de una arquitectura de microservicios.

Introducido por primera vez por Phil Calcado en SoundCloud, el patrón BFF sugiere crear un servicio backend personalizado adaptado a cada plataforma de cliente. Estos servicios backend actúan como intermediarios entre los frontends y los microservicios subyacentes, agregando y transformando datos para cumplir con los requisitos específicos de cada plataforma. Como resultado, se simplifica el desarrollo de la interfaz, se mejora el rendimiento y se mejora la capacidad de mantenimiento.


###  Qué es?
es un patrón que adapta las APIs para diferentes clientes o interfaces de usuario, como web, dispositivos móviles u otras plataformas. En lugar de tener una única API para todos los clientes, los BFF proporcionan API personalizadas que satisfacen las necesidades y requisitos únicos de cada cliente, garantizando una comunicación eficiente y una experiencia de usuario optimizada.


### Como se implementa?
Esto se puede hacer creando una API única para cada cliente o creando una API única para cada servicio y luego componiendo esas API en una API única para cada cliente. Este último es el enfoque recomendado, ya que permite una forma más flexible y escalable de implementar BFF cuando se trabaja hacia una arquitectura componible.

Una cosa que debe tener en cuenta es que no desea crear una API por dispositivo (iOS, Android, Web) sino por tipo de dispositivo (Móvil, Web, API pública).


### Beneficios 
El patrón BFF a menudo se prefiere a las soluciones alternativas al crear arquitecturas componibles debido a varias razones:

- **Adaptabilidad a los requisitos de la plataforma**: el patrón BFF permite a los desarrolladores crear servicios backend que se adapten a los requisitos, formatos de datos y patrones de interacción únicos de cada plataforma, lo que conduce a mejores experiencias de usuario y un uso más eficiente de los recursos.

- **Desacoplamiento de preocupaciones**: al delegar tareas de agregación y transformación de datos al backend, el patrón BFF promueve una clara separación de preocupaciones entre el desarrollo frontend y backend.
Flexibilidad y mantenibilidad: el patrón BFF permite el desarrollo, implementación y escalamiento independiente de servicios backend para cada plataforma de cliente, fomentando una adaptación más rápida a los requisitos cambiantes sin afectar otras plataformas o servicios.

- **Rendimiento optimizado**: al proporcionar un backend dedicado para cada frontend, el patrón BFF puede optimizar la agregación, transformación y almacenamiento en caché de datos, lo que resulta en una latencia reducida, tamaños de carga más pequeños y un mejor rendimiento general.

- **Evolución de API optimizada**: el patrón BFF simplifica la gestión de la evolución de API, ya que los desarrolladores pueden introducir nuevas funciones, realizar cambios o desaprobar funciones obsoletas sin afectar a otras plataformas.

### API Gateaway vs BFF
Un API gateway puede ser usado por más de un cliente, un BFF provee servicios a un único cliente.
El BFF es el responsable de completar las transacciones que necesita el cliente para funcionar, de tal forma que si nuestro Front necesita de múltiples API para obtener la información que necesita, el BFF trabaja como Gateway Aggregation Pattern para consolidar la información en un único llamado. 
Un API sería un componente (posiblemente REST) encargado de proveer una funcionalidad del negocio dentro del dominio que se encuentre.

![api gateaway vs bff](./img/api%20gateaway%20vs%20bff.png)

## Consideracikones tecnicas
Se ha desarrollado una web de pokémon utilizando React como framework principal. Esta aplicación permite a los usuarios visualizar una lista de Pokémons, mostrando inicialmente 20 Pokémons y ofreciendo la funcionalidad de cargar más al hacer clic en el botón "More Pokémons...". Además, al hacer clic en el nombre de un pokémon, los usuarios son redirigidos a una página de detalles que presenta información específica sobre el pokémon. Para gestionar las solicitudes entre el frontend y la API pública de Pokémon, se implementó un servidor utilizando Node.js y Express, conocido como Backend-for-Frontend (BFF), que utiliza Axios para realizar las peticiones necesarias.


### Frontend:
- **React**: para construir la interfaz de usuario
- **CSS**: para diseñar componentes
- **Javascript**: para la logica
- **React Router**: para manejar la navegación entre páginas.
- **Axios**: para realizar solicitudes HTTP a la API de backend.

> npx create-react-app "nombre de app" </br>
> cd "nombre de app" </br>
> npm install axios react-router-dom


### Backend
En este caso se utilizo una api de pokemon, la cual pueden encontrar aqui: [https://pokeapi.co/](https://pokeapi.co/)


### BFF
- **Node.js**: se utilizo express 
- **Axios**: Para realizar solicitudes HTTP a la API de Pokémon.
- **CORS**: Para permitir solicitudes desde el frontend.

>npm init -y  </br>
>npm install express axios cors

### Configuraciones BFF
#### **/bff/pokemon**
en esta imagen se puede mostrar como el BFF transforma la data patra que solo se muestre el nombre del pokemon

![bff pokemon list](./img/localhost3001%20list.png) 
</br></br>


aqui se puede ver que los datos se extraen de la pokeapi y que se establece un maximo de 20, y que lo que debe traer es solo el nombre del pokemon

![bff code pokemon list](./img/bff%20list%20.png)
 </br></br>


para que el front ya no agarre la api inicial de pokeapi, sino que agarre la data ya transformada por el bff y lo muestre, es este caso la url se pokeapi es cambiado por el de bff 
![url list](./img/url%20bff%20list.png)</br></br>
aqui se muestra como se ve en el front, solo 20 pokemnoes a la ves
![list pokemon](./img/localhost3000%20list.png)


#### **/bff/pokemon/:name**

en esta imagen se puede mostrar como el BFF transforma la data patra que solo se muestre algunos datos del pokemon como el nombre, orden, experiencia base, altura y habilidades

![bff pokemon detail](./img/localhost3001%20detail.png) 
</br></br>


aqui se puede ver que los datos se extraen de la pokeapi y que se establece que solo traiga los datos requeridos 

![bff code pokemon detail](./img/bff%20detail.png)
 </br></br>


para que el front ya no agarre la api inicial de pokeapi, sino que agarre la data ya transformada por el bff y lo muestre, es este caso la url se pokeapi es cambiado por el de bff 

![url detail](./img/url%20bff%20detail.png)</br></br>


aqui se muestra como se ve en el front, el detalle con los datos necesarios del pokemon

![detail pokemon](./img/localhost3000%20detail.png)



[link del repo ](https://github.com/btwitsmei/pokemon)