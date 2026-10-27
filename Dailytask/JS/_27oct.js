// Wait until the HTML is fully parsed before touching the DOM.
document.addEventListener("DOMContentLoaded", function () {
    setupGreeting();
    setupTaskList();
    setupThemeBox();
    setupEventLog();
    setupFormAndKeys();
    setupDelegation();
    setupStars();
});

// 1. Select nodes and change their text
function setupGreeting() {
    var nameInput = document.getElementById("name-input");
    var greetBtn = document.getElementById("greet-btn");
    var greeting = document.getElementById("greeting");

    greetBtn.addEventListener("click", function () {
        var name = nameInput.value.trim();
        if (name === "") {
            greeting.textContent = "Please type a name first.";
            return;
        }
        greeting.textContent = "Hello, " + name + "! The DOM just changed this text.";
    });
}

// 2. Create, append, and remove elements
function setupTaskList() {
    var taskInput = document.getElementById("task-input");
    var addBtn = document.getElementById("add-task-btn");
    var list = document.getElementById("task-list");

    addBtn.addEventListener("click", function () {
        var text = taskInput.value.trim();
        if (text === "") {
            return;
        }

        var item = document.createElement("li");
        var label = document.createElement("span");
        var removeBtn = document.createElement("button");

        label.textContent = text;
        removeBtn.textContent = "Remove";
        removeBtn.type = "button";

        removeBtn.addEventListener("click", function () {
            item.remove();
        });

        item.appendChild(label);
        item.appendChild(removeBtn);
        list.appendChild(item);
        taskInput.value = "";
        taskInput.focus();
    });
}

// 3. Toggle a class and set a style
function setupThemeBox() {
    var box = document.getElementById("theme-box");
    var toggleBtn = document.getElementById("toggle-theme-btn");
    var colorBtn = document.getElementById("random-color-btn");

    toggleBtn.addEventListener("click", function () {
        box.classList.toggle("highlight");
    });

    colorBtn.addEventListener("click", function () {
        var colors = ["#22c55e", "#a78bfa", "#fb7185", "#38bdf8", "#f97316"];
        var pick = colors[Math.floor(Math.random() * colors.length)];
        box.style.backgroundColor = pick;
        box.style.color = "#0f172a";
        box.classList.remove("highlight");
    });
}

// 4. click, mouseover, mouseout, input
function setupEventLog() {
    var clickBox = document.getElementById("click-box");
    var hoverBox = document.getElementById("hover-box");
    var liveInput = document.getElementById("live-input");
    var log = document.getElementById("event-log");

    function showEvent(event) {
        log.textContent =
            "Event log: type=" + event.type +
            " | target=" + event.target.id;
    }

    clickBox.addEventListener("click", showEvent);
    hoverBox.addEventListener("mouseover", showEvent);
    hoverBox.addEventListener("mouseout", showEvent);
    liveInput.addEventListener("input", function (event) {
        log.textContent =
            "Event log: you typed \"" + event.target.value + "\"";
    });
}

// 5. keydown + form submit (preventDefault stops page reload)
function setupFormAndKeys() {
    var form = document.getElementById("note-form");
    var noteInput = document.getElementById("note-input");
    var lastKey = document.getElementById("last-key");
    var savedNote = document.getElementById("saved-note");

    noteInput.addEventListener("keydown", function (event) {
        lastKey.textContent = "Last key: " + event.key;
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var note = noteInput.value.trim();
        if (note === "") {
            savedNote.textContent = "Saved note: (empty — type something first)";
            return;
        }
        savedNote.textContent = "Saved note: " + note;
        noteInput.value = "";
    });
}

// 6. One listener on the parent handles every child button
function setupDelegation() {
    var toolbar = document.getElementById("color-toolbar");
    var output = document.getElementById("picked-color");

    toolbar.addEventListener("click", function (event) {
        var button = event.target.closest("button");
        if (!button || !toolbar.contains(button)) {
            return;
        }
        var color = button.getAttribute("data-color");
        output.textContent = "Picked color: " + button.textContent;
        output.style.color = color;
    });
}

// 7. Update many nodes with querySelectorAll
function setupStars() {
    var button = document.getElementById("light-stars-btn");
    var stars = document.querySelectorAll(".star");
    var lit = false;

    button.addEventListener("click", function () {
        lit = !lit;
        stars.forEach(function (star) {
            star.classList.toggle("lit", lit);
        });
        button.textContent = lit ? "Dim all stars" : "Light all stars";
    });
}
