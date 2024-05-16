import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ValidateGuard } from '../guards/validate.guard';
import { WalletService } from './wallet.service';
import { OwnerId } from '../../decorators/owner-id.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
  // TODO https://docs.nestjs.com/custom-decorators#param-decorators
  @Get()
  @UseGuards(new ValidateGuard())
  getWallets(@OwnerId() owner: number) {
    return this.walletService.get(owner);
  }

  @Get('total')
  @UseGuards(new ValidateGuard())
  async getTotalBalance(@OwnerId() owner: number) {
    const totalArray = await this.walletService.getTotalBalance(owner);
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Get('total/active')
  @UseGuards(new ValidateGuard())
  async getTotalBalanceActive(@OwnerId() owner: number) {
    const totalArray = await this.walletService.getTotalBalance(
      owner,
      true,
      false
    );
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Get('total/inactive')
  @UseGuards(new ValidateGuard())
  async getTotalBalanceInactive(@OwnerId() owner: number) {
    const totalArray = await this.walletService.getTotalBalance(
      owner,
      false,
      true
    );
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Post('add')
  @UseGuards(new ValidateGuard())
  addWallet(@Req() req: any, @OwnerId() owner: number) {
    return this.walletService.add({
      Title: req.body.Title,
      Description: req.body.Description,
      Balance: req.body.Balance,
      Active: !!req.body.Active,
      Owner: owner,
    });
  }

  @Delete('/:id')
  @UseGuards(new ValidateGuard())
  deleteWallet(@Req() req: any, @OwnerId() owner: number) {
    return this.walletService.deleteOne(owner, req.params.id);
  }

  @Delete()
  @UseGuards(new ValidateGuard())
  deleteAllWallets(@OwnerId() owner: number) {
    return this.walletService.deleteAll(owner);
  }
}
