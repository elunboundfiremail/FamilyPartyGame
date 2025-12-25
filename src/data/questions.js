// Banco de preguntas para el juego
export const triviaQuestions = {
  peliculas: [
    { q: "¿En qué película aparece la frase 'Yo soy tu padre'?", a: ["Star Wars", "La Guerra de las Galaxias"], points: 10 },
    { q: "¿Quién interpretó a Jack en Titanic?", a: ["Leonardo DiCaprio", "Leo DiCaprio"], points: 10 },
    { q: "¿Qué película ganó el Oscar a Mejor Película en 2020?", a: ["Parasite", "Parásitos"], points: 15 },
    { q: "¿Cómo se llama el león de 'El Rey León'?", a: ["Simba"], points: 5 },
    { q: "¿En qué película aparece el personaje 'Forrest Gump'?", a: ["Forrest Gump"], points: 10 },
    { q: "¿Quién dirigió 'El Padrino'?", a: ["Francis Ford Coppola", "Coppola"], points: 15 },
    { q: "¿Qué superhéroe es Tony Stark?", a: ["Iron Man", "El Hombre de Hierro"], points: 5 },
    { q: "¿En qué película aparece 'Hakuna Matata'?", a: ["El Rey León", "The Lion King"], points: 10 },
  ],
  
  novelas: [
    { q: "¿En qué país se desarrolló la novela 'Betty la Fea'?", a: ["Colombia"], points: 10 },
    { q: "¿Cómo se llama la protagonista de 'María la del Barrio'?", a: ["María", "Thalía"], points: 10 },
    { q: "¿Quién es 'Rubí' en la novela mexicana?", a: ["Bárbara Mori", "Barbara Mori"], points: 15 },
    { q: "¿En qué novela aparece 'Don Armando' como jefe?", a: ["Yo soy Betty la fea", "Betty la Fea"], points: 10 },
    { q: "¿Qué novela tiene la canción 'Déjame llorar'?", a: ["María de todos los Ángeles"], points: 15 },
  ],
  
  canciones: [
    { q: "¿Quién canta 'Despacito'?", a: ["Luis Fonsi", "Daddy Yankee"], points: 5 },
    { q: "¿De qué país es Shakira?", a: ["Colombia"], points: 5 },
    { q: "Completa: 'Bésame, bésame mucho...'", a: ["Como si fuera esta noche la última vez"], points: 15 },
    { q: "¿Quién canta 'La Bamba'?", a: ["Ritchie Valens"], points: 10 },
    { q: "¿Qué banda canta 'Macarena'?", a: ["Los del Río", "Los del Rio"], points: 10 },
    { q: "¿Quién es 'El Sol de México'?", a: ["Luis Miguel"], points: 10 },
    { q: "Completa: 'Oye como va...'", a: ["Mi ritmo"], points: 10 },
  ],
  
  culturaGeneral: [
    { q: "¿Cuál es la capital de Bolivia?", a: ["La Paz", "Sucre"], points: 5 },
    { q: "¿Cuántos países hay en América del Sur?", a: ["12", "Doce"], points: 10 },
    { q: "¿En qué año llegó el hombre a la Luna?", a: ["1969"], points: 15 },
    { q: "¿Cuántos continentes hay?", a: ["7", "Siete"], points: 5 },
    { q: "¿Qué país tiene forma de bota?", a: ["Italia"], points: 10 },
    { q: "¿Cuál es el océano más grande?", a: ["Pacífico", "Océano Pacífico"], points: 10 },
    { q: "¿Cuántos colores tiene el arcoíris?", a: ["7", "Siete"], points: 5 },
  ]
};

export const acertijos = [
  { q: "Blanco por dentro, verde por fuera. Si quieres que te lo diga, espera.", a: ["Pera", "La pera"], points: 10 },
  { q: "Oro parece, plata no es. ¿Qué es?", a: ["Plátano", "Banana"], points: 10 },
  { q: "Tengo agujas pero no coso, tengo números pero no soy calculadora. ¿Qué soy?", a: ["Reloj", "Un reloj"], points: 15 },
  { q: "Vuelo sin alas, lloro sin ojos. ¿Qué soy?", a: ["Nube", "La nube"], points: 15 },
  { q: "Todos pasan por mí, yo nunca paso por nadie. ¿Qué soy?", a: ["Calle", "La calle"], points: 10 },
  { q: "Tengo dientes pero no puedo morder. ¿Qué soy?", a: ["Peine", "Un peine"], points: 10 },
];

export const retos = [
  { text: "Imita a un animal hasta que alguien adivine cuál es", points: 15, instruction: "Los demás deben adivinar qué animal eres" },
  { text: "Canta 30 segundos de cualquier canción (la que tú elijas)", points: 10, instruction: "Canta en voz alta durante 30 segundos" },
  { text: "Di 5 cosas por las que estás agradecido hoy", points: 15, instruction: "Comparte 5 cosas positivas de tu día" },
  { text: "Baila durante 20 segundos (elige la música que quieras o sin música)", points: 15, instruction: "¡A bailar! No importa si bailas bien o mal" },
  { text: "Cuenta un chiste o algo gracioso que te pasó", points: 10, instruction: "Intenta hacer reír a los demás" },
  { text: "Haz 10 sentadillas frente a todos", points: 10, instruction: "Ejercicio físico - cuenta en voz alta" },
  { text: "Di este trabalenguas 3 veces rápido: 'El cielo está enladrillado'", points: 15, instruction: "Repite el trabalenguas 3 veces seguidas" },
  { text: "Habla como un personaje famoso durante 30 segundos", points: 10, instruction: "Elige cualquier personaje e imítalo" },
  { text: "Describe tu día de hoy en 1 minuto (sin usar las palabras 'y' o 'entonces')", points: 20, instruction: "Cuéntales a todos sobre tu día" },
  { text: "Imita la forma de hablar de alguien de la sala (con respeto y humor)", points: 15, instruction: "Sin ofender, solo con cariño y diversión" },
  { text: "Haz una pose de yoga y manténla por 30 segundos", points: 10, instruction: "Cualquier pose que conozcas o inventes" },
  { text: "Di los nombres de 10 países en 20 segundos", points: 15, instruction: "¡Rápido! Cuenta con los dedos" },
  { text: "Actúa como si estuvieras en cámara lenta por 30 segundos", points: 10, instruction: "Movimientos y voz en cámara lenta" },
  { text: "Cuenta una anécdota vergonzosa (pero divertida) de tu infancia", points: 20, instruction: "Algo gracioso que te pasó de niño" },
  { text: "Haz 5 cumplidos diferentes a los demás jugadores", points: 15, instruction: "Di algo bonito a cada jugador" },
];

export const penitencias = [
  { text: "Pierde tu próximo turno" },
  { text: "Retrocede 3 casillas" },
  { text: "Pierdes 10 puntos" },
  { text: "Intercambia puntos con el jugador con menos puntos" },
  { text: "Los demás jugadores avanzan 1 casilla" },
  { text: "Haz una sentadilla cada vez que alguien diga tu nombre (hasta tu próximo turno)" },
  { text: "Habla cantando hasta tu próximo turno" },
];

export const preguntasConversacion = [
  // Sobre el año actual y experiencias recientes
  "¿Qué fue lo mejor que te pasó este año?",
  "¿Cuál fue tu mayor desafío este año y cómo lo superaste?",
  "¿Qué fue lo más gracioso que te pasó este año?",
  "¿Qué aprendiste sobre ti mismo este año?",
  "¿Cuál fue el momento más emocionante de tu año?",
  "¿Qué cosa nueva probaste este año?",
  "¿Hubo algún momento este año en el que te sentiste muy orgulloso?",
  "¿Qué persona conociste este año que dejó huella en ti?",
  "¿Cuál fue tu logro más importante este año?",
  "Si pudieras revivir un día de este año, ¿cuál sería?",
  "¿Qué momento de este año te gustaría olvidar?",
  "¿Qué es lo más valiente que hiciste este año?",
  "¿Qué promesa te hiciste a ti mismo este año?",
  "¿Qué fue lo más sorprendente que te pasó este año?",
  "¿Hubo algún momento este año que te hizo llorar de felicidad?",
  
  // Memorias y familia
  "¿Cuál es tu recuerdo favorito de la infancia?",
  "Cuenta una historia divertida de cuando eras niño",
  "¿Qué tradición familiar te gusta más?",
  "¿Cuál es tu recuerdo más bonito con esta familia?",
  "¿Qué momento familiar te hizo reír más?",
  "¿Cuál fue tu viaje familiar favorito?",
  "¿Qué te enseñó tu familia que más valoras?",
  "¿Hay alguna anécdota familiar que siempre cuentas?",
  "¿Qué comida familiar te trae los mejores recuerdos?",
  "¿Cuál es tu tradición navideña favorita con la familia?",
  "¿Qué juego jugabas de niño con tus hermanos o primos?",
  "¿Cuál es el mejor consejo que te dio un familiar?",
  "¿Qué foto familiar es tu favorita y por qué?",
  "¿Hay alguna frase que siempre decía alguien de tu familia?",
  "¿Cuál es tu memoria más antigua con la familia?",
  
  // Sueños y aspiraciones
  "¿Cuál es tu sueño más grande?",
  "Si pudieras hacer cualquier cosa sin límites, ¿qué harías?",
  "¿Qué te gustaría lograr en los próximos 5 años?",
  "Si pudieras aprender cualquier habilidad al instante, ¿cuál sería?",
  "¿Qué lugar del mundo te gustaría conocer y por qué?",
  "Si pudieras tener cualquier trabajo, ¿cuál elegirías?",
  "¿Qué te gustaría estudiar si pudieras volver a empezar?",
  "¿Cuál es tu mayor meta personal para el próximo año?",
  "Si pudieras escribir un libro, ¿de qué sería?",
  "¿Qué te gustaría que te recordaran cuando seas mayor?",
  
  // Reflexiones personales
  "¿Qué te hace verdaderamente feliz?",
  "¿Cuál es tu mayor miedo y cómo lo enfrentas?",
  "¿Qué consejo le darías a tu yo de hace 5 años?",
  "¿Qué es lo que más te gusta de ti mismo?",
  "¿Cuál ha sido el mejor consejo que has recibido?",
  "¿Qué te gustaría que la gente supiera de ti?",
  "¿Cuál es tu mayor fortaleza?",
  "¿Qué es algo que te gustaría cambiar de ti?",
  "¿Qué te hace sentir en paz?",
  "¿Cuál es tu definición de éxito?",
  "¿Qué actividad te hace perder la noción del tiempo?",
  "¿Qué te hace sentir más vivo?",
  
  // Sobre otros
  "¿Quién es tu mayor inspiración y por qué?",
  "¿Qué persona de tu vida te ha ayudado más?",
  "Si pudieras cenar con cualquier persona (viva o muerta), ¿quién sería?",
  "¿Qué es lo que más admiras en las personas?",
  "¿Quién te enseñó la lección más importante de tu vida?",
  "¿Hay alguien a quien te gustaría agradecer públicamente?",
  "¿Qué cualidad buscas en un amigo verdadero?",
  "¿Quién fue tu mejor maestro y qué te enseñó?",
  
  // Gustos y preferencias
  "¿Cuál es tu película favorita y por qué?",
  "¿Qué música te pone de buen humor?",
  "¿Cuál es tu comida favorita y por qué?",
  "¿Qué libro o película te marcó profundamente?",
  "¿Cuál es tu pasatiempo favorito?",
  "¿Qué te hace reír sin control?",
  "¿Cuál es tu canción favorita y qué recuerdos te trae?",
  "¿Qué programa de TV nunca te cansas de ver?",
  "¿Cuál es tu estación del año favorita y por qué?",
  "¿Qué olor te trae los mejores recuerdos?",
  "¿Cuál es tu lugar favorito para relajarte?",
  
  // Preguntas profundas
  "Si pudieras cambiar algo del mundo, ¿qué sería?",
  "¿Qué superpoder elegirías tener y cómo lo usarías?",
  "Si tuvieras un millón de dólares, ¿qué harías?",
  "¿Qué es lo que más valoras en una amistad?",
  "¿Cuál crees que es el sentido de la vida?",
  "Si pudieras viajar en el tiempo, ¿irías al pasado o al futuro?",
  "¿Qué harías si supieras que no puedes fallar?",
  "¿Cuál es tu mayor arrepentimiento?",
  "¿Qué es lo más importante que has aprendido en la vida?",
  "¿Qué te gustaría que dijera tu epitafio?",
  
  // Momentos especiales
  "¿Cuál fue el mejor regalo que recibiste?",
  "¿Cuál fue el momento más vergonzoso de tu vida?",
  "¿Alguna vez hiciste algo muy valiente?",
  "¿Cuál fue la decisión más difícil que tomaste?",
  "¿Hay algo que te gustaría hacer antes de que termine el año?",
  "¿Cuál fue el mejor cumpleaños de tu vida?",
  "¿Cuál fue el peor día que se convirtió en el mejor día?",
  "¿Alguna vez tuviste un encuentro que cambió tu vida?",
  "¿Cuál es el cumplido más bonito que te han hecho?",
  "¿Cuál fue el momento más feliz de tu vida hasta ahora?",
  
  // Preguntas profundas para compartir con la familia
  "Comparte un momento de este año en el que te sentiste muy feliz",
  "¿Qué cosa nueva aprendiste este año que te gustaría compartir?",
  "Cuenta algo divertido o vergonzoso que te pasó este año",
  "¿Hubo algún momento este año en el que necesitaste ayuda? ¿Qué pasó?",
  "¿Qué fue lo más difícil que enfrentaste este año y cómo lo superaste?",
  "Comparte un logro del que estés orgulloso de este año",
  "¿Hay algo que hiciste este año por primera vez?",
  "¿Qué persona tuvo el mayor impacto en tu vida este año?",
  "Cuenta una experiencia que te cambió la perspectiva este año",
  "¿Qué es lo que más extrañas de este año?",
  "¿Hubo algún momento este año en el que ayudaste a alguien?",
  "Comparte algo que descubriste sobre ti mismo este año",
  "¿Qué canción o película te marcó este año y por qué?",
  "Cuenta un momento memorable con esta familia de este año",
  "¿Qué te gustaría mejorar o cambiar para el próximo año?",
  "Comparte algo que te hizo llorar de risa este año",
  "¿Hubo algún momento este año en el que te sentiste muy valiente?",
  "¿Qué es lo que más te gusta de cómo eres ahora comparado con el año pasado?",
  "Cuenta una historia que nunca has compartido con la familia",
  "¿Qué es algo que siempre quisiste decirle a alguien de la familia?",
  "Comparte un recuerdo de infancia que te hace sonreír",
  "¿Qué tradición familiar te gustaría empezar o continuar?",
  "¿Hay algo que te gustaría agradecerle a alguien de la familia?",
  "Comparte algo que te preocupa y que tal vez la familia pueda ayudarte",
  "¿Qué es lo que más valoras de estar con esta familia?",
  "Cuenta un momento en el que te sentiste muy apoyado por la familia",
  "¿Qué es algo que aprendiste de alguien de esta familia?",
  "Comparte tu momento favorito de una reunión familiar",
  "¿Hay algún consejo que te gustaría darle a los más jóvenes de la familia?",
  "¿Qué es algo que admiras de cada persona aquí presente?",
  "Comparte una meta o sueño que tengas para el próximo año",
  "¿Qué es algo que te gustaría hacer más seguido con la familia?",
  "Cuenta algo que te hizo sentir agradecido este año",
  "¿Hay algo que te arrepientes de no haber hecho este año?",
  "Comparte una lección importante que aprendiste este año",
  "¿Qué recuerdo familiar te hace sonreír cada vez que lo piensas?",
  "¿Cuál es tu juego familiar favorito y por qué?",
  "¿Qué es lo que más te gusta hacer en familia?",
  "¿Hay alguna historia familiar que te encante escuchar?",
  "¿Qué momento de unión familiar valoras más?",
  "¿Cuál es tu celebración familiar favorita?",
  "¿Qué costumbre familiar te gustaría que nunca cambiara?",
  "¿Qué es lo que más aprecias de tu familia?",
];

// Nuevos minijuegos
export const desafiosRapidos = [
  { text: "Di el abecedario al revés en menos de 30 segundos", points: 20, time: 30 },
  { text: "Nombra 15 animales diferentes en 20 segundos", points: 15, time: 20 },
  { text: "Cuenta del 1 al 20 pero reemplazando los múltiplos de 3 por 'PUM'", points: 15, time: 30 },
  { text: "Di 10 palabras que empiecen con la letra 'P' en 15 segundos", points: 15, time: 15 },
  { text: "Nombra una capital de país por cada letra del abecedario (mínimo 10)", points: 20, time: 40 },
];

export const juegosMemoria = [
  { 
    text: "Memoriza esta secuencia: 🍎🍌🍇🍊🍓",
    answer: ["🍎🍌🍇🍊🍓", "manzana banana uva naranja fresa"],
    points: 15
  },
  { 
    text: "Memoriza estos números: 7, 3, 9, 1, 5, 2",
    answer: ["739152"],
    points: 15
  },
  { 
    text: "Memoriza estas palabras: CASA, SOL, MAR, PAN",
    answer: ["casa sol mar pan", "CASA SOL MAR PAN"],
    points: 10
  },
];

export const adivinanzasRapidas = [
  { q: "Si tengo 10 manzanas y me quitas 3, ¿cuántas tienes tú?", a: ["3", "tres"], points: 10 },
  { q: "¿Qué tiene cuello pero no cabeza?", a: ["botella", "una botella"], points: 10 },
  { q: "¿Qué se moja mientras seca?", a: ["toalla", "una toalla"], points: 10 },
  { q: "Cuanto más quitas, más grande se hace. ¿Qué es?", a: ["hoyo", "un hoyo", "agujero"], points: 15 },
];
