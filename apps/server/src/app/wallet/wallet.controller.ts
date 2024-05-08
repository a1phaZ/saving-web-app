import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ValidateGuard } from '../guards/validate.guard';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  @UseGuards(new ValidateGuard())
  getWallets(@Req() req) {
    const owner = req.user.id;
    return this.walletService.get(owner);
  }

  @Get('total')
  @UseGuards(new ValidateGuard())
  async getTotalBalance(@Req() req) {
    const owner = req.user.id;
    const totalArray = await this.walletService.getTotalBalance(owner);
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Get('total/active')
  @UseGuards(new ValidateGuard())
  async getTotalBalanceActive(@Req() req) {
    const owner = req.user.id;
    const totalArray = await this.walletService.getTotalBalance(
      owner,
      true,
      false
    );
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Get('total/inactive')
  @UseGuards(new ValidateGuard())
  async getTotalBalanceInactive(@Req() req) {
    const owner = req.user.id;
    const totalArray = await this.walletService.getTotalBalance(
      owner,
      false,
      true
    );
    return totalArray.length ? { total: totalArray[0].total } : { total: 0 };
  }

  @Post('add')
  @UseGuards(new ValidateGuard())
  addWallet(@Req() req) {
    return this.walletService.add({
      Title: req.body.Title,
      Description: req.body.Description,
      Balance: req.body.Balance,
      Active: !!req.body.Active,
      Owner: req.user.id,
    });
  }

  @Delete('/:id')
  @UseGuards(new ValidateGuard())
  deleteWallet(@Req() req) {
    const owner = req.user.id;
    return this.walletService.deleteOne(owner, req.params.id);
  }

  @Delete()
  @UseGuards(new ValidateGuard())
  deleteAllWallets(@Req() req) {
    const owner = req.user.id;
    return this.walletService.deleteAll(owner);
  }
}
