
function calculateGrade() {
    let marks = Number(document.getElementById("marks").value);
    let grade;

    if (marks < 0 || marks > 100) {
        document.getElementById("result").textContent =
            "Please enter marks between 0 and 100.";
        return;
    }
    if (marks >= 90) {
       grade = "A";
        console.log("very Good!")
    } else if (marks >= 80) {
        grade = "B";
    } else if (marks >= 70) {
        grade = "C";
    } else if (marks >= 60) {
        grade = "D";
    } else {
        grade = "F";
    };

     document.getElementById("result").textContent =
        "Your grade is: " + grade;
};