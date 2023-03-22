import { Module } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { PubSubResolver } from "./pub-sub.resolver";

@Module({
    providers: [
        PubSubResolver,
        {
            provide: "PUB_SUB",
            useClass: PubSub,
        },
    ],
    exports: ["PUB_SUB"],
})
export class PubSubModule {}
