import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { OwnerId } from '../../decorators/owner-id.decorator';
import { ValidateGuard } from '../guards/validate.guard';

@Controller('bill')
export class BillController {
  constructor(private billService: BillService) {}

  @Get()
  @UseGuards(new ValidateGuard())
  getBills(@OwnerId() owner: number) {
    return this.billService.get(owner);
  }

  @Get('history')
  @UseGuards(new ValidateGuard())
  getBillHistory(@Param('id') id: string, @OwnerId() owner: number) {
    return this.billService.getHistory(owner);
  }

  @Get('history/:id')
  @UseGuards(new ValidateGuard())
  getBillHistoryByBillId(@Param('id') id: string, @OwnerId() owner: number) {
    return this.billService.getHistoryByBillId(id, owner);
  }

  @Post('add')
  @UseGuards(new ValidateGuard())
  addBill(@Body() body: any, @OwnerId() owner: number) {
    console.log(body);
    return this.billService.add({
      Title: body.Title,
      Description: body.Description,
      Owner: owner,
      Sum: body.Sum,
      Period: body.Period,
      StopDate: body.StopDate,
      PayDay: body.PayDay,
    });
  }

  @Post('pay')
  @UseGuards(new ValidateGuard())
  payBill(@Body() body: any, @OwnerId() owner: number) {
    return this.billService.payBill(body.Id, owner);
  }

  @Delete('/:id')
  @UseGuards(new ValidateGuard())
  deleteBill(@Param('id') id: string, @OwnerId() owner: number) {
    return this.billService.deleteBill(id, owner);
  }
}
