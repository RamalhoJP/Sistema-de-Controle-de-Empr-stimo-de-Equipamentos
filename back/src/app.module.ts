import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from './prisma/prisma.module';
import { PersonModule } from './person/person.module';
import { BorrowModule } from './borrow/borrow.module';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [PrismaModule, PersonModule, BorrowModule, EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
