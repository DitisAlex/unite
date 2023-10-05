import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return posts;
  }),

  create: publicProcedure
    .input(
      z.object({
        email: z.string(),
        content: z.string(),
        image: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.post.create({
        data: {
          name: input.name,
          email: input.email,
          content: input.content,
          image: input.image,
        },
      });

      return post;
    }),
});
