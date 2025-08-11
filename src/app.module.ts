import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupervisorModule } from './services/supervisor/supervisor.module';
import { HRModule } from './services/hr/hr.module';
import { CommunicationsModule } from './services/communications/communications.module';
import { SecurityModule } from './services/security/security.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'timewise',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production'
    }),
    SupervisorModule,
    HRModule,
    CommunicationsModule,
    SecurityModule,
    AuthModule,
    UserModule
  ],
})
export class AppModule {}