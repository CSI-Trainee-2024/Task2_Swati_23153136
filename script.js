let sec = 0;
let min = 0;
let hr = 0;
let timer = false;
let exercises = []; // Array to store exercises
let currentExerciseIndex = 0; // Initialize index to track current exercise
let countdownTimer;

function show() {
    // Hide the button and show the stopwatch
    document.getElementById("btn1").style.display = "none";
    document.getElementById("stopwatch").style.display = "block";

    // Start the stopwatch if it's not already running
    if (!timer) {
        timer = true;  // Ensure we don't start the timer multiple times
        start();
    }
}

function start() {
    // Increment seconds
    sec++;
    if (sec === 60) {
        sec = 0;
        min++;
        if (min === 60) {
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

function addexercise() {
    const exerciseName = document.getElementById("Textbox").value;
    const exerciseTime = document.getElementById("Timebox").value;

    if (exerciseName && validateTime(exerciseTime)) {
        exercises.push({ name: exerciseName, time: exerciseTime }); // Add exercise to array
        document.getElementById("Textbox").value = ''; // Clear input
        document.getElementById("Timebox").value = ''; // Clear input
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
                <button onclick="pauseExercise(${index})">Pause</button>
                <span id="countdown-${index}"></span>
            </div>
        `;
    });
}

function startWorkout() {
    currentExerciseIndex = 0; // Reset to the first exercise
    show(); // Show the stopwatch and start it
    startCountdown(currentExerciseIndex); // Start with the first exercise
}

function startCountdown(index) {
    if (index < exercises.length) {
        const timeParts = exercises[index].time.split(':').map(Number);
        let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2]; // Convert time to seconds

        const countdownElement = document.getElementById(`countdown-${index}`);
        countdownElement.innerHTML = ''; // Clear previous countdown

        countdownTimer = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownTimer);
                alert(`${exercises[index].name} time is up!`);
                currentExerciseIndex++;
                if (currentExerciseIndex < exercises.length) {
                    setTimeout(() => startCountdown(currentExerciseIndex), 5000); // 5-second pause
                }
            } else {
                totalSeconds--; // Decrement total seconds
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;

                countdownElement.innerHTML = `Countdown: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
        }, 1000); // Update every second
    }
}

function pauseExercise(index) {
    clearInterval(countdownTimer); // Stop the current timer
    alert(`Paused: ${exercises[index].name}. You can resume later.`);
}

function validateTime(time) {
    const regex = /^\d{2}:\d{2}:\d{2}$/; // HH:MM:SS format
    return regex.test(time);
}
