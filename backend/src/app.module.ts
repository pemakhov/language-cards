import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
// import { MailerModule } from './mailer/mailer.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/build/'),
    }),
    // MailerModule.forRoot({
    //   transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //   defaults: {
    //     from: '"nest-modules" <modules@nestjs.com>',
    //   },
    //   template: {
    //     dir: __dirname + '/templates',
    //     adapter: new PugAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
