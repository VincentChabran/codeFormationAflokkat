import { Inject } from "@nestjs/common";
import { Resolver, Subscription } from "@nestjs/graphql";
import { PubSubEngine } from "graphql-subscriptions";
import { IdsForReFetching, NewNotification } from "src/notifications/entities/notification.entity";

@Resolver()
export class PubSubResolver {
    constructor(@Inject("PUB_SUB") private pubSub: PubSubEngine) {}

    @Subscription(() => IdsForReFetching)
    refetching() {
        return this.pubSub.asyncIterator("refetching");
    }

    @Subscription(() => NewNotification)
    sendNotification() {
        return this.pubSub.asyncIterator("sendNotification");
    }

    @Subscription(() => NewNotification)
    newRapportNotification() {
        return this.pubSub.asyncIterator("newRapportNotification");
    }

    @Subscription(() => NewNotification)
    newMessageNotification() {
        return this.pubSub.asyncIterator("newMessageNotification");
    }

    @Subscription(() => NewNotification)
    updatedReclamation() {
        return this.pubSub.asyncIterator("updatedReclamation");
    }
}
