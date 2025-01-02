import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '192.168.65.1',
    port: 3306,
    username: 'root',
    password: 'your_password',
    database: 'your_database',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UsersModule],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}