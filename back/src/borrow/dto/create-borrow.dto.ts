import { BorrowStatus } from "@prisma/client";

export class CreateBorrowDto {
  personId: number;
  equipmentId: number;
  borrowDate: Date;
  expectedReturnDate: Date;
  status: BorrowStatus;
}
