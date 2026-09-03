import { Controller, Get, Redirect } from '@nestjs/common';
import { env } from '@repo/env/client';

@Controller()
export class AppController {
  @Get()
  @Redirect(env.VITE_WEB_APP_HOST, 302)
  redirectToOtherHost() {}
}
