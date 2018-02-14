const kafka = require('kafka-node');
const HighLevelProducer = kafka.HighLevelProducer;
const KeyedMessage = kafka.KeyedMessage;
const Client = kafka.Client;


const client = new Client('localhost:2181', 'my-client-id', {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

// For this demo we just log client errors to the console.
client.on('error', function(error) {
    console.error(error);
});
client.on('ready', () => {
    console.log("Client connected....");
});

const producer = new HighLevelProducer(client);
// For this demo we just log producer errors to the console.
producer.on('error', function(error) {
    console.error(error);
});


producer.on('ready', function() {

    // Create a new payload
    const payload = [{
        topic: 'node-test',
        messages: 'Hi !!!',
        attributes: 1 /* Use GZip compression for the payload */
    }];

    //Send payload to Kafka and log result/error
    producer.send(payload,  (error, result) => {
        console.info('Sent payload to Kafka: ', payload);
        if (error) {
            console.error(error);
        } else {
            const formattedResult = result[0];
            console.log('result: ', result)
        }
    });
});