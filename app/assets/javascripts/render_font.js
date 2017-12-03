$(document).ready(function() {
	// Add an event listener to every label
	for (var i = 0; i < 10; i++) {
		var label_str = "label";
		label_str += i.toString();
	    document.getElementById(label_str).addEventListener("click", function() {
		    label_clicked(this.id);
		});
	}
});

function label_clicked(id){
	var word_label = "#" + id;
	var word = $(word_label).text();
	// alert(word);
	$.get("/api/v1/fonts", function(data){
		console.log(data.data[0].name);
	  	// alert("Data: " + data);
	  	var num_fonts = data.data.length;
	  	console.log(num_fonts);
	  	for (var i = 0; i < num_fonts; i++) {
	  		$("#font_display_container").append("<div id='font" + i + "' class='font_display'>" + data.data[i].name + "</div>")
	  		console.log("<div id='font" + i + "' class='font_display'>" + data.data[i].name + "</div>");
	  		$("#font" + i).css("font-family", data.data[i].name);
	  		console.log("#font" + i);
	  	}
	  	$("#font_display_container").append("<div id='font" + 1 + "' class='font_display'>" + data.data[0].name + "</div>")
  		console.log("<div id='font" + 1 + "' class='font_display'>" + data.data[0].name + "</div>");
  		$("#font" + 1).css("font-family", data.data[0].name);
  		console.log("#font" + 1);
	});	
}




