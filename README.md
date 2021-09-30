# Grupo10

## RESUMEN
```sh
              Juego de cartas y gestión de recursos donde debemos crear una película, dividida en actos, 
             en función de las posibilidades que tengamos. En cada acto se deberán seleccionar un conjunto 
                          de cartas con el fin de mantener la atención de la audiencia. 

```
- Géneros: 
  - Estrategia por turnos
  - Cartas
  - Gestión de Recursos.
- Plataformas: 
  - Navegador web
- Público Objetivo: 
  - Edad: Todos los públicos
  - Sexo: Cualquiera
  - Región: Europa
  - Idioma: Español

## ASPECTOS GENERALES
### RELATO BREVE Y PARCIAL DE UNA PARTIDA TÍPICA
El juego comienza con cinco cartas aleatorias a disposición del jugador, el cual podrá poner en juego las que considere oportunas. Tras esto, pasará al segundo acto y el jugador robará dos cartas. A partir de este acto la audiencia demandará un tipo de recurso en concreto. De nuevo, el jugador podrá poner en juego las cartas que quiera y pasará de acto. La partida termina si el jugador logra completar el quinto acto (ganando la partida y obteniendo una puntuación específica) o si la atención de la audiencia llega a 0 (en cuyo caso se ha perdido).

## JUGABILIDAD
### MECÁNICA
#### MECÁNICAS BASE
  - Seleccionar cartas y ponerlas en juego: Las cartas se seleccionan dando click sobre ellas. Para ponerlas en juego solo habrá que cumplir con los requisitos (si los hay) y arrastrar la misma hasta encima de la mesa. En el momento en el que se suelta la carta esta se considera jugada.

  - Puntuación de trofeos de distintos tipos: Hay un contador que informa en todo momento de cuántos trofeos se han generado y de qué color.

  - Atención de la audiencia: La atención de la audiencia se representa con un número que va desde 0 hasta 10. Si la atención está entre 8 y 10 (incluyendo ambos) el número de trofeos generados aumenta en +2 cada vez que se generase un trofeo [A DECIDIR SI POR CADA TROFEO O POR CADA VEZ QUE SE GENEREN TROFEOS]. Si la atención está entre 1 y 3 (incluyendo ambos) el número de trofeos generados disminuye en -2 cada vez que se generase un trofeo[LO MISMO DE ANTES]. Si la atención de la audiencia llega en algún momento a 0 la partida se termina y se considera que el jugador ha perdido.
   
  - Robar: Distintas situaciones o efectos pueden hacer que se robe. Al robar el jugador obtiene un número de cartas aleatorias X (dependiendo de la situación detonante). No se pueden tener en la mano más de Y[A CONCORDAR ENTRE TODOS] cartas. Si se roba teniendo Y cartas entonces se elige qué cartas quedarse y cuáles desechar hasta que se tienen Y cartas; entonces el juego se retoma.

  - Interacción entre recursos: Los recursos (amarillo, rojo y azul) se afectan entre sí. Cuando se genera un recurso de un color se modifica la cantidad de otro en una medida igual a la jugada siguiendo el siguiente esquema:
![alt text](http://url/to/img.png)
> Aclaración: la modificación solo se da cuando los recursos son creados por primera vez. Esto quiere decir que es posible tener amarillo y rojo a la vez en la mesa, por ejemplo, siempre y cuando el amarillo hubiese ido primero y luego fuese el rojo.

#### MECÁNICAS GENERALES
  - Pasar de Acto: Cada acto termina cuando el jugador quiere. Se pasa de acto pulsando el botón asociado a esta acción. Cuando se pasa de acto se detonan ciertos eventos:
    - Robas: Al comienzo de cada acto a partir (e incluyendo) del segundo se roban dos cartas aleatorias.
    - Atención: A partir del segundo acto la audiencia demanda que se genere un tipo de emoción en específico. Si se genera la cantidad de recursos en el mismo acto la atención de la audiencia aumenta +2 y si no se reduce en -2. 

  - Tipos de cartas:
    - Escenarios: Los escenarios generan recursos de un color específico durante todos los actos en los que estén en juego incluyendo el momento en el que se ponen en juego.
    - Personajes: Los personajes al ser puestos en juego generan una cantidad determinada de recursos. A partir de ese momento y siempre que se asocie una carta a ellos, modificarán el efecto de la misma de una forma específica dependiendo del personaje. Para asociar una carta a un personaje solo hay que soltarla encima de este. Solo se pueden asociar acciones a personajes.
    - Acciones: Las acciones son cartas que modifican el estado de la mesa. Los posibles efectos de las acciones son variados y dependen de cada carta. Las acciones solo se pueden jugar si se asocian a un personaje.

#### MECÁNICAS DE CARTAS
  - Generar recursos: se generan X recursos en la mesa del color indicado.
  - Transformar recursos: se transforma un número X de recursos de un color a otro color.
  - Canjear recursos en trofeos: se convierten X recursos de un color a trofeos del mismo color. 
  - Aumentar/disminuir atención del público: la atención de la audiencia se modifica en X.
  - Ser jugadas al ser robadas: cartas con este efecto se ponen en juego automáticamente al ser robadas a la mano.
  - Quitar cartas de la mesa: quitan las cartas seleccionadas de la mesa. Por tanto las cartas quitadas dejan de estar en juego.
  - Robar: se roban X número de cartas.
  - Generar X carta: al jugar una carta con este efecto se roba una copia de la carta X.
  - Generar X película: existe una lista de películas de Hitchcock las cuales pueden ser generadas si se han jugado determinadas cartas y se dispone de cierta cantidad de recursos (dependerá de la película en concreto). Las películas se generan al final del último acto y proporcionan puntuación adicional.

#### CONTROLES

#### CÁMARA

### DINÁMICA

### ESTÉTICA

## MENÚS Y MODOS DE JUEGO

### CONFIGURACIÓN

### INTERFAZ Y CONTROL

## CONTENIDO

### HISTORIA

