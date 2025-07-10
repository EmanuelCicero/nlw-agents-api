import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:idRoom/questions',
    {
      schema: {
        params: z.object({
          idRoom: z.string(),
        }),
        body: z.object({
          questions: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const { idRoom } = request.params;
      const { questions } = request.body;

      const result = await db
        .insert(schema.questions)
        .values({
          idRoom,
          questions,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Falied to create new room');
      }

      return reply.status(201).send({ questionId: insertedQuestion.id });
    }
  );
};
