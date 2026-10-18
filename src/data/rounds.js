// Preguntas PÚBLICAS de la Arena (sin respuestas).
// Las respuestas y explicaciones viven cifradas en answers.enc.json y solo
// el profesor las descifra con su contraseña.
// En las preguntas de tipo "order" las opciones ya están desordenadas.
export const ROUNDS = [
  { id: 'r1', n: 1, slide: 'g1a', phase: 'Calentamiento', topic: 'Capstone checkpoint', qs: [
    { id: 'q1a', type: 'poll', t: 20, q: 'Siendo honestos: ¿en qué punto está tu equipo de PixPro hoy?', o: ['Aún definiendo requerimientos', 'Diseño (C4, eventos) listo', 'PoCs en desarrollo', 'SPA + API funcionando en local'] },
    { id: 'q1b', type: 'poll', t: 20, q: '¿Cuál es el mayor riesgo de tu equipo esta semana?', o: ['Tiempo', 'Tecnología nueva (IA, broker)', 'Coordinación del equipo', 'Requerimientos poco claros'] },
  ] },
  { id: 'r2', n: 2, slide: 'g1b', phase: 'Reflexión capstone', topic: 'Capstone checkpoint', qs: [
    { id: 'q2a', type: 'quiz', t: 20, q: 'El upload falla en producción con lotes grandes. Con Gitflow, ¿dónde se corrige?', o: ['feature/* desde develop', 'hotfix/* desde main', 'Commit directo en main', 'Esperar al próximo sprint'] },
    { id: 'q2b', type: 'quiz', t: 15, q: '¿Qué cobertura mínima exige PixPro para aprobar un merge?', o: ['50%', 'Más de 65%', '80%', '100%'] },
    { id: 'q2c', type: 'order', t: 35, q: 'Ordena el flujo de PixPro, de la petición a la notificación', o: ['El Digester procesa la imagen', 'La SPA envía el lote', 'El Notifier avisa por WebSocket', 'La API responde 202 Accepted', 'La API publica BatchQueued'] },
  ] },
  { id: 'r3', n: 3, slide: 'g2a', phase: 'Calentamiento', topic: 'Introducción a EDA', qs: [
    { id: 'q3a', type: 'quiz', t: 20, q: 'Un usuario sube 200 fotos. ¿Qué diseño aguanta mejor?', o: ['La API procesa las 200 y responde al final', 'La API responde 202 y avisa cuando cada una esté lista', 'El navegador procesa todo localmente', 'Subir el timeout a 10 minutos'] },
    { id: 'q3b', type: 'tf', t: 12, q: 'Un evento es un hecho inmutable y se nombra en pasado.', o: ['Verdadero', 'Falso'] },
  ] },
  { id: 'r4', n: 4, slide: 'g2b', phase: 'Reflexión capstone', topic: 'Introducción a EDA', qs: [
    { id: 'q4a', type: 'quiz', t: 20, q: 'En el diseño de PixPro, ¿quién CONSUME el evento ImageUploaded?', o: ['La SPA', 'El Digester', 'El CDN', 'El IAM'] },
    { id: 'q4b', type: 'quiz', t: 15, q: '¿Cuál NO es uno de los cuatro componentes de EDA del curso?', o: ['Productor', 'Canal / Event Bus', 'Consumidor', 'Balanceador DNS'] },
  ] },
  { id: 'r5', n: 5, slide: 'g3a', phase: 'Calentamiento', topic: 'Corredores de mensajes', qs: [
    { id: 'q5a', type: 'quiz', t: 15, q: '¿Cuál de estos NO es un message broker?', o: ['RabbitMQ', 'Apache Kafka', 'Amazon SQS', 'Nginx'] },
    { id: 'q5b', type: 'tf', t: 12, q: 'En una cola de mensajes, cada mensaje lo procesa un solo consumidor.', o: ['Verdadero', 'Falso'] },
  ] },
  { id: 'r6', n: 6, slide: 'g3b', phase: 'Reflexión capstone', topic: 'Corredores de mensajes', qs: [
    { id: 'q6a', type: 'quiz', t: 25, q: 'Llega la routing key image.processed.thumbnail. ¿Qué binding del topic exchange la recibe?', o: ['image.*', 'image.#', '*.uploaded', 'batch.#'] },
    { id: 'q6b', type: 'quiz', t: 15, q: '¿Con qué protocolo avisa el Notifier a la SPA?', o: ['AMQP', 'MQTT', 'WebSockets', 'gRPC'] },
    { id: 'q6c', type: 'quiz', t: 20, q: 'Una imagen corrupta falla siempre en el Digester. ¿Dónde debe terminar?', o: ['En reintentos infinitos', 'En una Dead Letter Queue', 'Se purga la cola', 'Se reinicia el broker'] },
  ] },
  { id: 'r7', n: 7, slide: 'g4a', phase: 'Calentamiento', topic: 'Tipos y patrones de eventos', qs: [
    { id: 'q7a', type: 'quiz', t: 20, q: '“Cambio en la cantidad de stock: −2 unidades.” ¿Qué tipo de evento es?', o: ['De notificación', 'Con transferencia de estado', 'Delta', 'Un comando'] },
    { id: 'q7b', type: 'quiz', t: 15, q: '“Usuario autenticado”, sin más datos, es un evento…', o: ['De notificación', 'Delta', 'Con transferencia de estado', 'Compensatorio'] },
  ] },
  { id: 'r8', n: 8, slide: 'g4b', phase: 'Reflexión capstone', topic: 'Tipos y patrones de eventos', qs: [
    { id: 'q8a', type: 'quiz', t: 20, q: '¿Qué nombre de evento sigue mejor las buenas prácticas?', o: ['ProcessImage', 'imageEvent', 'pixpro.image.processed.v1', 'DoThumbnail'] },
    { id: 'q8b', type: 'quiz', t: 20, q: 'El Notifier necesita la URL del CDN sin llamar a la API. Conviene un evento…', o: ['Ligero (solo id)', 'Rico (transferencia de estado)', 'Delta', 'Comando'] },
    { id: 'q8c', type: 'quiz', t: 20, q: 'Los eventos del IAM externo se traducen a UserRegistered antes de usarlos. Ese patrón es…', o: ['Anti-corrupción (ACL)', 'Conformista', 'Enriquecimiento', 'Delta'] },
  ] },
  { id: 'r9', n: 9, slide: 'g5a', phase: 'Calentamiento', topic: 'Consistencia eventual', qs: [
    { id: 'q9a', type: 'quiz', t: 20, q: 'Subes una foto: la galería no la muestra 2 segundos y luego aparece. Esto es…', o: ['Un bug de la API', 'Consistencia eventual', 'Pérdida de datos', 'Un deadlock'] },
    { id: 'q9b', type: 'tf', t: 12, q: 'Según CAP, un sistema distribuido puede garantizar C, A y P al mismo tiempo.', o: ['Verdadero', 'Falso'] },
  ] },
  { id: 'r10', n: 10, slide: 'g5b', phase: 'Reflexión capstone', topic: 'Consistencia eventual', qs: [
    { id: 'q10a', type: 'quiz', t: 25, q: 'El broker entrega “al menos una vez” y el Digester recibe dos veces la misma imagen. ¿Qué evita procesar y cobrar doble?', o: ['Más memoria al Digester', 'Idempotencia con imageId como llave', 'Purgar la cola cada hora', '2PC entre servicios'] },
    { id: 'q10b', type: 'quiz', t: 20, q: 'Se reservaron créditos y luego falla la IA. En una Saga, ¿qué pasa?', o: ['Se bloquean todos los servicios', 'Se emite un evento compensatorio que libera los créditos', 'Se pierde el lote', 'Se reintenta para siempre'] },
    { id: 'q10c', type: 'poll', t: 20, q: 'Dos pestañas renombran el mismo proyecto a la vez. ¿Qué estrategia usarían?', o: ['Última escritura gana', 'Fusión de datos', 'Resolución manual', 'Operación compensatoria'] },
  ] },
  { id: 'r11', n: 11, slide: 'g6a', phase: 'Calentamiento', topic: 'Integración con sistemas existentes', qs: [
    { id: 'q11a', type: 'quiz', t: 20, q: 'Un sistema existente debe publicar eventos cuando cambia su base de datos, sin tocar su código. ¿Qué usas?', o: ['Change Data Capture (CDC)', 'Reescribirlo desde cero', 'Pedir al usuario que refresque', 'Un CSV cada noche'] },
    { id: 'q11b', type: 'tf', t: 12, q: 'Strangler Fig migra el monolito completo de una sola vez.', o: ['Verdadero', 'Falso'] },
  ] },
  { id: 'r12', n: 12, slide: 'g6b', phase: 'Jefe final', topic: 'Integración con sistemas existentes', double: true, qs: [
    { id: 'q12a', type: 'quiz', t: 20, q: 'La API guarda la imagen y debe publicar ImageUploaded sin perderlo si el broker cae. ¿Qué patrón aplicas?', o: ['Proxy', 'Outbox', 'Conformista', 'Evento delta'] },
    { id: 'q12b', type: 'order', t: 30, q: 'Ordena los pasos del patrón Outbox', o: ['El relay publica en el broker', 'Se marca el registro como enviado', 'Guardar imagen y evento en una transacción', 'El relay lee la tabla outbox'] },
    { id: 'q12c', type: 'quiz', t: 15, q: '¿Qué patrón usa un intermediario que traduce solicitudes de un legado a eventos?', o: ['Proxy', 'Delta', 'Pub/Sub', 'CQRS'] },
  ] },
];

export const QUESTIONS = [];
ROUNDS.forEach((r) => r.qs.forEach((q) => QUESTIONS.push({ ...q, round: r })));
export const QMAP = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));
export const ROUND_BY_SLIDE = Object.fromEntries(ROUNDS.map((r) => [r.slide, r]));
export const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/** Puntos: acierto 500 + hasta 500 por rapidez; ×2 en el jefe final. */
export function points(q, ok, ms) {
  if (!ok) return 0;
  const f = Math.max(0, 1 - ms / (q.t * 1000));
  return Math.round((500 + 500 * f) * (q.round.double ? 2 : 1));
}
export function isCorrect(q, key, choice) {
  if (q.type === 'poll' || !key) return null;
  if (q.type === 'order') return Array.isArray(choice) && choice.length === key.a.length && choice.every((v, i) => v === key.a[i]);
  return choice === key.a;
}
