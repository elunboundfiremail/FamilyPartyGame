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
  { text: "Imita a un animal hasta que alguien adivine cuál es", points: 15 },
  { text: "Canta 30 segundos de tu canción favorita", points: 10 },
  { text: "Di 5 cosas por las que estás agradecido hoy", points: 15 },
  { text: "Baila sin música por 20 segundos", points: 15 },
  { text: "Cuenta un chiste (si nadie se ríe, pierdes 5 puntos)", points: 10 },
  { text: "Haz 10 sentadillas", points: 10 },
  { text: "Di trabalenguas: 'El cielo está enladrillado, quien lo desenladrillará'", points: 15 },
  { text: "Habla como un robot por 1 minuto", points: 10 },
  { text: "Describe tu día sin usar las letras 'A' y 'E'", points: 20 },
  { text: "Imita a alguien de la sala (sin ofender)", points: 15 },
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
  "¿Qué fue lo mejor que te pasó hoy?",
  "¿Cuál es tu recuerdo favorito de la infancia?",
  "Si pudieras cenar con cualquier persona (viva o muerta), ¿quién sería?",
  "¿Qué superpoder te gustaría tener y por qué?",
  "¿Cuál es tu película favorita de todos los tiempos?",
  "Si pudieras viajar a cualquier lugar del mundo, ¿dónde irías?",
  "¿Qué talento te gustaría tener?",
  "¿Cuál es tu comida favorita?",
  "¿Qué te hace reír sin control?",
  "Comparte algo que aprendiste este año",
  "¿Cuál es tu tradición familiar favorita?",
  "Si pudieras cambiar algo del mundo, ¿qué sería?",
];
