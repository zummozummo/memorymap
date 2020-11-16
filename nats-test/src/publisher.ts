import nats from "node-nats-streaming";

const stan = nats.connect("conscious", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");
  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20,
  });

  //name of the channel, data you want to share and optional callback
  //data is refered to as message in nats world
  stan.publish("block:created", data, () => {
    console.log("event published");
  });
});

//we dont get to use async awiat approch so we have to use event driven
//approch, so after client succesfully connecting to nats server it will
//emmit a connect event
