
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { AppModule } from './src/app.module';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  imports: [AppModule],
})
export class DatabaseModule {}
