import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ValidateGuard } from '../guards/validate.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @UseGuards(new ValidateGuard())
  getAllTransactions(@Req() req) {
    const owner = req.user.id;
    return this.transactionService.getAll(owner);
  }

  @Get('/:walletId')
  @UseGuards(new ValidateGuard())
  getTransactions(@Req() req) {
    const owner = req.user.id;
    return this.transactionService.get(owner, req.params.walletId);
  }

  @Post('add')
  @UseGuards(new ValidateGuard())
  addTransaction(@Req() req) {
    return this.transactionService.add({
      Type: req.body.Type,
      Cashflow: req.body.Cashflow,
      Source: req.body.Source,
      Target: req.body.Target,
      Amount: req.body.Amount,
      Owner: req.user.id,
      Description: req.body.Description,
      Timestamp: req.body.Timestamp,
    });
  }

  @Delete('/:id')
  @UseGuards(new ValidateGuard())
  deleteTransaction(@Req() req) {
    const owner = req.user.id;
    return this.transactionService.deleteOne(owner, req.params.id);
  }

  @Delete()
  @UseGuards(new ValidateGuard())
  deleteAllTransactions(@Req() req) {
    const owner = req.user.id;
    return this.transactionService.deleteAll(owner);
  }
}
