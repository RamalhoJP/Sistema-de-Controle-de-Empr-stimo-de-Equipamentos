import { Status } from "@prisma/client";

export class CreateEquipmentDto {
  name: string;
  description?: string;
  status: Status;
  acquisitionDate: Date;
}
