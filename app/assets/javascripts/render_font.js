$(document).ready(function() {
	// Add an event listener to every label
	for (var i = 0; i < 10; i++) {
		var label_str = "label";
		label_str += i.toString();
	    document.getElementById(label_str).addEventListener("click", function() {
		    label_clicked(this.id);
		});
	}

	// Read and store all Google Fonts
	// $.ajax({
 //      url: 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=YOUR_API_KEY',
 //      type: 'GET',
 //      dataType: 'json',
 //      success: function(data) { read_in_fonts(data); },
 //      error: function() { alert('Error!'); },
 //    });

});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function read_in_fonts(data) {
	console.log(data.items);
	var num_fonts = data.items.length;
	for (var i = 0; i < num_fonts; i++) {
	 	var num_variants = data.items[i].variants.length;
	 	for (var j = 0; j < num_variants; j++) {
	  		$.ajax({
		      url: '/api/v1/fonts',
		      type: 'POST',
		      data: {
		      	"name": data.items[i].family,
		      	"family": data.items[i].category,
		      	"style": data.items[i].variants[j]
		      },
		      success: function() {  },
		      error: function() { return; },
		    });
		    // Sleep for 500ms to allow for database insert to complete
		    await sleep(500);
		}
  	}

}


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



