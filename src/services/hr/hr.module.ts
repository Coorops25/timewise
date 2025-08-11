import { Module } from '@nestjs/common';
import { HRService } from './hr.service';

@Module({
  providers: [HRService],
  exports: [HRService],
})
export class HRModule {}