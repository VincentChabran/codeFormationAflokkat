import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { graphqlUploadExpress } from "graphql-upload";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { Logger } from "@nestjs/common";

async function bootstrap() {
   const app = await NestFactory.create(AppModule, {
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
   app.useGlobalPipes(new ValidationPipe());
   app.use(graphqlUploadExpress({ maxFileSize: 1000000 }));

   await app.listen(3000).then(() => console.log("Listening on port 3000"));
}
bootstrap();
