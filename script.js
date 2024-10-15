let sec = 0;
let min = 0;
let hr = 0;
let timer = false;
let exercises = [];
let currentExerciseIndex = 0;
let countdownTimers = [];
let remainingTimes = [];
let isPaused = [];

function show() {
    /*document.getElementById("btn1").style.display = "none";*/
    document.getElementById("stopwatch").style.display = "block";
}

function startStopwatch() {
    if (!timer) {
        timer = true;
        setInterval(() => {
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
        }, 1000);
    }
}

function addexercise() {
    const exerciseName = document.getElementById("Textbox").value;
    const exerciseTime = document.getElementById("Timebox").value;

    if (exerciseName && validateTime(exerciseTime)) {
        exercises.push({ name: exerciseName, time: exerciseTime });
        document.getElementById("Textbox").value = '';
        document.getElementById("Timebox").value = '';
        isPaused.push(false);
        remainingTimes.push(0);
        displayExercises();
    } else {
        alert("Please enter a valid exercise name and time in HH:MM:SS format.");
    }
}

function displayExercises() {
    const output = document.getElementById("output");
    output.innerHTML = '';

    exercises.forEach((exercise, index) => {
        output.innerHTML += `
            <div id="exercise-${index}">
                Exercise: ${exercise.name}, Time: ${exercise.time}
                <span id="countdown-${index}">${formatTime(remainingTimes[index])}</span>
                <button class="pause" onclick="pauseExercise(${index})">${isPaused[index] ? 'Resume' : 'Pause'}</button>
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
    if (exercises.length === 0) {
        alert("Please add at least one exercise before starting the workout.");
        return;
    }

    currentExerciseIndex = 0;
    show();
    startStopwatch();
    startExercise(currentExerciseIndex);
}

function startExercise(index) {
    if (index < exercises.length) {
        const timeParts = exercises[index].time.split(':').map(Number);
        let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

        if (remainingTimes[index] === 0) {
            remainingTimes[index] = totalSeconds;
        }

        const countdownElement = document.getElementById(`countdown-${index}`);
        countdownElement.innerHTML = formatTime(remainingTimes[index]);

        countdownTimers[index] = setInterval(() => {
            if (remainingTimes[index] <= 0) {
                clearInterval(countdownTimers[index]);
                alert(`${exercises[index].name} time is up!`);
                currentExerciseIndex++;

                if (currentExerciseIndex >= exercises.length) {
                    stopStopwatch();
                    return;
                }

                startExercise(currentExerciseIndex);
            } else if (!isPaused[index]) {
                remainingTimes[index]--;
                countdownElement.innerHTML = formatTime(remainingTimes[index]);
            }
        }, 1000);
    }
}

function stopStopwatch() {
    timer = false;
}

function pauseExercise(index) {
    if (isPaused[index]) {
        isPaused[index] = false;
        alert(`Resumed: ${exercises[index].name}.`);
        startExercise(index);
    } else {
        clearInterval(countdownTimers[index]);
        isPaused[index] = true;
        alert(`Paused: ${exercises[index].name}. You can resume later.`);
    }

    displayExercises();
}

function validateTime(time) {
    const regex = /^\d{2}:\d{2}:\d{2}$/;
    return regex.test(time);
}

function endSession() {
    localStorage.setItem('exerciseSummary', JSON.stringify(exercises));
    window.location.href = 'sum.html';
}
