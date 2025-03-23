import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { MarketDataModule } from './marketdata/marketdata.module';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { Holding } from './portfolio/entities/holding.entity';
import { Watchlist } from './watchlist/entities/watchlist.entity';
import { WatchlistItem } from './watchlist/entities/watchlist-item.entity';

import { PortfolioModule } from './portfolio/portfolio.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration available globally
      envFilePath: '.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Portfolio, Holding, Watchlist, WatchlistItem],
        synchronize: true, // Be careful with this in production
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    MarketDataModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
