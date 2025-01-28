import { PartialType } from "@nestjs/mapped-types";
import { CreateBorrowDto } from "./create-borrow.dto";
import { BorrowStatus } from "@prisma/client";

export class UpdateBorrowDto extends PartialType(CreateBorrowDto) {
  personId: number;
  equipmentId: number;
  borrowDate: Date;
  expectedReturnDate: Date;
  status: BorrowStatus;
}
