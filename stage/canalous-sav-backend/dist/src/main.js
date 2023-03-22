"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_upload_1 = require("graphql-upload");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ["log"],
    });
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    });
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, graphql_upload_1.graphqlUploadExpress)({ maxFileSize: 1000000 }));
    await app.listen(3000).then(() => console.log("Listening on port 3000"));
}
bootstrap();
//# sourceMappingURL=main.js.map