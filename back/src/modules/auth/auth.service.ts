import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { isValid, parse } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async loginWithTelegram(initData: string) {
    if (!isValid(initData, process.env.BOT_TOKEN as string))
      throw new UnauthorizedException('Invalid Telegram auth 0');

    const data = parse(initData);
    if (!data.user?.id)
      throw new UnauthorizedException('Invalid Telegram auth');

    const telegramId = data.user.id + '';

    let user = await this.prisma.user.findUnique({ where: { telegramId } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId,
          username: data.user.username,
        },
      });
    }

    const token = await this.jwt.signAsync({
      sub: user.id,
      telegramId: user.telegramId,
    });

    return { token };
  }
}
