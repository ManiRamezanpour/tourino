import { Controller } from '@nestjs/common';
import { AppService } from '../providers/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
