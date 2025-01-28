import { Module } from "@nestjs/common";
import { BorrowService } from "./borrow.service";
import { BorrowController } from "./borrow.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
