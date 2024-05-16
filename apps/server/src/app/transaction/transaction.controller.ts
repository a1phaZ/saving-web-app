import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ValidateGuard } from '../guards/validate.guard';
import { OwnerId } from '../../decorators/owner-id.decorator';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @UseGuards(new ValidateGuard())
  getAllTransactions(@OwnerId() owner: number) {
    return this.transactionService.getAll(owner);
  }

  @Get('/:walletId')
  @UseGuards(new ValidateGuard())
  getTransactions(
    @Param('walletId') walletId: string,
    @Req() req: any,
    @OwnerId() owner: number
  ) {
    return this.transactionService.get(owner, walletId);
  }

  @Post('add')
  @UseGuards(new ValidateGuard())
  addTransaction(@Body() body: any, @Req() req, @OwnerId() owner: number) {
    return this.transactionService.add({
      Type: body.Type,
      Cashflow: body.Cashflow,
      Source: body.Source,
      Target: body.Target,
      Amount: body.Amount,
      Owner: owner,
      Description: body.Description,
      Timestamp: body.Timestamp,
    });
  }

  @Delete('/:id')
  @UseGuards(new ValidateGuard())
  deleteTransaction(
    @Param('id') id: string,
    @Req() req,
    @OwnerId() owner: number
  ) {
    return this.transactionService.deleteOne(owner, id);
  }

  @Delete()
  @UseGuards(new ValidateGuard())
  deleteAllTransactions(@OwnerId() owner: number) {
    return this.transactionService.deleteAll(owner);
  }
}
