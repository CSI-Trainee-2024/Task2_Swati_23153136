let sec = 0;
let min = 0;
let hr = 0;
let timer = false;

function show() {
    // Hide the button and show the stopwatch
    document.getElementById("btn1").style.display = "none";
    document.getElementById("stopwatch").style.display = "block";

    // Start the stopwatch if it's not already running
    if (timer === false) {
        timer = true;  // Ensure we don't start the timer multiple times
        start();
    }
}

function start() {
    // Increment seconds
    sec++;
    if (sec == 60) {
        sec = 0;
        min++;
        if (min == 60) {
            min = 0;
            hr++;
        }
    }

    // Format the time into a string (always two digits for each unit)
    let updatedTime =
        (hr < 10 ? '0' + hr : hr) + ':' + 
        (min < 10 ? '0' + min : min) + ':' + 
        (sec < 10 ? '0' + sec : sec);

    // Update the stopwatch display
    document.getElementById("stopwatch").innerHTML = updatedTime;

    // Call the start function again after 1 second
    setTimeout(start, 1000);
}







