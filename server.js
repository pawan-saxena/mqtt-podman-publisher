var mqtt=require('mqtt');

var options={
    clientId:"mqtt_siemens_demo",
    clean:true};

var client = mqtt.connect(`mqtt://${process.env.MQTT_BROKER_HOST}:${process.env.MQTT_BROKER_PORT}`,{options});

var publishOptions={
    retain:true,
    qos:1
};
var message="test message";
var topic="testtopic";
//publish function
function publish(topic,msg,options){
    console.log("publishing",msg);
  if (client.connected == true){
    client.publish(topic,msg,options);
  }
}


console.log("connected flag  "+client.connected);

client.on("connect",function(){
    console.log("connected  "+client.connected);
    if (client.connected==true){
        setInterval(function(){publish(topic,message,publishOptions);},5000);
    }
});

client.on("error",function(error){
    console.log("Can't connect"+error);
    process.exit(1)
});


