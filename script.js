const button = document.getElementById("thinkButton");
const taskInput = document.getElementById("taskInput");
const priorityList = document.getElementById("priorityList");
const voiceButton = document.getElementById("voiceButton");
const languageSelect = document.getElementById("languageSelect");
const voiceStatus = document .getElementById("voiceStatus");
const calendarInput =
  document.getElementById("calendarInput");
const reminderInput =
    document.getElementById("reminderInput");
let taskNumber = 0;
let waitingForDeadline = false;
let pendingTask ="";
// ==============================
// LANGUAGE SWITCHING
// ==============================

languageSelect.addEventListener("change", function () {

    const isTamil = languageSelect.value === "ta-IN";

    // ==============================
// PRIORITY GUIDE - LANGUAGE
// ==============================

const guideTitle = document.querySelector(".guide-title");
const guideItems = document.querySelectorAll(".guide-item");

if (guideTitle) {
    guideTitle.textContent =
        isTamil
            ? "💡 முன்னுரிமை வழிகாட்டி"
            : "💡 Priority Guide";
}

if (guideItems.length >= 4) {

    guideItems[0].textContent =
        isTamil ? "🔴 அதிக முன்னுரிமை" : "🔴 High";

    guideItems[1].textContent =
        isTamil ? "🟠 முக்கியமானது" : "🟠 Important";

    guideItems[2].textContent =
        isTamil ? "🟡 நடுத்தர முன்னுரிமை" : "🟡 Medium";

    guideItems[3].textContent =
        isTamil ? "🟢 குறைந்த முன்னுரிமை" : "🟢 Low";
}

    document.querySelector(".task-box > p:first-child").textContent =
        isTamil ? "என்ன செய்ய வேண்டும்?" : "What do you need to do?";

    taskInput.placeholder =
        isTamil ? "எதையும் சொல்லுங்கள்..." : "Tell me anything...";

    voiceButton.textContent =
        isTamil ? "🎤 பேசுங்கள்" : "🎤 Speak";

    button.textContent =
        isTamil ? "எனக்காக யோசிக்கவும் ✨" : "Think For Me ✨";

    document.getElementById("calendarButton").textContent =
        isTamil ? "📅 நாட்காட்டி" : "📅 Calendar";

    document.querySelector(".reminder-section label").textContent =
        isTamil ? "⏰ நினைவூட்டல்" : "⏰ Reminder";

    document.querySelector("h2").textContent =
        isTamil ? "உங்கள் முன்னுரிமைகள்" : "Your Priorities";


    // PRIORITY GUIDE
    const priorityGuideTitle =
        document.getElementById("priorityGuideTitle");

    if (priorityGuideTitle) {
        priorityGuideTitle.textContent =
            isTamil
                ? "💡 முன்னுரிமை வழிகாட்டி"
                : "💡 Priority Guide";
    }


    // "I MISSED THIS" BUTTONS
    document.querySelectorAll(".missed-button").forEach(function(button) {

        button.textContent =
            isTamil
                ? "நான் இதை தவறவிட்டேன்"
                : "I missed this";

    });


    voiceStatus.textContent =
        isTamil ? "தமிழ் தேர்ந்தெடுக்கப்பட்டது" : "English selected";
});

// ==============================
// THINK FOR ME
// ==============================

button.addEventListener("click", function ()
 {

    let task = taskInput.value.trim();

     if (task === "") {
        return;
        
    }

    const taskInfo = understandTask(task);
    // Use selected calendar date as deadline
if (calendarInput.value) {

    const selectedDate = new Date(
        calendarInput.value + "T00:00:00"
    );

    const formattedDate =
        selectedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    taskInfo.details = formattedDate;
}

if (waitingForDeadline) {

    task = pendingTask + " " + task;

    waitingForDeadline = false;
    pendingTask = "";

    const updatedTaskInfo = understandTask(task);

    taskInfo.title = updatedTaskInfo.title;
    taskInfo.details = updatedTaskInfo.details;

    voiceStatus.textContent = "";
// ==============================
// PRIORITY GUIDE LANGUAGE
// ==============================

const priorityGuideTitle =
    document.getElementById("priorityGuideTitle");

if (priorityGuideTitle) {
    priorityGuideTitle.textContent =
        isTamil
            ? "💡 முன்னுரிமை வழிகாட்டி"
            : "💡 Priority Guide";
}

const highText = document.getElementById("priorityHighText");
const importantText = document.getElementById("priorityImportantText");
const mediumText = document.getElementById("priorityMediumText");
const lowText = document.getElementById("priorityLowText");

if (highText) {
    highText.textContent =
        isTamil ? "அதிக முன்னுரிமை" : "High";
}

if (importantText) {
    importantText.textContent =
        isTamil ? "முக்கியமானது" : "Important";
}

if (mediumText) {
    mediumText.textContent =
        isTamil ? "நடுத்தர முன்னுரிமை" : "Medium";
}

if (lowText) {
    lowText.textContent =
        isTamil ? "குறைந்த முன்னுரிமை" : "Low";
}
}

else if (taskInfo.details === "New task") {

    waitingForDeadline = true;
    pendingTask = task;

    if (languageSelect.value === "ta-IN") {
        voiceStatus.textContent =
            "📅 இதை எப்போது முடிக்க வேண்டும்?";
    } else {
        voiceStatus.textContent =
            "📅 When do you need to complete it?";
    }

    taskInput.value = "";
    taskInput.focus();

    return;
}

    taskNumber++;

    const priority = getTemporaryPriority(taskInfo);

    // Create task card
    const card = document.createElement("div");
    card.className = "task-card";
    card.dataset.priority = priority.name;

    // Priority circle
    const circle = document.createElement("span");
    circle.className =
        "priority-circle " + priority.className;

    // Task number
    const number = document.createElement("span");
    number.className = "task-number";
    number.textContent =
        String(taskNumber).padStart(2, "0");

    // Task content
    const content = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = taskInfo.title;

    const details = document.createElement("p");

let taskDetails = taskInfo.details;

if (reminderInput.value) {
    taskDetails += " · ⏰ " + reminderInput.value;
}

details.textContent = taskDetails;

    content.appendChild(title);
    content.appendChild(details);

    card.appendChild(circle);
    card.appendChild(number);
    card.appendChild(content);

    // Missed task button
    const missedButton = document.createElement("button");

   missedButton.textContent =
    languageSelect.value === "ta-IN"
        ? "நான் இதை தவறவிட்டேன்"
        : "I missed this";

    missedButton.addEventListener("click", function () {
        missedButton.style.display = "none";
        markTaskAsMissed(card);
    });

card.appendChild(missedButton);

// ==============================
// DELETE TASK
// ==============================

const deleteButton = document.createElement("button");

deleteButton.textContent = "🗑️ Delete";

deleteButton.addEventListener("click", function () {

    card.remove();

});

card.appendChild(deleteButton);

priorityList.appendChild(card);

    sortTasksByPriority();

    taskInput.value = "";
    voiceStatus.textContent = "";
});


// ==============================
// UNDERSTAND TASK
// ==============================

function understandTask(task) {

    let deadline = "";
    let duration = "";

    const lowerTask = task.toLowerCase();


    // Deadline

    if (
        lowerTask.includes("today") ||
        task.includes("இன்று")
    ) {
        deadline = "Today";
    }

    else if (
        lowerTask.includes("tomorrow") ||
        task.includes("நாளை") ||
        task.includes("நாளைக்கு")
    ) {
        deadline = "Tomorrow";
    }

    else if (
        lowerTask.includes("day after tomorrow") ||
        task.includes("நாளை மறுநாள்")
    ) {
        deadline = "Day after tomorrow";
    }
else if (
    lowerTask.includes("next week") ||
    task.includes("அடுத்த வாரம்")
) {
    deadline = "Next week";
}

else if (
    lowerTask.includes("next month") ||
    task.includes("அடுத்த மாதம்")
) {
    deadline = "Next month";
}

    // Duration

    const minuteMatch =
    lowerTask.match(/(\d+)\s*(minutes?|mins?)/);

if (minuteMatch) {
    duration = minuteMatch[1] + " minutes";
}

const hourMatch =
    lowerTask.match(/(\d+(?:\.\d+)?)\s*(hours?|hrs?)/);

if (hourMatch) {
    duration = hourMatch[1] + " hour(s)";
}

if (
    lowerTask.includes("half an hour") ||
    lowerTask.includes("half hour")
) {
    duration = "30 minutes";

}

    // Tamil duration

    const tamilMinuteMatch =
        task.match(/(\d+)\s*(நிமிடம்|நிமிடங்கள்)/);

    if (tamilMinuteMatch) {
        duration = tamilMinuteMatch[1] + " minutes";
    }


    const tamilHourMatch =
    
        task.match(/(\d+)\s*(மணி|மணிநேரம்)/);

    if (tamilHourMatch) {
        duration = tamilHourMatch[1] + " hour(s)";
    }


    let details = "New task";


    if (deadline && duration) {
        details = deadline + " · " + duration;
    }

    else if (deadline) {
        details = deadline;
    }

    else if (duration) {
        details = duration;
    }


    return {
        title: task,
        details: details
    };
}

// ==============================
// TEMPORARY PRIORITY
// ==============================
//
// This is ONLY for testing the UI.
// Your friend's real priority algorithm
// will replace this later.
//

function getTemporaryPriority(taskInfo) {

    const details = taskInfo.details.toLowerCase();

    let deadlineDays = 7;
    let durationMinutes = 0;

    // ==============================
    // DEADLINE
    // ==============================

    if (
        details.includes("today") ||
        details.includes("இன்று")
    ) {
        deadlineDays = 0;
    }

    // MUST CHECK THIS BEFORE "tomorrow"
    else if (
        details.includes("day after tomorrow") ||
        details.includes("நாளை மறுநாள்")
    ) {
        deadlineDays = 2;
    }

    else if (
        details.includes("tomorrow") ||
        details.includes("நாளை") ||
        details.includes("நாளைக்கு")
    ) {
        deadlineDays = 1;
    }

    else if (
        details.includes("next week") ||
        details.includes("அடுத்த வாரம்")
    ) {
        deadlineDays = 7;
    }

    else if (
        details.includes("next month") ||
        details.includes("அடுத்த மாதம்")
    ) {
        deadlineDays = 30;
    }

    // ==============================
    // DURATION
    // ==============================

    const hourMatch = details.match(
        /(\d+(?:\.\d+)?)\s*(hours?|hrs?)/
    );

    if (hourMatch) {
        durationMinutes = parseFloat(hourMatch[1]) * 60;
    }

    const minuteMatch = details.match(
        /(\d+)\s*(minutes?|mins?)/
    );

    if (minuteMatch) {
        durationMinutes += parseInt(minuteMatch[1]);
    }

    // ==============================
    // DEADLINE SCORE
    // ==============================

    let urgencyScore = 0;

    if (deadlineDays === 0) {
        urgencyScore = 100;
    }
    else if (deadlineDays === 1) {
        urgencyScore = 70;
    }
    else if (deadlineDays === 2) {
        urgencyScore = 40;
    }
    else if (deadlineDays <= 7) {
        urgencyScore = 20;
    }
    else {
        urgencyScore = 10;
    }

    // ==============================
    // TIME REQUIRED SCORE
    // ==============================

    let workloadScore = 0;

    if (durationMinutes >= 300) {
        workloadScore = 40;       // 5 hours+
    }
    else if (durationMinutes >= 180) {
        workloadScore = 30;       // 3–4 hours
    }
    else if (durationMinutes >= 120) {
        workloadScore = 25;       // 2 hours
    }
    else if (durationMinutes >= 60) {
        workloadScore = 20;       // 1 hour
    }
    else if (durationMinutes >= 30) {
        workloadScore = 10;       // 30–59 minutes
    }
    else if (durationMinutes > 0) {
        workloadScore = 5;        // 1–29 minutes
    }

    // ==============================
    // FINAL SCORE
    // ==============================

    const priorityScore =
        urgencyScore + workloadScore;

    // ==============================
    // PRIORITY COLOUR
    // ==============================

    if (priorityScore >= 100) {
        return {
            name: "High",
            className: "priority-high"
        };
    }

    if (priorityScore >= 70) {
        return {
            name: "Important",
            className: "priority-important"
        };
    }

    if (priorityScore >= 40) {
        return {
            name: "Medium",
            className: "priority-medium"
        };
    }

    return {
        name: "Low",
        className: "priority-low"
    };
}
    
function sortTasksByPriority() {

    const order = {
        "High": 1,
        "Important": 2,
        "Medium": 3,
        "Low": 4
    };

    const cards = Array.from(
        priorityList.querySelectorAll(".task-card")
    );

    cards.sort(function(a, b) {
        return order[a.dataset.priority] -
               order[b.dataset.priority];
    });

    cards.forEach(function(card) {
        priorityList.appendChild(card);
    });
}function markTaskAsMissed(card) {

    card.dataset.missed = "true";

    card.dataset.priority = "High";const missedButton = card.querySelector("button");

if (missedButton) {
    missedButton.style.display = "none";
}

    const details = card.querySelector("p");

if (details) {
    details.textContent = "⚠️ Missed · " + details.textContent;
}


    const circle = card.querySelector(".priority-circle");

    if (circle) {
        circle.className =
            "priority-circle priority-high";
    }

    sortTasksByPriority();
}
// ==============================
// VOICE INPUT
// ==============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    let isListening = false;

    voiceButton.addEventListener("click", function () {

        // STOP
        if (isListening) {

            recognition.stop();
            isListening = false;

            voiceButton.classList.remove("listening");

            voiceButton.textContent =
                languageSelect.value === "ta-IN"
                    ? "🎤 பேசுங்கள்"
                    : "🎤 Speak";

            voiceStatus.textContent = "";

            return;
        }

        // START
        recognition.lang = languageSelect.value;

        isListening = true;

        voiceButton.classList.add("listening");

        voiceButton.textContent =
            languageSelect.value === "ta-IN"
                ? "🛑 நிறுத்து"
                : "🛑 Stop";

        voiceStatus.textContent =
            languageSelect.value === "ta-IN"
                ? "🎤 கேட்கிறேன்..."
                : "🎤 Listening...";

        recognition.start();
    });

    recognition.onresult = function (event) {

        if (event.results[0].isFinal) {

            const spokenText =
                event.results[0][0].transcript;

            taskInput.value = spokenText;

            voiceStatus.textContent =
                languageSelect.value === "ta-IN"
                    ? "✅ முடிந்தது"
                    : "✅ Done";
        }
    };

    recognition.onerror = function () {

        isListening = false;

        voiceButton.classList.remove("listening");

        voiceButton.textContent =
            languageSelect.value === "ta-IN"
                ? "🎤 பேசுங்கள்"
                : "🎤 Speak";

        voiceStatus.textContent =
            languageSelect.value === "ta-IN"
                ? "⚠️ குரலைப் புரிந்துகொள்ள முடியவில்லை"
                : "⚠️ Could not hear you";
    };

    recognition.onend = function () {

        isListening = false;

        voiceButton.classList.remove("listening");

        voiceButton.textContent =
            languageSelect.value === "ta-IN"
                ? "🎤 பேசுங்கள்"
                : "🎤 Speak";
    };

} else {

    voiceButton.addEventListener("click", function () {

        voiceStatus.textContent =
            "⚠️ Voice input is not supported in this browser.";

    });

}
// ==============================
// SPLASH SCREEN
// ==============================

window.addEventListener("load", function () {

    setTimeout(function () {

        const splashScreen =
            document.getElementById("splashScreen");

        if (splashScreen) {
            splashScreen.style.display = "none";
        }

    }, 2000);

});

