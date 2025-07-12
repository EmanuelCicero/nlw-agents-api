import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestionsRoute } from './http/routes/create-questions.ts';
import { createRoomsRoute } from './http/routes/create-room.ts';
import { getRoomsRoute } from './http/routes/get_rooms.ts';
import { getRoomsQuestions } from './http/routes/get-room-questions.ts';
import { uploadAudioRoute } from './http/routes/upload-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
});

app.register(fastifyMultipart)

app.get('/teste', () => {
  return 'ok';
});

app.register(getRoomsRoute);
app.register(createRoomsRoute);
app.register(getRoomsQuestions);
app.register(createQuestionsRoute);
app.register(uploadAudioRoute);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.listen({ port: env.PORT });
