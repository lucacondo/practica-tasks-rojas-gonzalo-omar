1. ¿Qué es dotenv?

dotenv es un módulo de Node.js que carga variables de entorno desde un archivo llamado .env hacia el objeto global de Node llamado process.env. Su propósito principal es mantener la seguridad aislando datos sensibles (como contraseñas, usuarios o puertos de bases de datos) para que no queden escritos directamente en el código fuente ni se expongan al subir el proyecto a GitHub. También facilita la portabilidad, ya que permite cambiar la configuración dependiendo de si el proyecto corre en tu computadora o en un servidor real, sin tocar el código.
2. ¿Cómo se instala?

Se instala como una dependencia del proyecto utilizando npm. Solo debes ejecutar el siguiente comando en la terminal:
Bash

npm install dotenv

3. ¿Cómo se configura?

    Creas un archivo exactamente llamado .env en la raíz del proyecto (al mismo nivel que package.json).

    Defines las variables escribiendo el nombre en mayúsculas, seguido de un signo igual, y luego el valor, sin comillas ni espacios. Por ejemplo:

    Fragmento de código

    PORT=3000
    DB_USER=root
    DB_PASS=mi_contraseña

    Agregas obligatoriamente el archivo .env dentro de tu archivo .gitignore para que Git lo ignore.

    Creas un archivo llamado .env.example que contenga solo las claves vacías. Este sí se sube a GitHub para que otros sepan qué configurar.

4. ¿Cómo se accede a las variables desde el código?

Usando ESModules (import/export), debes invocar la configuración de dotenv al inicio del archivo donde vas a usar las variables con esta línea:

import 'dotenv/config';

A partir de ahí, puedes acceder al valor de cualquier variable leyendo el objeto global de Node con la sintaxis process.env.NOMBRE_VARIABLE.