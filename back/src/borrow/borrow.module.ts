import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';

@Module({
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
