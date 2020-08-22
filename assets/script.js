// Variables for Time
var time = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var millitaryTime = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// Current time for user
var getCurrentHour = moment().hour();

// Current Date In Header Formatted
$("#currentDay").text(moment().format("dddd, MMMM Do"));

// For Loop to Generate 9AM - 5PM Time Blocks
for (let index = 0; index < time.length; index++) {
  // Creates row for each time
  var row = $("<div class='row time-block'>");
  // Creates hour for each time
  var colTime = $("<div class='hour col-md-1'>").text(time[index]);

  // Creates text input boxes depending on the current time. It sets the id between 0-8 for pulling specific saved content from local storage

  // Present hour
  if (millitaryTime[index] === getCurrentHour) {
    var textBox = $(
      "<textarea class='col-md-10 description form-control present'>"
    ).attr("id", index);
  }

  // Past hour
  else if (millitaryTime[index] < getCurrentHour) {
    var textBox = $(
      "<textarea class='col-md-10 description form-control past'>"
    ).attr("id", index);
  }
  // Future hour
  else {
    var textBox = $(
      "<textarea class='col-md-10 description form-control future'>"
    ).attr("id", index);
  }
  // If there is a previously saved memo for an index, it is pulled from the local storage and set as the text in the text box
  if (localStorage.getItem(index)) {
    textBox.text(localStorage.getItem(index));
  }
  // Save button created
  var saveBttn = $("<button class='col-md-1 saveBtn fas fa-save'></button>");

  // Save button attribute sets the data-id to the specific time block's index
  saveBttn.attr("data-id", index);

  // Save button on click
  saveBttn.on("click", function () {
    // Saving the data-id of the save button clicked as a variable
    var id = $(this).attr("data-id");
    // Creating a variable to save the memo entered by the user. It is found as the data-id = the id of the text box
    var getMemo = $("#" + id).val();
    console.log(getMemo);
    //Setting the memo to local storage
    localStorage.setItem(index, getMemo);
  });

  // Appending all time blocks to their row
  row.append(colTime, textBox, saveBttn);
  // Appending all rows onto the display
  $(".display").append(row);
}

// Clear button on click event
$(".clear-dates").on("click", function () {
  // Clears the text box for all time blocks
  $(".description").val("");
  // Clears local storage so memos do not reappear after clearing and refreshing
  localStorage.clear();
});
