# Patrón Sharding

En primer lugar, el problema que se busca resolver es el de la escalabilidad y el rendimiento en bases de datos, ya que al dividirlas en distintas particiones más pequeñas y manejables se puede dividir la carga de trabajo al recibir una menor cantidad de transacciones, a diferencia de una arquitectura totalmente monolítica que recibe todas las transacciones de todos los módulos. En ese caso, los servidores se pueden sobrecargar al recibir una gran cantidad de transacciones, haciendo que sus recursos no sean suficientes.

La solución es la de dividir estos almacenes de datos de manera horizontal para mejorar el rendimiento por la distribución de la carga de las transacciones. En este caso, las particiones deben de tener un mismo esquema. Asimismo, se usan distintas estrategias como:

- **Lookup**: Utiliza un mapa para dirigir las solicitudes al fragmento correcto.
![Sebastian Camayo](lookup.png)
- **Range**: Agrupa elementos relacionados en el mismo fragmento y los ordena por clave de fragmento.
![Sebastian Camayo](range.png)
- **Hash**: Distribuye los datos uniformemente para evitar puntos calientes.
![Sebastian Camayo](hash.png)

## Escenarios

- **Comercio electrónico**: Al manejar grandes volúmenes de productos, se producen muchas transacciones de envío y gestión. Por ello, se usa este patrón para dividir las transacciones en distintos módulos como catálogo de productos y órdenes de compra.

- **Redes sociales**: Al manejar grandes cantidades de datos de los usuarios, se implementa sharding basándose en el tipo de contenido como fotos, videos, redacciones e incluso mensajes. De esta forma, se dividen estos módulos para darle una mejor disponibilidad a los datos de cada usuario.

## Aplicación en el trabajo grupal

Esta es una gran opción para mejorar la disponibilidad de los datos del proyecto. Se pueden generar instancias de particiones de la base de datos y utilizar contenedores que creen particiones distintas para fragmentar la información y mejorar la disponibilidad.
