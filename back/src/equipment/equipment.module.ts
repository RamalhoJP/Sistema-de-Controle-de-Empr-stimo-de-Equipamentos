import { Module } from "@nestjs/common";
import { EquipmentService } from "./equipment.service";
import { EquipmentController } from "./equipment.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
