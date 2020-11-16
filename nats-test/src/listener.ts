import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
//message is an inteface of msg
console.clear();

//2nd argument is client id
const stan = nats.connect("conscious", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable()
  .setDurableName("accounting-service");

stan.on("connect", () => {
  console.log("Listener connected to NATS");
  stan.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });

  new BlockCreatedListener(stan).listen();
});
//before terminating close clinet connection
process.on("SIGINT", () => stan.close()); //interupt signal //does not work with windows
process.on("SIGTERM", () => stan.close()); //terminate signal Handle ^C

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}
class BlockCreatedListener extends Listener {
  subject = "block:created";
  queueGroupName = "comment-service";

  onMessage(data: any, msg: Message) {
    console.log("Event data!", data);

    msg.ack();
  }
}
