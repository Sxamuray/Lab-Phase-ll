const { Kafka } = require('kafkajs');

const enabled = process.env.KAFKA_ENABLED === 'true';
let producer = null;

const getKafka = () => {
  if (!enabled) return null;
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'herostream-api',
    brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  });
  return kafka;
};

const getProducer = async () => {
  if (!enabled) return null;
  if (!producer) {
    producer = getKafka().producer();
    await producer.connect();
    console.log('Kafka producer connected');
  }
  return producer;
};

const publishEvent = async (topic, event) => {
  if (!enabled) {
    const { handleEventLocally } = require('./kafkaConsumer');
    await handleEventLocally(event);
    return;
  }

  try {
    const p = await getProducer();
    await p.send({
      topic,
      messages: [{ value: JSON.stringify({ ...event, timestamp: new Date().toISOString() }) }],
    });
  } catch (err) {
    console.error('Kafka publish failed, processing locally:', err.message);
    const { handleEventLocally } = require('./kafkaConsumer');
    await handleEventLocally(event);
  }
};

module.exports = { publishEvent, getKafka, enabled };
