const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load proto file
const PROTO_PATH = path.join(__dirname, 'hello.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

// Create a client instance
function main() {


    console.log(new Date().toISOString())

    const client = new helloProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

    // Call the SayHello method
    client.SayHello({ name: 'World', client_info : {type:"js-client",timestamp:new Date().toISOString()} }, (error, response) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Greeting:', response.message);
        }
    });
}

main();
