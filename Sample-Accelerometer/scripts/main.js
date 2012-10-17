document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var accelerometerHelper = new AccelerometerApp();
	accelerometerHelper.run();
}

function AccelerometerApp() {

}

AccelerometerApp.prototype = {
	watchID : null,
	spanX : null,
	spanY: null,
	spanZ: null,
	spanTimeStamp: null,
    
	run: function() {
		var startButton = document.getElementById("startButton"),
		stopButton = document.getElementById("stopButton"),
		that = this;
        
		that.spanX = document.getElementById("spanDirectionX");
		that.spanY = document.getElementById("spanDirectionY");
		that.spanZ = document.getElementById("spanDirectionZ");
		that.spanTimeStamp = document.getElementById("spanTimeStamp");

		startButton.addEventListener("click", 
									 function() { 
										 that.startWatch.apply(that, arguments)
									 });
		stopButton.addEventListener("click", 
									function() { 
										that.stopWatch.apply(that, arguments)
									});
	},
    
	// Start watching the acceleration
	startWatch: function() {
		// Only start testing if watchID is currently null.
		var that = this;
		if (that.watchID === null) {
			// Update acceleration every .5 second
			var options = { frequency: 500 };
			that.watchID = navigator.accelerometer.watchAcceleration(function() { 
				that.onAccelerometerSuccess.apply(that, arguments)
			}, 
																	 function() { 
																		 that.onAccelerometerError.apply(that, arguments)
																	 }, 
																	 options);
		}
	},
     
	// Stop watching the acceleration
	stopWatch: function() {
		var that = this;
		if (that.watchID !== null) {
			var emptyText = "";
			navigator.accelerometer.clearWatch(that.watchID);
			that.watchID = null;
			that.spanX.innerText = emptyText;
			that.spanY.innerText = emptyText;
			that.spanZ.innerText = emptyText;
			that.spanTimeStamp.innerText = emptyText;
		}
	},
     
	//Get a snapshot of the current acceleration
	onAccelerometerSuccess: function(acceleration) {
		var that = this;
		that.spanX.innerText = acceleration.x;
		that.spanY.innerText = acceleration.y;
		that.spanZ.innerText = acceleration.z;              
		that.spanTimeStamp.innerText = acceleration.timestamp;
	},
    
	//Failed to get the acceleration
	onAccelerometerError: function() {
		alert("Unable to start accelerometer!");
	}
}