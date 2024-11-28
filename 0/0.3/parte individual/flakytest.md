> Milagros Corbera 

#  Flaky test

## Desarrollo conceptual

####  deficnicion y caracteristicas clave
-   **Definición**: Un flaky test es una prueba cuyo resultado varia sin cambios en el codigo fuente o en el entorno de ejecucion
-   **Características**:
    -   **Inconsistencia**: falla o pasa en diferentes ejecuciones sin razón aparente
    -   **No determinismo**: su comportamiento puede depender de factores externos no controlados
    -   **Dificultad en la reproducción**: los fallos no siempre son fáciles de reproducir

####  origen de la fluctuacion
-   **entorno de ejecución**:
    -   Configuraciones de hardware o software 
    -   Recursos compartidos tipo bases de datos, archivos, redes
-   **dependencias del sistema**:
    -   servicios de terceros o APIs que tienen tiempos de respuesta variables
    -   problemas en el manejo de concurrencia o condiciones de carrera en el sistema
-   **errores en el diseño de la prueba**:
    -   dependencia en tiempos exactos o valores dinamicos
    -   datos de prueba inestables o no bien controlados

#### clasificacion
-   **dependencia temporal**:
    
    -   pruebas que fallan por tiempo de espera insuficiente (timeouts)
    -   sensibilidad a la velocidad del procesador o la red
-   **condiciones de concurrencia**:
    
    -   pruebas que se ejecutan en paralelo y acceden a los mismos recursos, generando conflictos
-   **estado compartido**:
    
    -   Reutilización de datos de prueba o artefactos entre ejecuciones
-   **entorno no controlado**:
    -   variaciones en configuraciones de entorno, como rutas de archivo o variables de entorno

#### impacto

-   **confianza disminuida**: desarrolladores y testers tienden a ignorar los resultados de pruebas intermitentes, lo que puede ocultar problemas reales
-   **interrupciones en CI/CD**: ls pipelines de integracion continua pueden detenerse innecesariamente
-   **costos adicionales**: tiempo dedicado a diagnosticar problemas falsos en lugar de trabajar en fallos reales

#### como mitigarlos
-   **aislar dependencias externas**:
    -   simular respuestas con mocks o stubs
-   **controlar el entorno de prueba**:
    -   usar entornos de prueba consistentes, como contenedores Docker
-   **rvisar el diseño de la prueba**:
    -   evitar dependencias de tiempo exacto o recursos compartidos
-   **establecer mecanismos de tolerancia**:
    -   implementar tecnicas como retries controlados o limites de tiempo mas razonables

###  Qué es?
Un flaky test es una prueba automatizada que arroja resultados inconsistentes bajo las mismas condiciones. Es decir, a veces pasa y otras falla sin que haya cambios en el código, los datos de entrada o el entorno de ejecución. Esto puede suceder por diversas razones, como dependencias externas no controladas, problemas en el diseño de la prueba o factores relacionados con la concurrencia. Tambion conocidos como pruebas inestables se definen como pruebas que devuelven tanto aprobaciones como fallos a pesar de no haber cambiado el código o la propia prueba.


### Como se implementa?
Un flaky test no se implementa intencionalmente, ya que su naturaleza inconsistente se considera un error en el diseño o configuración de la prueba. 

asi se puede simular un flaky test
![simular un flaky](./js%20flaky%20test.png)

en la imagen se puede ver un comportamientio aleatoreo en la funcion getData(), la cual falla un 50% de las veces lo que hace que el test se ainconcistente

los resultados de este test son inconcistentes ya que algunas veces saldra el mensaje de succses y otras que el servidor no esta disponible.

### mejores practicas para identificar y reducir tests inestables

existen varias tecnicas que se pueden utilizar para identificar y reducir los tests inestables, entre ellas:

1. **configurar reintentos automaticos de pruebas**  
   algunas herramientas permiten a los desarrolladores automatizar los reintentos de pruebas para que se vuelvan a ejecutar tan pronto como la prueba falle, lo que evita que los tests inestables arruinen ejecuciones completas o compilaciones en ci

2. **ajustar los tiempos de espera**  
   al cambiar los tiempos de espera, tus pruebas tendran mas tiempo para permitir que las solicitudes se completen antes de marcar el paso como fallido.

3. **verificar fugas de memoria**  
   las fugas de memoria pueden ser perjudiciales para el rendimiento de tu aplicacion. los desarrolladores pueden implementar herramientas de prueba de memoria para eliminar las fugas antes de que afecten a los usuarios finales de la aplicacion


# que causa los tests inestables

dado que mas desarrolladores dependen de los flujos de trabajo ci/cd para desplegar sus aplicaciones, las pruebas automatizadas se han convertido en una parte clave del proceso de desarrollo. la automatizacion permite la prueba continua, lo que puede ayudar a los desarrolladores a identificar errores mas temprano en la pipeline, pero incluso los suites de pruebas automatizadas pueden fallar, causando tests inestables.

las pruebas necesitan ser confiables para que los desarrolladores puedan enviar codigo de calidad a produccion, y si se ignoran los tests inestables, los errores o problemas en el codigo pueden ser facilmente pasados por alto. existen varios factores diferentes que pueden causar inestabilidad, y todos ellos pueden ralentizar tus pipelines y despliegues ci/cd o manifestar problemas para el usuario final de tu aplicacion. algunas de las causas mas comunes de inestabilidad incluyen:

1. **pruebas mal escritas**. una prueba solida debe ser lo mas determinista posible. por lo tanto, cuando la prueba falla, esa falla indica una verdadera regresion o problema. si un desarrollador no crea una prueba con suficientes suposiciones o la prueba no puede hacer cumplir las suposiciones realizadas, la prueba tendra resultados mezclados.

2. **espera asincronica**. cuando una prueba realiza una accion, la aplicacion requiere tiempo para completar la solicitud. los desarrolladores pueden escribir pruebas que utilicen sentencias de espera para hacer que la prueba espere un tiempo especifico antes de comprobar si la accion fue exitosa. a veces, una aplicacion necesitara mas tiempo del que definieron para completar una tarea, y es en este momento cuando puede ocurrir la inestabilidad.

3. **dependencia del orden de prueba**. una prueba debe ser capaz de ejecutarse independientemente en cualquier orden y crear su propio entorno de ejecucion, asi como limpiar despues de si misma. los problemas de dependencia surgen cuando las pruebas dependen de recursos compartidos, como archivos, memoria o bases de datos, y si esos datos no se modifican en un orden preestablecido, la prueba fallara.

4. **concurrencia**. la inestabilidad tipicamente ocurre cuando un desarrollador hace una suposicion incorrecta sobre el orden en que se estan realizando las operaciones por los diferentes hilos. si la prueba solo acepta un conjunto especifico de comportamientos, aunque haya varios comportamientos de codigo que podrian ser correctos, entonces el resultado de la prueba sera no determinista.


[link del video ](https://youtu.be/W50FXZBhuNA)