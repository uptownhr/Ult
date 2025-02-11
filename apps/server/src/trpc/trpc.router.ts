import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { UserRouter } from '@server/user/user.router';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = async (
  opts: trpcExpress.CreateExpressContextOptions,
) => {
  return {
    ...opts,
  };
};

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userRouter: UserRouter,
  ) {}

  appRouter = this.trpcService.trpc.router({
    ...this.userRouter.apply(),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
