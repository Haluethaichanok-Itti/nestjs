// import { Module } from '@nestjs/common';
// import { UsersModule } from './users/users.module';
// import { DataSource } from 'typeorm';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type: 'mysql',
//     host: '192.168.65.1',
//     port: 3306,
//     username: 'root',
//     password: 'your_password',
//     database: 'your_database',
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     synchronize: true,
//   }), UsersModule],
// })
// export class AppModule {
//   constructor(private dataSource: DataSource) {}
// }
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}