import { PrismaClient, User } from "@prisma/client";

export interface ApolloContext {
  user: User | null;
  prisma: PrismaClient;
}
