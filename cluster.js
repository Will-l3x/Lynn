const cluster = require('cluster')
const cpuCount = require('os').cpus().length
const app = require('./server')

if (cluster.isMaster){
    for (let i = 0; i < cpuCount; i += 1){
        cluster.fork()
    }
    cluster.on('exit', ()=>{
        cluster.fork()
    })
}else{
    return app;
}