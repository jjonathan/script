$(document).ready(function(){
	$('#convert').click(function(){
		var href = window.location.href;
		var dir = href.substring(0, href.lastIndexOf('/')) + "/";
		var jsonUrl = dir + 'config.json'

		$.get(jsonUrl, function(rules){

			var title = $("#inputtitle").val()
			var cover = $("#inputcover").val()
			var amazon = $("#inputamazon").val()
			var excerpt = $("#inputexcerpt").val()
			var article = tinymce.get('inputarticle').getContent()

			var convertedString = ""


			//Start/End with Header
			convertedString += rules.start.header

			//Start/End with left Column
			convertedString += rules.start.left_column

			//Start Cover Column
			convertedString += rules.start.cover_column

			//Add Cover Image Inside Cover Column
			convertedString += rules.start.cover_image
			convertedString += cover
			convertedString += rules.end.cover_image

			//End Cover Column
			convertedString += rules.end.cover_column

			//Start/End with right Column
			convertedString += rules.start.right_column

			//Start with Title Column
			convertedString += rules.start.title_column

			//Add Title, Padding and Amazon Link
			convertedString += rules.start.title
			convertedString += title
			convertedString += rules.end.title

			convertedString += rules.start.padding

			convertedString += rules.start.amazon_link
			convertedString += amazon

			//End with Amazon Link
			convertedString += rules.end.amazon_link

			//End with Title Column 
			convertedString += rules.end.title_column

			//Start with article Content
			convertedString += rules.start.article
			// Article content
			convertedString += article
			// End article block
			convertedString += rules.end.article

			//Start with table block
			convertedString += rules.start.table_header

			//Start with Table
			convertedString += rules.start.table

			// Table title
			convertedString += rules.start.table_title

			// Table img
			convertedString += rules.start.table_img
			convertedString += cover
			convertedString += rules.end.table_img

			// Table desc
			convertedString += rules.start.table_desc
			convertedString += firstContent(article)
			convertedString += rules.end.table_desc

			// Table money
			convertedString += rules.start.table_money
			convertedString += rules.end.table_money

			// Table link
			convertedString += rules.start.table_link
			convertedString += amazon
			convertedString += rules.end.table_link

			//End Table Title
			convertedString += rules.end.table_title

			//End Table
			convertedString += rules.end.table

			//End with Table block
			convertedString += rules.end.table_header

			// End table block
			convertedString += rules.start.extras

			downloadString(convertedString, rules.fileFormat, rules.fileName)
		})
	})
})

function firstContent(str){
	return str.substr(0, 150)
}

function downloadString(text, fileType, fileName) {
	var blob = new Blob([text], { type: fileType });

	var a = document.createElement('a');
	a.download = fileName;
	a.href = URL.createObjectURL(blob);
	a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
}
