# 1) Desarrollo conceptual

**¿Qué es el cifrado de datos?**

Es una técnica de seguridad que protege la información al convertirla en un formato ilegible para quienes no tienen la clave adecuada para descifrarla. Consiste en transformar los datos originales, conocidos como texto plano, en un conjunto de caracteres o símbolos incomprensibles, llamado texto cifrado o criptográfico. Este proceso se lleva a cabo mediante algoritmos criptográficos, y solo las personas autorizadas con la clave de descifrado pueden revertirlo y acceder a la información original.

**Tipos de cifrado de datos**

![tipocifrado](tipocifrado.png)

### Cifrado Simétrico

El cifrado simétrico utiliza la misma clave tanto para cifrar como para descifrar la información. Esto significa que ambas partes deben tener acceso a la clave secreta para poder comunicarse de manera segura.

**Beneficios y Ventajas:**
- **Rapidez**: Generalmente, los algoritmos simétricos son más rápidos que los asimétricos, lo que los hace adecuados para cifrar grandes volúmenes de datos.
- **Simplicidad**: La gestión de claves es más sencilla, ya que solo se necesita una clave para ambas operaciones (cifrado y descifrado).

#### Ejemplo de cifrado de datos simétrico

**Escenario:** Cifrado de un disco duro en una empresa  
**Descripción:** Una empresa cifra el disco duro que almacena datos sensibles para proteger la información de accesos no autorizados en caso de robo o pérdida.  
**Por qué se usa cifrado simétrico:**
- **Rendimiento:** Es más rápido y eficiente, permitiendo cifrar grandes volúmenes de datos rápidamente.
- **Facilidad de Implementación:** Utiliza una sola clave, simplificando la gestión siempre que se mantenga en secreto.
- **Costo:** Generalmente requiere menos recursos computacionales que el cifrado asimétrico, lo cual es clave para empresas con grandes volúmenes de datos.
- **Acceso Controlado:** El disco duro solo tiene acceso la empresa, lo que hace que el cifrado simétrico sea más conveniente en este escenario.

### Cifrado Asimétrico

El cifrado asimétrico utiliza un par de claves: una clave pública y una clave privada. La clave pública se utiliza para cifrar la información, mientras que la clave privada se utiliza para descifrarla. Esto permite que las personas compartan su clave pública sin comprometer la seguridad de su clave privada.

**Beneficios y Ventajas:**
- **Seguridad mejorada**: La clave privada nunca se comparte, lo que reduce el riesgo de comprometer la seguridad.
- **Intercambio seguro**: Facilita el intercambio seguro de información sin necesidad de compartir una clave secreta previamente.

#### Ejemplo de cifrado de datos asimétrico

**Escenario:** Comunicaciones seguras en un servicio de correo electrónico  
**Descripción:** Un usuario envía un correo confidencial a un colega utilizando claves públicas y privadas para el cifrado.  
**Por qué se usa cifrado asimétrico:**
- **Intercambio Seguro de Claves:** El remitente cifra el mensaje con la clave pública del destinatario, asegurando que solo este pueda descifrarlo.
- **Autenticación:** El remitente puede firmar el correo digitalmente, permitiendo al destinatario verificar su autenticidad con la clave pública.
- **Sin compartir claves:** El cifrado asimétrico evita la necesidad de compartir claves, añadiendo seguridad en comunicaciones por Internet.
- **Acceso Múltiple:** Dado que el servicio de correo involucra a varias personas, el cifrado asimétrico es más adecuado para garantizar la seguridad en las comunicaciones.

## Introducción a Cifrado en Tránsito y Reposo

Ante el aumento constante de ciberataques y amenazas a la seguridad de la información, especialmente en el ámbito web, como se ve en la imagen que muestra que este es el segundo sector más afectado, han surgido diversos métodos de cifrado. Estos enfoques permiten proteger la información tanto en tránsito como en reposo. Gracias a ellos, se garantiza que los datos permanezcan confidenciales y sean accesibles únicamente para personas autorizadas.


![image](https://github.com/user-attachments/assets/cae3a68d-1904-4120-892f-130ea7f6a464)


## Cifrado en tránsito

El cifrado en tránsito se refiere a la protección de datos mientras se transfieren entre dos puntos, como entre un servidor y un cliente. Esto se realiza para evitar que la información sea interceptada o modificada por un tercero durante el proceso de transmisión.

**Por qué se usa cifrado en tránsito:**
- **Protección de Datos:** Asegura que la información sensible, como contraseñas y datos personales, no sea accesible a atacantes durante su transmisión.
- **Confidencialidad:** Garantiza que solo el remitente y el destinatario puedan acceder a la información, manteniéndola a salvo de miradas indiscretas.

### Uso de NGINX como Reverso Proxy para Cifrado en Tránsito

![nginx](nginx.png)

NGINX es un servidor web y un reverso proxy que se utiliza comúnmente para manejar el cifrado en tránsito. Funciona como intermediario entre los clientes y los servidores, cifrando las comunicaciones que pasan a través de él. Esto se logra mediante la implementación de SSL/TLS (Secure Sockets Layer/Transport Layer Security), lo que permite asegurar que la información transmitida entre el cliente y el servidor esté cifrada y protegida de posibles interceptaciones.

**¿Cómo funciona NGINX como reverso proxy?**
1. **Recepción de Solicitudes:** NGINX recibe las solicitudes del cliente (por ejemplo, un navegador) y actúa como intermediario.
2. **Cifrado:** Utiliza SSL/TLS para cifrar los datos antes de enviarlos al servidor de destino, asegurando que la información sea inaccesible para terceros durante la transmisión.
3. **Desencriptación:** Cuando el servidor responde, NGINX descifra la información y la envía de vuelta al cliente, manteniendo la confidencialidad de los datos en tránsito.

**¿Por qué es ampliamente utilizado?**
- **Escalabilidad:** NGINX maneja un gran número de conexiones simultáneas, lo que lo hace ideal para aplicaciones web de alto tráfico.
- **Rendimiento:** Su capacidad para servir contenido estático y gestionar múltiples conexiones de manera eficiente lo convierte en una opción popular para optimizar el rendimiento.
- **Seguridad:** La implementación de SSL/TLS a través de NGINX ayuda a proteger la información sensible, convirtiéndolo en una herramienta valiosa para las empresas que buscan garantizar la seguridad de sus datos en tránsito.

## Cifrado en reposo

El cifrado en reposo se refiere a la protección de datos que están almacenados en un dispositivo, como discos duros, servidores o bases de datos. Su objetivo es mantener la seguridad de la información cuando no está en uso.

**Por qué se usa cifrado en reposo:**
- **Seguridad de Almacenamiento:** Protege los datos contra accesos no autorizados en caso de robo o pérdida del dispositivo de almacenamiento.
- **Cumplimiento Normativo:** Ayuda a cumplir con regulaciones y estándares de seguridad que exigen la protección de datos sensibles.

## Uso de pgcrypto para Cifrado en Reposo
![Data Masking Offline](img-dgm-data-masking-offline.webp)

`pgcrypto` es un módulo de PostgreSQL que proporciona funcionalidades para el cifrado y descifrado de datos. Se utiliza comúnmente para proteger la información sensible antes de ser almacenada en una base de datos, asegurando que incluso si un atacante accede a la base de datos, no podrá leer los datos sin la clave de descifrado.

### ¿Cómo funciona pgcrypto?

1. **Generación de Clave**: Se genera una clave secreta que se utilizará para cifrar y descifrar los datos. Esta clave se gestiona de forma segura para evitar compromisos.

2. **Cifrado de Datos**: Los datos sensibles, como contraseñas o información personal, se cifran utilizando funciones criptográficas proporcionadas por el módulo `pgcrypto`, como `pgp_sym_encrypt`.

3. **Almacenamiento de Datos Cifrados**: Los datos cifrados se almacenan en la base de datos, asegurando que permanezcan protegidos incluso en caso de acceso no autorizado.

4. **Desencriptación**: Cuando se necesita acceder a los datos, se utiliza la clave secreta para descifrarlos mediante funciones como `pgp_sym_decrypt`, obteniendo así la información original.

### ¿Por qué es ampliamente utilizado?

- **Simplicidad**: La integración de `pgcrypto` en PostgreSQL es directa y no requiere bibliotecas externas, lo que permite a los desarrolladores implementar cifrado de manera rápida y eficiente.

- **Versatilidad**: Soporta varios algoritmos de cifrado, lo que permite a las aplicaciones elegir el que mejor se adapte a sus necesidades de seguridad.

- **Seguridad Robustecida**: Ayuda a proteger datos sensibles, asegurando que incluso si los datos son robados, no pueden ser utilizados sin la clave de descifrado.

# 2) Consideraciones Técnicas

Para implementar NGINX como un reverse proxy para el cifrado de datos, se utilizó una imagen de Docker. Por lo tanto, es necesario tener Docker Desktop instalado en tu máquina. Si aún no lo tienes, aquí te proporciono un video con las instrucciones para descargar Docker.

## Instalación de Docker Desktop

[Instrucciones para instalar Docker Desktop](https://www.youtube.com/watch?v=ZO4KWQfUBBc)

## Instalación de NGINX con Docker

Para usar NGINX como un reverse proxy, lo primero que debemos hacer es generar las claves privadas y el certificado. Para ello, crea una carpeta llamada "ssl" en tu aplicación de frontend, ya sea que la tengas en React, Angular o Vue. La estructura debería verse así:

![Estructura de carpetas](https://github.com/user-attachments/assets/12851819-a58a-4c40-b7ff-268a83b65dde)

## Instalación de las Firmas Autofirmadas

Una vez realizada la carpeta, abre Ubuntu y ejecuta los siguientes comandos:

![Comandos para generar firmas](https://github.com/user-attachments/assets/51ee5af2-c916-4adb-b0ae-dbbf83f8d548) 

Al ejecutar el comando `openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.crt`, se te pedirán datos como tu correo electrónico, nombre y dominio. Debes proporcionar tus datos personales; para el dominio, puedes usar `localhost`. Al finalizar el proceso, dentro de tu carpeta `ssl` deberían aparecer las llaves, que se verán así:

![Llaves generadas](https://github.com/user-attachments/assets/f8593a07-f7af-45b2-bef6-aba8c5278a68)

## Levantar React y NGINX

Ahora, para utilizar estas firmas que ayudarán al cifrado de datos, primero levanta la aplicación React creando un `Dockerfile`, como se muestra en la imagen:

![Dockerfile para React](https://github.com/user-attachments/assets/9676d10e-6ad8-420b-a1f9-f4a82dcd2904)

Una vez creado, agrega el siguiente código, que servirá para levantar la aplicación en Docker:

![Código Dockerfile](https://github.com/user-attachments/assets/0ed03b63-d6d5-40c6-9257-17a7f3543859)

Luego, crea un archivo `nginx.conf` fuera de la carpeta de la aplicación React. La estructura debería verse así:

![Estructura con nginx.conf](https://github.com/user-attachments/assets/0fca9e68-ccb9-4638-8963-59593fbd8302)

Dentro de `nginx.conf`, debes agregar el siguiente código, que se encargará de cifrar los datos en tránsito, cambiando el puerto HTTP (80) al puerto HTTPS (443) mediante las firmas generadas en `ssl`. Esto garantizará que los datos se cifren al viajar de la aplicación cliente (React) al NGINX y de NGINX al servidor:

![Código nginx.conf](https://github.com/user-attachments/assets/af5db813-900a-4535-b71d-797cef069ea4)

Finalmente, crea el archivo `docker-compose.yml` para levantar estos servicios de React y NGINX. El código debería ser el siguiente:

![Código docker-compose.yml](https://github.com/user-attachments/assets/b73682be-c722-4226-b945-2179bc1feff7)

Una vez realizado todo esto, abre una terminal y ejecuta el comando `docker-compose up --build` para levantar los servicios. Su estructura debería verse así:

![Estructura de terminal](https://github.com/user-attachments/assets/ec308f53-8538-4929-87ce-435eaa8ed2e1)
![Estructura de terminal](https://github.com/user-attachments/assets/33b67161-d8eb-4313-b00e-3dae9cdcb814)

Al finalizar, podrás ver la aplicación en React corriendo en `localhost:3000`:

![Aplicación en ejecución](https://github.com/user-attachments/assets/a8b25823-3a29-4934-ab0b-4cf27941523a)

## Pruebas en el Front-end

Una vez completado, podrás enviar información, la cual estará cifrada en tránsito gracias al NGINX que hace la conversión del puerto HTTP a HTTPS. A continuación, se muestran imágenes de un login y un pago con tarjetas de crédito, donde se puede verificar que la información está cifrada en tránsito:

### Login
![Pantalla de login](https://github.com/user-attachments/assets/877e1dbe-7358-4fd8-aa0f-1b42cbb3dd73)

### Pagos con Tarjetas
![Pantalla de pagos](https://github.com/user-attachments/assets/27592ac1-36b7-46c2-92d5-d376c2a82a83)

## Instalación de pgcrypto

Para instalar `pgcrypto` y usarlo como cifrado en reposo, primero localiza tu base de datos. Una vez hecho esto, ejecuta el siguiente comando para habilitar esta extensión en PostgreSQL:

![Comando para habilitar pgcrypto](https://github.com/user-attachments/assets/fda86b3d-bad5-4549-a39d-f6276b5f43f8)

En mi caso, muestra un error porque ya está instalada, pero a ti debería aparecer "extensión instalada".

Una vez completado esto, ahora puedes usar estas librerías en los endpoints para cifrar los datos en reposo. Primero, importa las librerías y luego úsalas en los endpoints. A continuación, se muestra cómo importar la librería y cómo usarla en los endpoints:

### Librería
![Importando la librería](https://github.com/user-attachments/assets/44c3aa82-57cb-424d-9df0-abf54d28e1fe)

### Encriptando en Reposo en la Base de Datos PostgreSQL
![Encriptando datos en reposo](https://github.com/user-attachments/assets/364f9567-d464-472c-860a-1748046cceb7)

## Descriptando el Dato
![Desencriptando datos](https://github.com/user-attachments/assets/ca68cac0-341e-4864-9f94-093eb0110242)


# 3) Demo

## Video

https://www.youtube.com/watch?v=v3cHzlXtX0Q

## Repositorios
https://github.com/JeanPierreTB/Cifrado_Datos_Frontend

https://github.com/JeanPierreTB/Cifrado_Datos_Backend



# Referencias


Arnaud. (2023, febrero 23). Cifrado simétrico vs. asimétrico: ¿cuál es la diferencia? Mailfence Blog; Mailfence. https://blog.mailfence.com/es/cifrado-simetrico-vs-asimetrico/

NGINX reverse proxy. (s/f). Nginx.com. Recuperado el 13 de octubre de 2024, de https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/

Palentino Blog - Cifrado de datos en reposo en diferentes sistemas de gestión de Bases de Datos. (s/f). Palentino.es. Recuperado el 13 de octubre de 2024, de https://www.palentino.es/blog/cifrado-de-datos-en-reposo-en-diferentes-sistemas-de-gestion-de-bases-de-datos/

(S/f). Amazon.com. Recuperado el 13 de octubre de 2024, de https://docs.aws.amazon.com/es_es/emr/latest/ManagementGuide/emr-data-encryption.html