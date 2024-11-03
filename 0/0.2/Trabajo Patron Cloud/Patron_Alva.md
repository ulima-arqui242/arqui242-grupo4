# Informe sobre el patrón Cloud Choreography

## Desarrollo Conceptual

> Coreografía: “Es el arte de ejecutar una serie de movimientos corporales sucesivos que han sido previamente organizados o planeados.”

Los patrones de diseño de Cloud son útiles para desarrollar aplicaciones en la nube de manera segura, confiable y escalable. Y si bien el término coreografía se usa principalmente en relación con la danza, este puede aplicarse en varios escenarios como la tecnología, siendo uno de los patrones de diseño.

En primer lugar, se tiene que entender el contexto en el que el presente patrón puede ser utilizado. Se tiene una cantidad establecida de microservicios que interactúan con usuarios y permiten a una organización realizar eficazmente sus operaciones de negocio.

![diagrama contexto](./imagenes%20coreografia/diagrama%20contexto.png)

Para establecer una comunicación entre los diversos microservicios existen dos métodos dependiendo de la estrategia con la que se quiera organizar y ejecutarlos.

* Componente de orquestación: En el que se establece un servicio que organiza el orden de ejecución de todos los microservicios.

* Patrón de coreografía: Patrón que descentraliza el flujo para permitir la coordinación entre servicios.

## Definición del Patrón Choreography

Es un patrón de comunicación que descentraliza la lógica del flujo de trabajo y distribuye las responsabilidades de componentes dentro de un sistema, es decir, en vez de contar con un componente orquestador, cada microservicio funciona de forma independiente.

Los servicios colaboran con otros componentes mediante el envío de respuestas en base a eventos, tomando decisiones autónomas sobre las acciones a ejecutar en función a dichos eventos. Esto evita que los servicios tengan que depender directamente de otros.

## Solución

Como cualquier patrón de diseño Cloud, este cuenta con beneficios al ser implementado:

* **Escalabilidad:** Una de las funcionalidades más importantes al no tener que depender de un coordinador central, los servicios pueden escalar de forma independiente sin afectar a otros componentes.
* **Desacoplamiento:** Los servicios no necesitan conocer la existencia de otros servicios ni dependen de una orquestador. Esto permite una arquitectura más flexible, permitiendo agregar, modificar o eliminar servicios sin afectar el todo.
* **Procesos Distribuidos:** Debido a la naturaleza del patrón, las tareas del sistemas son distribuidas y permite una mejora en el procesamiento de tareas asíncronas.
* **Resiliencia Mejorada:** Dado que cada servicio puede funcionar de forma independiente, en caso ocurra un fallo en sólo uno de ellos no impacta necesariamente en toda la arquitectura.

## Limitaciones

Por otro lado, el patrón cuenta con limitaciones por lo que su uso no puede ser recomendado en el 100% de los casos.

* **Mayor complejidad de seguimiento:** Puede ser difícil rastrear transacciones o procesos del flujo completo, ya que no hay un componente central que coordine las acciones de los servicios.
* **Dificultad en el manejo de errores:** Manejar errores en procesos distribuidos se vuelve complejo, necesitando una buena estrategia que garantice la integridad del sistema.
* **Necesidad de orden:** En algunos casos, es crítico que exista un orden de ejecución para procesar correctamente un evento lo que necesita una configuración que permita una coordinación que no genere inconsistencias.
* **Dificultad con flujos mayores:** Cuantos más servicios se maneje en la coreografía más notorias son las otras limitaciones. Este patrón puede ocasionar que el flujo de trabajo ya no sea fácil de mantener o entender.

## Casos de Aplicación

A comparación de contar con un orquestador, el patrón de diseño **Choreography** es ampliamente usado en aplicaciones de microservicios distribuidos, especialmente cuando es importante que los sistemas sean escalables, resilientes y puedan operar independiente.

Además, cabe mencionar que es posible utilizar un enfoque híbrido que utilice ambos tipos de comunicación dependiendo del flujo o complejidad del proceso que se debe seguir, permitiendo aprovechar la independencia de función en algunos microservicios mientras otros sigan el orden establecido de un componente coordinador.

A continuación se mencionan algunas empresas de TI que utilicen este patrón en sus servicios:

* **Amazon:** Utiliza una gran variedad de servicios que en conjunto ejecutan el procesamiento de pedidos, siendo uno de sus principales servicios. Este proceso cuenta con microservicios tales como gestión de inventarios, de pagos, de envíos y notificaciones al usuario.

* **Netflix:** Al ser una plataforma de transmisión de contenido digital, cuenta con diferentes microservicios que deben ser independientes para no afectar el rendimiento del otro. En este caso, utilizan el envío de contenido al dispositivo, recomendaciones al usuario y analíticas de uso.

* **Uber:** De igual manera, Uber cuenta con microservicios individuales que se encargan de acciones dentro del proceso de atención al usuario como: pedidos, gestión de conductores, pagos, reseñas y notificaciones.

## Aplicación en el Proyecto

La plataforma HomeSync cuenta con una buena cantidad de microservicios al brindar formas de pago, gestión de departamentos, notificaciones y conversaciones. Es por esta razón que el patrón de coreografía se aprovecharía en mayor medida a contar con un componente orquestador.

Para utilizar este patrón se tiene que implementar el flujo de respuestas y acciones en base a eventos para que los microservicios se ejecuten en cuanto encuentren un estado que puedan ejecutar. Al utilizar TypeScript en el proyecto, esto puede ser usado con “EventEmitter” del paquete “events”. En cada microservicio, se utilizará de manejo de eventos para realizar el flujo entre componentes y se toma en cuenta el manejo de errores.

# Desarrollo de Código

## Contexto

En este caso se utilizará el lenguaje de programación javascript. Para el cual se tendrá que instalar Node.js desde su página oficial. Además, se tiene el escenario de uso de microservicios para gestionar el proceso de pedidos de una empresa. La arquitectura cuenta con tres microservicios:

**Delivery:** Es el encargado de preparar y designar los paquetes a ser enviados a los clientes.

![delivery inicial](./imagenes%20coreografia/inicial%20delivery.png)

**Inventory:** Encargado de gestionar el inventario disponible para los envíos.

![inventory inicial](./imagenes%20coreografia/inicial%20inventory.png)

**Payment:** Es el microservicio establecido para procesar los pagos de pedidos.

![pago inicial](./imagenes%20coreografia/inicial%20pago.png)

También tenemos la plantilla de orden que al ser un ejemplo, tendrá la siguiente estructura e información básica:

![plantilla orden](./imagenes%20coreografia/plantilla%20orden.png)

Por otro lado, tenemos el método inicial usando la comunicación por orquestador que es una función llamada “placeOrder()” que se llamaría cada vez que se introduzca un pedido dentro del sistema.

![orquestador](./imagenes%20coreografia/main%20orquestrator.png)

Al correr el archivo orquestador se tendría el siguiente mensaje en consola:

![consola orqustador](./imagenes%20coreografia/resultados%20orquestrator.png)

## Implementación del patrón Choreography

Para utilizar el patrón coreografía en JavaScript se tiene que usar el paquete “events”, que permite la implementación de dicho patrón. Dentro de este paquete se tiene la clase “EventEmitter” que habilita el manejo, disparo y recibimiento de eventos entre funcionalidades (microservicios).

Con el EventEmitter se permite declarar globalmente una instancia que actúe de bus para todos los módulos que necesiten interactuar con los eventos. En este caso, es declarará la instancia “eventBus”.

![declaracion eventbus](./imagenes%20coreografia/declaracion%20eventbus.png)

Esta instancia deberá ser importada en todos los microservicios para poder acceder a sus funcionalidades.

![linea eventbus](./imagenes%20coreografia/linea%20eventbus.png)

Esto permitirá usar funciones importantes como “on” y “emit”, las básicas para este patrón.

* **EventEmitter.on:** Registra una escucha para el nombre de un evento y cuenta con un listener que se ejecuta en cuanto una función lance dicho evento.
* **EventEmitter.emit:** Utiliza dos entradas, una siendo el nombre del evento y la otra siendo el argumento u objeto a pasar a la función que esté escuchando.

Conociendo lo básico, implementaremos esas funciones en los servicios para que empiecen a escuchar por eventos para que cada servicio lance un evento hasta que complete el proceso de envío de pedido de forma que lo haría el orquestador.

*Diagrama de lanzamiento de eventos.*

![diagrama de lanzamiento de eventos](./imagenes%20coreografia/diagrama%20inicial.png)

De esta forma, en cada servicio, se agrupa la funcionalidad dentro de un eventBus.on para escuchar por el evento de ‘orderPlaced’. Esto quedaría de la siguiente manera:

![inventario evento](./imagenes%20coreografia/inventario%20coreografia.png)

De igual manera, se implementa esta lógica en los diferentes servicios, siguiendo el diagrama presentado anteriormente. Para esta lógica, se aumentan estados base en caso algunos procesos sean cancelados o presenten un impedimento (Pagos y Delivery).

**Pagos:**

![pagos evento](./imagenes%20coreografia/pago%20coreografia.png)

**Delivery:**

![delivery eventos](./imagenes%20coreografia/delivery%20coreografia.png)

Una vez se tengan los servicios configurados, se cambia el archivo main para que este sea el que corra los microservicios y permita colocar pedidos dentro del sistema. Esto estaría dentro de un servidor y se tendrían las funciones importantes para procesar pedidos, como estar conectada a una base de datos y tener rutas de POST o GET. Sin embargo, debido a la simplicidad del ejemplo, se está haciendo directamente.

![main coreografia](./imagenes%20coreografia/main%20coreografia.png)

Contando con la misma orden, se ejecuta el nuevo archivo main y se tendría el mismo resultado que con el orquestador.

![resultados coreografia](./imagenes%20coreografia/resultados%20coreografia.png)

## Aprovechando el uso de eventos

Ahora que contamos con una arquitectura basada en eventos, podemos aprovechar estos eventos para que cada vez que se cambie de evento, un nuevo servicio de notificaciones avise al usuario de este cambio. En el diagrama se indica cómo funciona y a continuación se mostrará la implementación.

![diagrama notificaciones](./imagenes%20coreografia/diagrama%20notificaciones.png)

Esto sería implementado de la siguiente manera en el código del servicio de notificaciones.

![notificaciones](./imagenes%20coreografia/codigo%20notificaciones.png)

***Nota:** No existe una forma de que un listener escuche a varios eventos para ejecutar UNA acción.*

Una vez añadido dentro del flujo main, se ejecuta. El resultado sería el siguiente:

![resultados notificaciones](./imagenes%20coreografia/resultados%20notificaciones.png)

En otro escenario, puede existir casos en los que el pago sea rechazado o que la orden sea cancelada por el cliente, para implementar dicha funcionalidad, se tendría que crear nuevos estados y funciones que permitan reaccionar a dichos eventos.

![diagrama errores](./imagenes%20coreografia/diagrama%20cancelar.png)

Para ello, se tendrían que crear y manejar los siguientes eventos:

**Inventario:**

![inventario cancelar](./imagenes%20coreografia/Captura%20de%20pantalla%202024-11-03%20154417.png)

**Pago:** En el módulo de pagos ya se tenía el evento de pago rechazado pero no se hacía nada con el.

![pago cancelar](./imagenes%20coreografia/codigo%20paymentfinal.png)

**Delivery:**

![delivery final](./imagenes%20coreografia/Captura%20de%20pantalla%202024-11-03%20154353.png)

Finalmente, con el uso de variables podemos simular el cancelamiento de una orden. 

![resultados finales](./imagenes%20coreografia/resultados%20finales.png)

***Nota:** Se comentó la funcionalidad del módulo de notificaciones para simplificar la vista de la terminal.*

## Repositorio del Código

**Github con el código desarrollado:** <https://github.com/Alvitaa/patron-Chroreography-Alva>

## Referencias

Geeks for Geeks. (2024). *Choreography Pattern - System Design.* <https://www.geeksforgeeks.org/choreography-pattern-system-design/>

Guadaño, Y. (2024). Patrones de arquitectura: comunicación y coordinación de microservicios. *Paradigma digital.* <https://www.paradigmadigital.com/dev/patrones-arquitectura-comunicacion-coordinacion-microservicios>

Microsoft Learn. (s.f.).* Choreography pattern.* Recuperado el 31 de octubre de 2024, de <https://learn.microsoft.com/en-us/azure/architecture/patterns/choreography>

System Design School. (s.f.). *Understanding Orchestration vs Choreography in Microservices Architecture.* Recuperado el 31 de octubre de 2024, de <https://systemdesignschool.io/blog/orchestration-vs-choreography>