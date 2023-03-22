import { Controller, Get, Param, Res, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuardRest } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    //@UseGuards(JwtAuthGuardRest)
    @Get("files/:id/:filename")
    download(@Res() res: any, @Param() params: any) {
        const filename = `../files/${params.id}/${params.filename}`;
        return res.download(filename);
    }
}
