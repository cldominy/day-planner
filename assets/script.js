var time = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var millitaryTime = [9, 10, 11, 12, 13, 14, 15, 16, 17]

var getCurrentHour = moment().hour()

$("#currentDay").text(moment().format("dddd, MMMM Do"))

for (let index = 0; index < time.length; index++) {
  
   
    var row = $("<div class='row'>")
    var colTime = $("<div class='col-sm-1  text-right'>").text(time[index]) 

    if (millitaryTime[index] === getCurrentHour){
        var textBox = $("<textarea class='description form-control present'>").attr("id", index)
    }

    else if (millitaryTime[index] < getCurrentHour){
        var textBox = $("<textarea class='description form-control past'>").attr("id", index)
    }
    
    else{
        var textBox = $("<textarea class='description form-control future'>").attr("id", index)
    }
    
    if (localStorage.getItem(index)){
        textBox.text(localStorage.getItem(index))
    }
    var colText = $("<div class='col-sm-10'>").append(textBox)
    var saveBttn = $("<button class='saveBtn btn-lg'><i class='fas fa-save'></i></button>")
    
    saveBttn.attr("data-id", index)
    saveBttn.on("click", function(){
         var id = $(this).attr("data-id") 
          var getMemo = $("#" + id).val()
          console.log(getMemo)
        localStorage.setItem(index, getMemo)
    })
    var colSave = $("<div class='col-sm-1'>").append(saveBttn)

    row.append(colTime, colText, colSave)
    $(".display").append(row)

}

