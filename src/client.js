// https://github.com/SOHU-Co/kafka-node/blob/master/example/consumerGroupMember.js#L12
const kafka = require('kafka-node');

const topics = ['test' ];
const consumerOptions = {
    host: '127.0.0.1:2181',
    groupId: 'ExampleTestGroup',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'earliest' // equivalent of auto.offset.reset valid values are 'none', 'latest', 'earliest'
};

const ConsumerGroup = kafka.ConsumerGroup;

const consumerGroup = new ConsumerGroup(Object.assign({id: 'consumer1'}, consumerOptions), topics);

consumerGroup.on('error', onError);
consumerGroup.on('message', onMessage);

function onError (error) {
    console.error(error);
    console.error(error.stack);
}

function onMessage (message) {
    console.log('%s read msg Topic="%s" Partition=%s Offset=%d', this.client.clientId, message.topic, message.partition, message.offset);
    console.log(message);
}

