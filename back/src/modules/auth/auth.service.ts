import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../prisma/prisma.service";
import {checkTelegramInitData, parseInitData} from "./telegram.utils";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async loginWithTelegram(initData: string) {
    const isValid = checkTelegramInitData(initData, process.env.BOT_TOKEN as string);
    if (!isValid) throw new UnauthorizedException('Invalid Telegram auth');

    const data = parseInitData(initData);

    if (!data.id) throw new UnauthorizedException('Invalid Telegram auth');

    const telegramId = data.id;

    let user = await this.prisma.user.findUnique({ where: { telegramId } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId,
          username: data.username,
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
