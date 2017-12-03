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
	$.get("http://api.moodtofont.dev/fonts.json", function(data){
	  alert("Data: " + data);
	});
	// alert(word);
}




;
