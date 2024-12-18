
## Trabajo Individual

# Informe sobre Linters - Demo con ESLint

## Desarrollo Conceptual

Un Linter es una herramienta que analiza el código fuente de manera estática, es decir, sin compilarlo y ejecutarlo, para identificar defectos, fallos o problemas. El objetivo principal de estas herramientas es garantizar que el código siga una serie de reglas preestablecidas y notificar sobre sus deficiencias para que los programadores puedan optimizar y mejorar su código fuente, facilitando el proceso de desarrollo y mantenimiento posterior.

El término Linter proviene de un recurso antiguo denominado Lint, desarrollado para el lenguaje de programación C, que analizaba el código en busca de errores. Por ello, esta herramienta se ha expandido a otros lenguajes de programación para optimizar y mejora códigos implementados.

## Funciones de los Linters

Si bien existen diversos Linters que están enfocados a un lenguaje de programación en especial, estos suelen tener las mismas características y funciones:

- **Estandarización de estilo en la redacción de código.** Esta función mejora la legibilidad del código al contar con reglas de estilo que hagan constante la estructura en la que se escribe el código, siendo importante cuando hay más de un desarrollador modificando diversas partes del código fuente.
- **Detección de errores comunes de programación.** Estas herramientas permiten encontrar errores de sintaxis, variables y funciones no utilizadas. Notifican sobre estos errores para ser corregidos o tomadas en consideración por el programador.
- **Reconocer potenciales code smells (código apestoso) que afecten la calidad del código redactado.** Estos pueden ser funciones largas o no optimizadas, líneas duplicadas o código no alcanzable. Por lo cual, los Linters también pueden sugerir o forzar el uso de buenas prácticas de programación.
- **Revisión de seguridad y vulnerabilidades.** De igual manera, esta herramienta puede reconocer patrones de código que permitar ser explotados con diversas técnicas de ataque como inyección de SQL, XSS (Cross-Site Scripting), etc.

## Limitaciones de los Linters

El uso de Linters es óptimo cuando su configuración es afinada, ya que en caso no lo esté, puede llegar a ser perjudicial para el desarrollo de software:

- **Necesidad de configuración.** La herramienta tiene que ser configurada en base a las necesidades y preferencias del equipo de desarrollo. Esto puede ser tedioso porque la mala implementación puede ocasionar que el Linter sea o muy restrictiva o floja, afectando su utilidad.
- **Foco extenso pero limitado.** Como se mencionó en sus funciones, los Linters pueden identificar una gran variedad de errores o patrones. Sin embargo, en caso haya un error de una gran complejidad o problemas de diseño de software, la herramienta puede no reconocer estos defectos.
- **Falsos positivos.** Por otro lado, el Linter puede detectar problemas cuando no son errores. Esto puede ocasionar distracciones al gastar el tiempo del programador al tener que revisar e intentar arreglar un error que no existe.
- **No detectan todos los errores de lógica.** Este problema radica en que los Linters son herramientas de análisis estático que no detectan errores que sólo aparecen cuando el software es ejecutado.
- **Dependencia por parte del programador.** El uso de esta herramienta puede causar que los programadores confíen en lo que es notificado, disminuyendo la revisión manual del código y sus pruebas de funcionalidad y calidad. Esto debido a que los Linters no garantizan que el código redactado sea eficaz o eficiente.

## ¿Por qué usar Linters?

> “El IDE que utilizo ya me notifica sobre errores de programación como la mala escritura de variables, funciones o cuando no estoy utilizando ninguna de las anteriores, ¿Por qué debería utilizar un Linter si mi IDE ya hace lo mencionado?”

En este caso, los entornos de desarrollo integrados (IDEs) cuentan con una función llamada protocolo de servidor de lenguaje que son características desarrolladas para el IDE que permite acciones de autocompletado, sintaxis y detección de errores muy comunes.

Es por esto que estas herramientas en comparación a los Linters, se enfocan en mejorar la experiencia y usabilidad de los IDEs, facilitando la acción de programar. Mientras que la utilidad de los Linters radica en el uso de reglas para un lenguaje de programación en específico que prevengan la aparición de errores, malas prácticas y estilos diferentes.

## Algunos Linters disponibles

- **ESLint:** Creado para JavaScript e incluso TypeScript, siendo compatible con frameworks adicionales como React.js, Vue.js, Node.js, etc.
- **Pylint:** Creado para el lenguaje de programación Python. Usa PEP 8 (guía de estilo de python) y puntúa la “calidad” del código escrito.
- **Rubocop:** Creado para el lenguaje de programación Ruby. Compatible con frameworks como Rails, utilizando reglas adicionales.
- **Checkstyle:** Creado para Java, enfocado en estandarizar la redacción de código en Java utilizando convenciones determinadas por Google o Sun.

# Consideraciones Técnicas

En este caso se utilizará el Linter para el lenguaje de programación javascript: ESLint. Como el Linter utiliza JavaScript, es necesario que el usuario cuente con Node.js con versión mayor a la 18.18.0.

[Página para descargar Node.JS](https://nodejs.org/en/)

Se puede instalar ESLint de dos maneras, primero instalando globalmente ESLint en tu computadora o sólamente en el proyecto que se desee. Para instalar ESLint de forma global para ser utilizado en cualquier proyecto que utilice JavaScript o TypeScript se tiene que ejecutar el siguiente comando:

~~~
npm install -g eslint #Para instalar globalmente eslint
~~~


Según el sistema de gestión de paquetes que utilice, se corre el siguiente comando para instalar los paquetes necesarios de ESLint en el proyecto. Sin embargo, cabe recalcar que para iniciar este proceso, se necesita contar con el archivo “package.json”.

~~~
npm init -y #Para crear el package.json con los valores por defecto

npm init @eslint/config@latest #En caso no se tenga ESLint instalado globalmente

eslint --init #En caso se haya instalado ESLint globalmente
~~~

Al iniciar la instalación, ESLint hará preguntas sobre la estructura del proyecto en el que se está instalando.

- **Modo de uso:** Chequeo de sintaxis y problemas, sólo chequeo de sintaxis o reforzar también el estilo de código.

- **Módulos que use el proyecto.** JavaScript modules, Common JS, etc.

- **Frameworks que utilice el proyecto.** React, Vue, ninguno.

- **Uso de TypeScript.** No en caso se utilice sólo JavaScript

- **Entorno de ejecución.** Medio por el cual se ejecuta el software.

- **Preguntas adicionales sobre estilos de código.** En versiones antiguas permitía utilizar guías de estilo como las de Airbnb, Google o el Estándar*

> *En sus últimas versiones ESLint indicó que el alcance de su desarrollo no podía seguir incluyendo las reglas y guías de estilos de codificación por lo que quitó dicha función y recomendó extensiones o herramientas creadas específicamente para sugerir reglas de estilos como el caso de Prettier en VS Code.

Cuando se termine de responder a las preguntas por parte de ESLint, la herramienta tendrá que instalar los paquetes relacionados a los módulos y frameworks que utilice tu proyecto.

Una vez se completó con la instalación, se necesita correr el siguiente comando para que ESLint se ejecute e indique algún error que se encuentre en todo el proyecto o en un archivo en específico.

~~~
npx eslint . # Para correr ESLint en todo el proyecto

npx eslint ./src/archivo.js # Para analizar sólo un archivo
~~~

En caso se utilice Visual Studio Code, se puede instalar la extensión de ESLint para poder visualizar las recomendaciones desde el mismo IDE en vez de ejecutar una y otra vez en el terminal el comando de revisión de código de ESLint.

![Imagen de ESLint en las extensiones de VSCode](./ESLint%20VS%20Code.png)

Por último se tiene [la documentación de ESLint](https://eslint.org/docs/latest/) para conocer más sobre sus funciones.

# Demostración de ESLint

En este caso se tiene una archivo básico de JavaScript y una página web desarrollada con React.js, y se utilizará ESLint para conocer si existe algún problema de sintaxis o error de lógica.

[URL DE LA DEMOSTRACIÓN EN VIDEO](https://youtu.be/_6D6DQiSvI4)

# Referencias

Codacy. (2023, 25 de octubre). What Are Linters? (+ Why Your Team Should Use Them). <https://blog.codacy.com/what-is-a-linter>

ESLint. (s.f.). Find and fix your problems in JavaScript code.<https://eslint.org/>

ESLint. (s.f.). Getting Started with ESLint. <https://eslint.org/docs/latest/>

Linkedin. (s.f.). ¿Por qué debería usar un linter en su código?. <https://www.linkedin.com/advice/1/why-should-you-use-linter-your-code-skills-application-development-exyhf?lang=es&originalSubdomain=es>

Microsoft Learn. (2023, 4 de octubre). Protocolo de servidor de lenguaje. <https://learn.microsoft.com/es-es/visualstudio/extensibility/language-server-protocol?view=vs-2022>

SonarSource. (s.f.). What is a linter? Lint Code Definition & Guide. <https://www.sonarsource.com/learn/linter/>

---

[Ver integrantes](../0.md)

[Regresar al índice](../../README.md)