import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { wait } from '@/common/helper/utils.helpers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    await wait(1000);
    return this.appService.getHello();
  }
}
