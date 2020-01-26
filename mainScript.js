fetch('http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/AllTasks')
  .then(response => response.json())
  .then(data => getAllTask(data))

function getAllTask(data) {
	var result = document.getElementById("allTasks").innerHTML ;
	for(var i =0; i < data.count; i++) {
		result += "<tr>";
		result += "<td><div contenteditable>" + data.items[i].TaskName + "</div></td>" ;
		result += "<td><div contenteditable>" + data.items[i].TimeReqtoComplete + "</div></td>" ;
		result += "<td><div contenteditable>" + data.items[i].TimeSpent+ "</div>	</td>" ;
		result += "<td><button> Save </button></td>";
		result += "</tr>";
	}
	
	
	document.getElementById("allTasks").innerHTML = result;
	//console.log(data.items[0]);
	//console.log(data);
}


fetch('http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/DaysData')
  .then(response => response.json())
  .then(data => getDaysTask(data))

function getDaysTask(data) {
	var result = document.getElementById("daysTasks").innerHTML ;
	for(var i =0; i < data.count; i++) {
		result += "<tr>";
		result += "<td style=\"display:none;\">" + data.items[i].DaysDataId + "</td>" ;
		result += "<td><div contenteditable>" + data.items[i].TaskName + "</div></td>" ;
		result += "<td><div contenteditable>" + data.items[i].PlannedTime + "</div></td>" ;
		result += "<td><div contenteditable>" + data.items[i].TimeSpent+ "</div></td>" ;
		result += "<td><button> Save </button></td>";
		var d = data.items[i].DateVal;
		var date = new Date(d);
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		result += "<td>" +  date.getDate()+" "+ months[date.getMonth()]+" "+ date.getFullYear()+"</td>" ;
		result += "</tr>";
	}	
	document.getElementById("daysTasks").innerHTML = result;
}

function createNewTask() {
	//var result = document.getElementById("daysTasks").innerHTML ;
	var elements = document.getElementById("form1").elements;
	var result = "{";
	var i = 0
	for (; i < elements.length - 2; i++) {
		
		if (elements[i].type === "text")
			result += '\"' + elements[i].id + '":"' + elements[i].value + '",';
	}
	if(elements[i].type === "text")
		result += '\"' + elements[i].id + '":"' + elements[i].value + '"';
	//if (element.type === "text" && element.value === "")
			//console.log("it's an empty textfield")
	result += "}";

	console.log(result);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/AllTasks";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.email + ", " + json.password);
		}
	};
	var data = JSON.stringify(result);
	//var data = '{"TaskId":"48","TaskName":"11","TimeReqtoComplete":"11","TimeSpent":"11"}';
	console.log("**********--------------------************------------**************");
	console.log(result);
	//console.log(data);
	xhr.send(result);
	//var taskName = document.getElementById("TaskId");
	//console.log(result);
		/*var formData = JSON.stringify($("#form1").serializeArray());
		console.log("********************************************_________________********");
		console.log(formData);
		
		$.ajax({
		  type: "POST",
		  url: "http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/AllTasks",
		  data: formData,
		  success: function(){},
		  dataType: "json",
		  contentType : "application/json"
		});
	*/

}

function addTask() {
	var elements = document.getElementById("form2").elements;
	var result = "{";
	var i = 0
	for (; i < elements.length ; i++) {
		
		if (elements[i].type === "text")
			result += '\"' + elements[i].id + '":"' + elements[i].value + '",';
	}
	//if(elements[i].type === "text")
		//result += '\"' + elements[i].id + '":"' + elements[i].value + '"';
	result += '\"' + "DateVal" + '":' + JSON.stringify(new Date());
	//if (element.type === "text" && element.value === "")
			//console.log("it's an empty textfield")
	result += "}";

	//console.log(result);
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/DaysData";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			console.log(json.email + ", " + json.password);
		}
	};
	var data = JSON.stringify(result);
	//var data = '{"TaskId":"48","TaskName":"11","TimeReqtoComplete":"11","TimeSpent":"11"}';
	//console.log("**********--------------------************------------**************");
	//console.log(result);
	//console.log(data);
	xhr.send(result);

}


fetch('http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/DaysData?q=TaskCompleted=N')
  .then(response => response.json())
  .then(data => getTodaysPendingTask(data))

function getTodaysPendingTask(data) {
	var result = document.getElementById("pendingTasks").innerHTML ;
	var todayDate = new Date(Date());
	for(var i =0; i < data.count; i++) {
		var d = data.items[i].DateVal;		
		var date = new Date(d);
		//console.log(date);
		if(todayDate.getDate() == date.getDate() && todayDate.getMonth() == date.getMonth() && todayDate.getFullYear() == date.getFullYear()) {
			result += "<tr id=\"" + data.items[i].DaysDataId +"tr\">";
			result += "<td style=\"display:none;\">" + data.items[i].DaysDataId + "</td>" ;
			result += "<td id=\"TaskName\"><div contenteditable>" + data.items[i].TaskName + "</div></td>" ;
			result += "<td id=\"PlannedTime\"><div contenteditable>" + data.items[i].PlannedTime + "</div></td>" ;
			result += "<td id=\"TimeSpent\"><div contenteditable>" + data.items[i].TimeSpent+ "</div></td>" ;
			
			//var d = data.items[i].DateVal;
			//var date = new Date(d);
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
			result += "<td>" +  date.getDate()+" "+ months[date.getMonth()]+" "+ date.getFullYear()+"</td>" ;
			result += "<td><button id =\"" + data.items[i].DaysDataId + "\" onClick=\"saveDaysData(this.id)\" > Save </button></td>";
			result += "</tr>";		
		}
		
	}
	
	document.getElementById("pendingTasks").innerHTML = result;
}
fetch('http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/DaysData?q=TaskCompleted=Y')
  .then(response => response.json())
  .then(data => getDaysCompletedTask(data))

function getTodaysCompletedTask(data) {
	var result = document.getElementById("pendingTasks").innerHTML ;
	var todayDate = new Date(Date());
	for(var i =0; i < data.count; i++) {
		var d = data.items[i].DateVal;		
		var date = new Date(d);
		//console.log(date);
		if(todayDate.getDate() == date.getDate() && todayDate.getMonth() == date.getMonth() && todayDate.getFullYear() == date.getFullYear()) {
			result += "<tr id=\"" + data.items[i].DaysDataId +"tr\">";
			result += "<td style=\"display:none;\">" + data.items[i].DaysDataId + "</td>" ;
			result += "<td id=\"TaskName\"><div contenteditable>" + data.items[i].TaskName + "</div></td>" ;
			result += "<td id=\"PlannedTime\"><div contenteditable>" + data.items[i].PlannedTime + "</div></td>" ;
			result += "<td id=\"TimeSpent\"><div contenteditable>" + data.items[i].TimeSpent+ "</div></td>" ;
			
			//var d = data.items[i].DateVal;
			//var date = new Date(d);
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
			result += "<td>" +  date.getDate()+" "+ months[date.getMonth()]+" "+ date.getFullYear()+"</td>" ;
			result += "<td><button id =\"" + data.items[i].DaysDataId + "\" onClick=\"saveDaysData(this.id)\" > Save </button></td>";
			result += "</tr>";		
		}
		
	}
	
	document.getElementById("pendingTasks").innerHTML = result;
}

function getDaysCompletedTask(data) {
	var result = document.getElementById("doneTasks").innerHTML ;
	var todayDate = new Date(Date());
	for(var i =0; i < data.count; i++) {
		var d = data.items[i].DateVal;		
		var date = new Date(d);
		if(todayDate.getDate() == date.getDate() && todayDate.getMonth() == date.getMonth() && todayDate.getFullYear() == date.getFullYear()) {
			result += "<tr id=\"" + data.items[i].DaysDataId +"tr\">";
			result += "<td style=\"display:none;\">" + data.items[i].DaysDataId + "</td>" ;
			result += "<td><div contenteditable>" + data.items[i].TaskName + "</div></td>" ;
			result += "<td><div contenteditable>" + data.items[i].PlannedTime + "</div></td>" ;
			result += "<td><div contenteditable>" + data.items[i].TimeSpent+ "</div></td>" ;
			
			var d = data.items[i].DateVal;
			var date = new Date(d);
			var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
			result += "<td>" +  date.getDate()+" "+ months[date.getMonth()]+" "+ date.getFullYear()+"</td>" ;
			result += "<td><button id =\"" + data.items[i].DaysDataId + "\" onClick=\"saveDaysData(this.id)\" > Save </button></td>";
			result += "</tr>";
		}
	}
	
	document.getElementById("doneTasks").innerHTML = result;
	//console.log(data.items[0]);
	//console.log(data);
}


function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function saveDaysData(clicked_id) {
	//alert(clicked_id)
	var taskName = document.getElementById(clicked_id).parentElement.parentElement.querySelector("#TaskName").firstChild.innerHTML;
	var plannedTime = document.getElementById(clicked_id).parentElement.parentElement.querySelector("#PlannedTime").firstChild.innerHTML;
	var timeSpent = document.getElementById(clicked_id).parentElement.parentElement.querySelector("#TimeSpent").firstChild.innerHTML;
	console.log("taskName " + taskName + " plannedTime " + plannedTime + " timeSpent " + timeSpent);
	console.log("I am here");

	var result = "{";
	result += '"TaskName":"' + taskName + '",';
	result += '"PlannedTime":"' + plannedTime + '",';
	result += '"TimeSpent":"' + timeSpent + '",';
	if(plannedTime == timeSpent)
		result += '"TaskCompleted":"Y"';
	else
		result += '"TaskCompleted":"N"';
	result += "}";
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:7101/OnTrack-RESTWebService-context-root/rest/v0/DaysData/" + clicked_id;
	xhr.open("PATCH", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var json = JSON.parse(xhr.responseText);
			//console.log(json.email + ", " + json.password);
		}
	};
	//var data = JSON.stringify(result);
	console.log(result);
	xhr.send(result);
}