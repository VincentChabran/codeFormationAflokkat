import { PubSubEngine } from "graphql-subscriptions";
export declare class PubSubResolver {
    private pubSub;
    constructor(pubSub: PubSubEngine);
    refetching(): AsyncIterator<unknown, any, undefined>;
    sendNotification(): AsyncIterator<unknown, any, undefined>;
    newRapportNotification(): AsyncIterator<unknown, any, undefined>;
    newMessageNotification(): AsyncIterator<unknown, any, undefined>;
    updatedReclamation(): AsyncIterator<unknown, any, undefined>;
}
