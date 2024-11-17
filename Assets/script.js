// Function to create a new list item with a reminder time
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;

  if (inputValue === '') {
    alert("You must write something!");
    return;
  }

  // Ask the user for a reminder time in HH:MM format
  var reminderTime = prompt("Enter reminder time in HH:MM format (24-hour clock):");

  // Validate reminder time format
  if (reminderTime && /^\d{2}:\d{2}$/.test(reminderTime)) {
    var t = document.createTextNode(inputValue + " (Reminder: " + reminderTime + ")");
    li.setAttribute("data-reminder-time", reminderTime); // Store reminder time
  } else {
    alert("Invalid time format! The item will be added without a reminder.");
    var t = document.createTextNode(inputValue); // Create text node without reminder time
  }

  li.appendChild(t);
  document.getElementById("myUL").appendChild(li);
  document.getElementById("myInput").value = "";

  // Add a close button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Close button functionality
  span.onclick = function() {
    li.style.display = "none"; // Hide the task when close button is clicked
  }
}


var notificationAudio = new Audio('Assets/Baothuc1.mp3'); // Replace with your sound file path

// Check for reminders every minute
setInterval(function() {
  // Get current time in Vietnam (UTC+7)
  var currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
  var date = new Date(currentTime);
  var hours = String(date.getHours()).padStart(2, "0");
  var minutes = String(date.getMinutes()).padStart(2, "0");
  var formattedTime = hours + ":" + minutes;

  // Loop through each task to check for reminder matches
  var tasks = document.querySelectorAll("li");
  tasks.forEach(function(task) {
    var reminderTime = task.getAttribute("data-reminder-time");
    // Check if the reminder time matches the current time
    if (reminderTime === formattedTime && !task.classList.contains("alerted")) {
      console.log("Playing notification for task: " + task.textContent);

      // Play the notification sound
      notificationAudio.play().catch(function(error) {
        console.error("Error playing sound:", error); // Log any playback errors
      });
      
      // Display alert message after playing the sound
      setTimeout(function() {
        alert("ĐẾN GIỜ THỰC HIỆN: " + task.textContent.replace("\u00D7", "").trim());
      }, 100); 

      task.classList.add("alerted"); 
    }
  });
}, 10000); // Check every minute


// Initial close button functionality for existing tasks
var myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);


  span.onclick = function() {
    myNodelist[i].style.display = "none"; 
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked'); // Toggle checked state
  }
}, false);
