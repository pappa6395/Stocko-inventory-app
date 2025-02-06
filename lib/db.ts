import { Prisma, PrismaClient } from "@prisma/client";
 
declare global {
  var prisma: PrismaClient | undefined;
}
 
export const prismaClient = globalThis.prisma || new PrismaClient({
  transactionOptions: {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  }
});
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;