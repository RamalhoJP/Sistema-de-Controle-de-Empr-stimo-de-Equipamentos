import { PartialType } from "@nestjs/mapped-types";
import { CreateEquipmentDto } from "./create-equipment.dto";
import { Status } from "@prisma/client";

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  name?: string;
  description?: string;
  status?: Status;
  acquisitionDate?: Date;
}
