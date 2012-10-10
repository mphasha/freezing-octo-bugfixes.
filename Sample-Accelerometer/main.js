// The watch id references the current `watchAcceleration`
var watchID = null;
var spanX;
var spanY;
var spanZ;
var spanTimeStamp;
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
    var startButton = document.getElementById("startButton"),
        stopButton = document.getElementById("stopButton");
    
    spanX = document.getElementById("spanDirectionX");
    spanY = document.getElementById("spanDirectionY");
    spanZ = document.getElementById("spanDirectionZ");
    spanTimeStamp = document.getElementById("spanTimeStamp");
     
    startButton.addEventListener("click", startWatch);
    stopButton.addEventListener("click", stopWatch);
}
 
// Start watching the acceleration
function startWatch() {
    // Only start testing if watchID is currently null.
    if (!watchID) {
        // Update acceleration every .5 second
        var options = { frequency: 500 };
        watchID = navigator.accelerometer.watchAcceleration(onAccelerometerSuccess, onAccelerometerError, options);
    }
}
 
// Stop watching the acceleration
function stopWatch() {
    if (watchID) {
        var emptyText = "";
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        spanX.innerText = emptyText;
        spanY.innerText = emptyText;
        spanZ.innerText = emptyText;
        spanTimeStamp.innerText = emptyText;
    }
}
 
//Get a snapshot of the current acceleration
function onAccelerometerSuccess(acceleration) {
    spanX.innerText = acceleration.x;
    spanY.innerText = acceleration.y;
    spanZ.innerText = acceleration.z;              
    spanTimeStamp.innerText = acceleration.timestamp;
}

//Failed to get the acceleration
function onAccelerometerError(error) {
    alert("Unable to start accelerometer!");
}