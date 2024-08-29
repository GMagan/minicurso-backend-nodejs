import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
     driver: "postgres",
     database: "todo",
     host: "ep-curly-resonance-a5efma51.us-east-2.aws.neon.tech",
     username: "dafoedb2_owner",
     password: "q4OldHAmXop7",
     ssl: true,
     synchronize: true,
     autoLoadEntities: true
   })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
