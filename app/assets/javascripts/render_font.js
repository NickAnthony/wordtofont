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


// When a label is clicked, get all related fonts
function label_clicked(id){
	var word_label = "#" + id;
	var word = $(word_label).text();
	$.ajax({
      url: '/api/v1/fonts',
      type: 'GET',
      dataType: 'json',
      data: { "descriptor": word.trim() },
      success: function(data) { render_fonts(data); },
      error: function() { alert('Error!'); },
    });
}


// format and render all fonts
function render_fonts(data) {
	var num_fonts = data.data.length;
  	for (var i = 0; i < num_fonts; i++) {
  		$("#font_display_container").append("<div id='font" + i + "' class='font_display'>" + data.data[i].name + "</div>")
  		$("#font" + i).css("font-family", data.data[i].name);
  	}
}



