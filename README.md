# BAFTA - Grupo 10

https://asegar01.github.io/BAFTA/

## RESUMEN
```sh
              Juego de cartas y gestión de recursos donde debemos crear una película, dividida en actos, 
             en función de las posibilidades que tengamos. En cada acto se deberán seleccionar un conjunto 
                          de cartas con el fin de mantener la atención de la audiencia. 
```
- Géneros: 
  - Cartas
  - Estrategia por turnos
  - Gestión de recursos
- Plataformas: 
  - PC (Navegador web)
- Público Objetivo: 
  - Edad: Todos los públicos
  - Sexo: Cualquiera
  - Región: Europa
  - Idioma: Español
## DESCRIPCION
Juego de cartas y gestión de recursos donde, dadas unas cartas que representan escenarios, personajes o acciones, deberás aguantar hasta el final del quinto acto haciendo una película con las cartas que tengas sin aburrir a la audiencia. Si la audiencia se aburre en algún momento pierdes la partida. 
Comienzas en el primero de cinco actos. Los actos se suceden uno detrás de otro teniendo tres fases diferenciadas cada uno de ellos:

- Capricho de la audiencia (a partir del segundo acto): la audiencia te hace saber que emoción quiere sentir en este acto. Si eres capaz de satisfacerla conseguirás aumentar su atención, pero si el siguiente acto comienza sin haberlo conseguido se aburrirán.
- Fase de robo: si es el primer acto roba cinco cartas de la parte superior del mazo, si estás en cualquier otro acto roba dos cartas.
- Fase de juego: juegas tantas cartas como quieras, dependiendo de los efectos de cada una pasarán unas cosas u otras. Para jugar una carta ponla boca arriba sobre la mesa.

Cuando estés satisfecho con lo que has jugado simplemente pulsa en el botón de pasar de acto.
Después de estas fases un nuevo acto comienza siguiendo el mismo esquema. Si consigues llegar al final del quinto acto sin aburrir a la audiencia tu película termina y consigues trofeos.
![Untitled](https://user-images.githubusercontent.com/62616911/146831329-5f30eb5f-18e3-4296-a87f-6021c81a01ef.png)

## ASPECTOS GENERALES
### RELATO BREVE Y PARCIAL DE UNA PARTIDA TÍPICA
El juego comienza con cinco cartas aleatorias a disposición del jugador, el cual podrá poner en juego las que considere oportunas. Tras esto, pasará al segundo acto y el jugador robará dos cartas aleatorias. A partir de este acto, la audiencia demandará un tipo de recurso en concreto -drama, suspense o comedia-, de manera que si al finalizar el acto no se han puesto en juego cartas correspondientes a ese recurso, el nivel de atención de la audiencia disminuirá. De nuevo, el jugador podrá poner en juego las cartas que quiera y pasará de acto. Existe un tipo de cartas las cuales, al ponerlas en juego, transforman la cantidad de recursos actual de un tipo en concreto en trofeos, los cuales determinan la puntuación final de la partida. La partida termina si el jugador logra completar el quinto acto, ganando y obteniendo una puntuación específica, o si la atención de la audiencia llega a cero, en cuyo caso se ha perdido.
## JUGABILIDAD
### MECÁNICA
#### MECÁNICAS BASE
  - Seleccionar cartas y ponerlas en juego: Las cartas se seleccionan dando click sobre ellas. Para ponerlas en juego solo habrá que cumplir con los requisitos -si los hay- y arrastrar la misma hasta el tablero de juego. En el momento en el que se suelta la carta se considera jugada.
  - Puntuación de trofeos de distintos tipos: Hay un contador que informa en todo momento de cuántos trofeos se han generado y de qué tipo.
  - Atención de la audiencia: La atención de la audiencia se representa con un número comprendido entre 0 y 10. Si la atención de la audiencia llega en algún momento a 0 la partida se termina y se considera que el jugador ha perdido.
  - Robar: Distintas situaciones o efectos pueden hacer que se robe, tales como pasar de acto y jugar determinadas cartas. Al robar, el jugador obtiene un número X de cartas aleatorias, dependiendo de la situación detonante. No se pueden tener más de cinco cartas en la mano al final del acto. Si se tienen más al final del acto se deben descartar tantas cartas como haga falta para llegar a cinco. Las cartas a descartar las selecciona el jugador.
  - Interacción entre recursos: Los recursos -drama, suspense y comedia- se afectan entre sí. Cuando se genera un recurso de un tipo se modifica la cantidad de otro en una medida igual a la jugada siguiendo el siguiente esquema:
![Untitled](https://user-images.githubusercontent.com/62616911/141502231-e04b0f7f-2a15-4995-aaf6-f95a8584c334.png)

> Aclaración: la modificación solo se da cuando los recursos son creados por primera vez. Esto quiere decir que es posible tener comedia y suspense al mismo tiempo en el tablero, por ejemplo, siempre y cuando la comedia hubiese ido primero y luego el suspense.
#### MECÁNICAS GENERALES
  - Pasar de Acto: Cada acto termina cuando el jugador quiere. Se pasa de acto pulsando el botón asociado a esta acción. Cuando se pasa de acto se detonan ciertos eventos:
    - Robar: Al comienzo de cada acto a partir del segundo -este incluído- se roban dos cartas aleatorias.
    - Atención: A partir del segundo acto, la audiencia demanda que se genere un tipo de recurso en específico. Si, al terminar el acto, se ha generado la cantidad de recursos demandada, la atención de la audiencia aumenta +2. En caso contrario, se reduce en -2. 
  - Completar una película de Hitchcock: cuando se juegan cinco cartas pertenecientes a una misma película se considera que se ha completado dicha película. Al final de la partida se comunica al jugador con una imagen emblemática de esta. La presencia de las cartas necesarias para completar una de estas películas es aleatoria.
  - Tipos de cartas:
    - Escenarios: Los escenarios generan recursos de un tipo específico durante todos los actos en los que estén en juego, incluyendo el momento en el que se ponen en juego.
    - Personajes: Los personajes, al ser puestos en juego, generan una cantidad determinada de recursos. A partir de ese momento y siempre que se asocie una carta a ellos, modificarán el efecto de la misma de una forma específica dependiendo del personaje. Para asociar una carta a un personaje solo hay que soltarla encima de este. Solo se pueden asociar acciones a personajes.
    - Acciones: Las acciones son cartas que modifican el estado del tablero. Los posibles efectos de las acciones son variados y dependen de cada carta. Las acciones solo se pueden jugar si se asocian a un personaje.
#### MECÁNICAS DE CARTAS
  - Generar recursos: se generan X recursos en el tablero del tipo indicado.
  - Transformar recursos: se transforma un número X de recursos de un tipo a otro.
  - Canjear recursos por trofeos: se convierten X recursos de un tipo a trofeos del mismo tipo.
  - Aumentar/disminuir la atención del público: la atención de la audiencia se modifica en X.
  - Ser jugadas al ser robadas: cartas con este efecto se ponen en juego automáticamente al ser robadas a la mano.
  - Quitar cartas de la mesa: quitan las cartas seleccionadas de la mesa, las cuales dejan de estar en juego.
  - Robar: se roban X número de cartas.
  - Generar X carta: al jugar una carta con este efecto se roba una copia de la carta X.
  - Completar X película: existe una lista de películas de Hitchcock las cuales pueden ser completadas si se han jugado determinadas cartas y se dispone de cierta cantidad de recursos -dependerá de la película en concreto-. Las películas se generan al final del último acto y proporcionan puntuación adicional.
#### CONTROLES
El jugador tiene control total sobre las cartas que se encuentren en su mano, pudiendo combinarlas para desarrollar acciones. Podrá además acceder al siguiente acto en todo momento. Al comienzo de cada acto, podrá interactuar con el mazo para robar cartas. Todas estas acciones podrán ser realizadas con el botón izquierdo del ratón.
#### CÁMARA
La cámara enfoca todo el escenario y está compuesta de dos tipos: una cámara cenital en el cuadro inferior que muestra el tablero de juego y una cámara de visión frontal en el cuadro superior, mostrando la sala de cine y la audiencia.
### DINÁMICA
El objetivo principal del juego es completar una película, en cuyo caso se ha ganado. Se considera que se ha completado una película si la atención del público no ha caído a cero antes del final del quinto acto. Se pierde si no se consigue completarla, ya que se ha perdido la atención del público.
El objetivo secundario es hacer las películas de Hitchcock al jugar determinadas cartas. Esto solo supondrá un extra de puntos, además de un objetivo oculto para los jugadores. Las cartas necesarias son aquellas que pertenezcan a la misma película. Se necesita jugar un total de cinco cartas pertenecientes a la misma película para que se considere que se ha hecho esa película.
El sistema de puntuación está basado en la cantidad de trofeos obtenidos durante la partida, los cuales se corresponden a la cantidad de recursos de cada tipo transformados en trofeos.
La estrategia que esperamos que desarrollen los jugadores es intentar reunir la mayor cantidad de trofeos posible, teniendo en cuenta cómo las cartas que juegan pueden afectar a la atención del público, además de intentar hacer alguna película concreta de Hitchcock para obtener más puntuación. Deberán también tener en cuenta el nivel de atención de la audiencia para no perder la partida.
#### INTERACCIÓN ENTRE CARTAS Y ESTRATEGIAS POR TIPOS
Las cartas de acción deberán ser las más comunes junto con los personajes, puesto que solo se puede tener un escenario en juego al mismo tiempo. Esto lleva a jugar pocos escenarios bien medidos.
Los escenarios más codiciados serán aquellos que generen más recursos que el resto puesto que la fluctuación de la atención del público se puede subsanar con cartas de personaje o acción. Por tanto, los escenarios que generen más deberán tener un impacto negativo en la atención del público al entrar en juego. Esto “simula” el hecho de que un escenario no parezca gran cosa al principio pero a medida que se va desarrollando la película tiene mayor impacto en la audiencia. Los escenarios no tienen interacción directa con otras cartas pero los recursos que van generando marcan la ruta de la partida debido a la interacción de los recursos entre ellos, lo cual limita las cartas que se pueden jugar de forma efectiva.
Los personajes más codiciados serán aquellos que tengan efectos “fuertes” al jugar acciones o los que generen más recursos. La carta 'Niño bueno' es un ejemplo de carta estándar -entendiendo que puede haber cartas mejores pero se encuentra en la media de lo esperable, tal vez un poco por debajo-. La estrategia con los personajes podría ir por dos caminos: 
  - 1. Buscar los más impactantes al principio y luego intentar estabilizar la atención del público con acciones.
  - 2. Jugar personajes “normales” al principio para no desequilibrar mucho la atención del público y luego ir jugando una mezcla de acciones y personajes para ir cambiándola a nuestro favor.
Los personajes interaccionan con las cartas de acción de forma directa, produciendo un efecto cada vez que se asocia una a un personaje en juego. Habrá que tener cuidado con a quien ligar según qué acciones para sacar el mayor provecho a los diferentes efectos.
Las cartas de acción son muy variadas y sirven para controlar la generación de recursos y su transformación en puntos de victoria -trofeos- u otros recursos. La estrategia idónea es jugar acciones que nos den trofeos al mismo tiempo que intentamos mantener la atención del público alta.
Las cartas de acción pueden interaccionar con los otros dos tipos de cartas. De forma indirecta ocurre al generar recursos o transformarlos; de forma directa al poner o quitar cartas del tablero, cambiarlas a otras, etc.
### ESTETICA
BAFTA está ambientado en una sala de cine de los años 60, donde se proyectaban únicamente películas en blanco y negro. Los colores de las cartas son más vivos respecto a los colores del fondo, los cuales son tonos de blancos y negros, para así poder diferenciar los objetos interactuables del escenario.
#### LISTA DE PELICULAS
![listapelis](https://user-images.githubusercontent.com/62616911/141502405-4d3e7d89-590e-4fb5-9e54-1c0c425a1462.png)

Los cuadrados morados representan las carátulas (imagen + nombre) de las películas de Hitchcock que se pueden llegar a completar.
#### INTERFAZ Y CONTROL
![interfaz](https://user-images.githubusercontent.com/62616911/141502460-ace6b549-00f2-4ec8-a504-8c4618df90ac.png)

La parte marrón oscuro es la mesa donde se juegan las cartas. El rectángulo rojo oscuro representa el mazo y los rectángulos rojos más claros representan cartas que tendría el jugador en la mano (es decir, sin jugar). El visor del medio de la pantalla es la audiencia viendo la película, en algunos momentos la pantalla pondrá el recurso que la audiencia quiere en este acto.
![1](https://user-images.githubusercontent.com/62616911/141502525-ddeaeb2e-5ab0-4013-b3df-b17916d1305b.png)

1- Impacto en la audiencia: aquí está la cantidad (ej: +1, -1) en la que la carta modifica la atención de la audiencia cuando es puesta en juego.
2- Imagen de la carta: imagen representante de la carta. Ya sea una escena o un personaje emblemático de Hitchcock.
3- Nombre de la carta: el nombre identificador de la carta. Útil por si algún efecto llama a este nombre, por ejemplo.
4- Descripción de la carta: texto que indica el efecto que tiene lugar al poner la carta en juego.
5- Icono de tipo de carta: un icono gráfico que indica si la carta es una ACCIÓN, un PERSONAJE, o un ESCENARIO.
#### CARTAS
![1](https://user-images.githubusercontent.com/62616911/141502525-ddeaeb2e-5ab0-4013-b3df-b17916d1305b.png)

![2](https://user-images.githubusercontent.com/62616911/141502621-a438ec12-17b4-43d3-85e5-846df164e8b9.png)

![3](https://user-images.githubusercontent.com/62616911/141502676-9af24c73-b837-4c09-8332-dced1b71983a.png)

![4](https://user-images.githubusercontent.com/62616911/141502724-929ffb2f-7ec5-40ab-9491-1db062f10211.png)

![5](https://user-images.githubusercontent.com/62616911/141502772-404785db-e2b6-4840-9977-39d989f1fcbf.png)

#### DIAGRAMA DE HERENCIA
![Untitled Diagram (2) drawio](https://user-images.githubusercontent.com/62616911/146660475-6ad8b8cf-0af3-4933-829d-d08f29d1574d.png)

Aparte de estas clases hay una clase Director que se encarga de:
- Puntuación
- Recursos en juego 
- Atención de la audiencia
- Familias de cartas jugadas (así como número de cartas de esas familias que se han jugado)
## REFERENCIAS
- Cultist Simulator: cartas de acción asociadas a personajes y su forma de interactuar debido a esto.
## COMUNICACIÓN
- Discord: Aplicación de comunicación por voz para realizar reuniones.
- WhatsApp: Aplicación de comunicación por mensajes para resolver cualquier duda o problema durante el desarrollo y acordar las reuniones.
## GESTIÓN
- Pivotal Tracker: Aplicación para gestionar el desarrollo del proyecto y llevar un seguimiento del mismo.
https://www.pivotaltracker.com/n/projects/2535325
- GitHub: Aplicación de control de versiones para poder tener actualizado el proyecto en todo momento.
