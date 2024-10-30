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

// Implement the SayHello RPC method
function sayHello(call, callback) {
    callback(null, { message: `Hello, ${call.request.name} from ${call.request.client_info.type} at ${call.request.client_info.timestamp}` });
}

// Start the gRPC server
function main() {
    const server = new grpc.Server();
    server.addService(helloProto.Greeter.service, {
        SayHello: sayHello
    });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
        console.log('Server running on port 50051');
    });
}

main();
