import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidateGuard } from './guards/validate.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('validate')
  @UseGuards(new ValidateGuard())
  validateInitData(@Req() req) {
    return { data: true };
  }
}
