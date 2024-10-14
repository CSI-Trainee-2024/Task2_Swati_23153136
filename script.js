let sec = 0;
let min = 0;
let hr = 0;
let timer = false;
let exercises = []; // Array to store exercises
let currentExerciseIndex = 0; // Index to track the current exercise
let countdownTimers = []; // Array to hold countdown intervals
let remainingTimes = []; // Array to hold remaining times for exercises
let isPaused = []; // Array to track pause status for each exercise

function show() {
    document.getElementById("btn1").style.display = "none";
    document.getElementById("stopwatch").style.display = "block";

    if (!timer) {
        timer = true;  // Ensure we don't start the timer multiple times
        startStopwatch(); // Start the main stopwatch
    }
}

function startStopwatch() {
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
            min = 0;
            hr++;
        }
    }

    let updatedTime =
        (hr < 10 ? '0' + hr : hr) + ':' +
        (min < 10 ? '0' + min : min) + ':' +
        (sec < 10 ? '0' + sec : sec);

    document.getElementById("stopwatch").innerHTML = updatedTime;

    setTimeout(startStopwatch, 1000);
}

function addexercise() {
    const exerciseName = document.getElementById("Textbox").value;
    const exerciseTime = document.getElementById("Timebox").value;

    if (exerciseName && validateTime(exerciseTime)) {
        exercises.push({ name: exerciseName, time: exerciseTime }); // Add exercise to array
        document.getElementById("Textbox").value = ''; // Clear input
        document.getElementById("Timebox").value = ''; // Clear input
        isPaused.push(false); // Initialize paused status for the new exercise
        remainingTimes.push(0); // Initialize remaining time for the new exercise
        displayExercises(); // Show the exercises on the screen
    } else {
        alert("Please enter a valid exercise name and time in HH:MM:SS format.");
    }
}

function displayExercises() {
    const output = document.getElementById("output");
    output.innerHTML = ''; // Clear previous output

    exercises.forEach((exercise, index) => {
        output.innerHTML += `
            <div id="exercise-${index}">
                Exercise: ${exercise.name}, Time: ${exercise.time}
                <span id="countdown-${index}">${formatTime(remainingTimes[index])}</span>
                <button onclick="pauseExercise(${index})">${isPaused[index] ? 'Resume' : 'Pause'}</button>
            </div>
        `;
    });
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `Countdown: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startWorkout() {
    currentExerciseIndex = 0; // Reset to the first exercise
    show(); // Show the stopwatch and start it
    startExercise(currentExerciseIndex); // Start with the first exercise
}

function startExercise(index) {
    if (index < exercises.length) {
        const timeParts = exercises[index].time.split(':').map(Number);
        let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]; // Convert time to seconds

        if (remainingTimes[index] === 0) {
            remainingTimes[index] = totalSeconds; // Store the initial time if not paused
        }

        const countdownElement = document.getElementById(`countdown-${index}`);
        countdownElement.innerHTML = formatTime(remainingTimes[index]); // Display the countdown

        // Start the countdown timer
        countdownTimers[index] = setInterval(() => {
            if (remainingTimes[index] <= 0) {
                clearInterval(countdownTimers[index]);
                alert(`${exercises[index].name} time is up!`);
                currentExerciseIndex++;
                // Automatically start the next exercise countdown immediately
                startExercise(currentExerciseIndex);
            } else if (!isPaused[index]) {
                remainingTimes[index]--; // Decrement total seconds
                countdownElement.innerHTML = formatTime(remainingTimes[index]);
            }
        }, 1000); // Update every second
    }
}

function pauseExercise(index) {
    if (isPaused[index]) {
        // Resume the exercise
        isPaused[index] = false;
        alert(`Resumed: ${exercises[index].name}.`);
        startExercise(index); // Start countdown from remaining time
    } else {
        // Pause the exercise
        clearInterval(countdownTimers[index]); // Stop the current timer
        isPaused[index] = true; // Mark as paused
        alert(`Paused: ${exercises[index].name}. You can resume later.`);
    }
    
    // Refresh the display to show the correct button state
    displayExercises();
}

function validateTime(time) {
    const regex = /^\d{2}:\d{2}:\d{2}$/; // HH:MM:SS format
    return regex.test(time);
}
