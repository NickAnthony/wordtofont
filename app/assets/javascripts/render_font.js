// $(document).ready(function() {
// 	// Add an event listener to every label
// 	for (var i = 0; i < 10; i++) {
// 		var label_str = "label";
// 		label_str += i.toString();
// 	    document.getElementById(label_str).addEventListener("click", function() {
// 		    label_clicked(this.id);
// 		});
// 	}

// 	// Read and store all Google Fonts
// 	// $.ajax({
//  //      url: 'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=YOUR_API_KEY',
//  //      type: 'GET',
//  //      dataType: 'json',
//  //      success: function(data) { console.log(data.items); },
//  //      error: function() {  },
//  //    });

// });

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

// Do a search font 
function find_fonts(search_word) {
	$.ajax({
      url: '/api/v1/fonts',
      type: 'GET',
      dataType: 'json',
      data: { "descriptor": search_word.trim() },
      success: function(data) { render_fonts(data); },
      error: function() { console.log("Error in get request"); },
    });
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
      error: function() { console.log("Error in get request"); },
    });
}

// format and render all fonts
function render_fonts(data) {
	// If no fonts were found, just return
	remove_all_but_one_child('font_display_container');
	if (data.data.length == 0) {
		return;
	}
	var num_fonts = data.data.length;
  	for (var i = 0; i < num_fonts; i++) {
  		WebFont.load({
	    	google: {
	      		families: [data.data[i].name]
	   	 	}
	  	});
  		$("#font_display_container").append("<div id='font" + i + "' class='font_display'>" + data.data[i].name + "</div>")
  		$("#font" + i).css("font-family", data.data[i].name);
  	}
}


function get_random_font() {
	var random_id = Math.floor((Math.random() * 2201) + 1);
	$.ajax({
      url: '/api/v1/fonts',
      type: 'GET',
      dataType: 'json',
      data: { "font_id": random_id },
      success: function(data) { render_random_font(data); },
      error: function() { alert('Error!'); },
    });
    return random_id;
}

function render_random_font(data) {
	remove_all_but_one_child('font_display_container');
	WebFont.load({
    	google: {
      		families: [data.data.name]
   	 	}
  	});
	$("#font_display_container").append("<div id='current_font' class='single_font_display'>" + data.data.name + "... The quick brown fox jumped over the lazy dog.</div>")
  	$("#current_font").css("font-family", data.data.name);
}

function log_description(description, font_id) {
	$.ajax({
      url: '/api/v1/descriptors',
      type: 'POST',
      data: { 
      	"description": description.trim(),
      	"font_id": font_id,
      },
      success: function(data) {  },
      error: function() { alert('Failed to log description for font'); },
    });
}

function remove_all_but_one_child(ele_id) {
	var element = document.getElementById(ele_id);
	while (element.childElementCount > 1){
		element.removeChild(element.lastChild);
	}
}


