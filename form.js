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

			convertedString += rules.start.header
			convertedString += rules.start.first_column

			// Cover
			convertedString += rules.start.half_column
			convertedString += rules.start.cover
			// Image url
			convertedString += cover
			convertedString += rules.end.cover
			convertedString += rules.end.half_column

			// Inicio Bloco de Título e Botão Alliate
			convertedString += rules.start.last_column

			// Title
			convertedString += rules.start.title
			convertedString += title
			convertedString += rules.end.title

			convertedString += rules.start.padding

			//Amazon link
			convertedString += rules.start.amazon_link
			convertedString += amazon
			convertedString += rules.end.amazon_link

			// Fim Bloco de Título e Botão Alliate
			convertedString += rules.end.last_column

			// Start article block
			convertedString += rules.start.article

			// Article content
			convertedString += rules.start.main_article
			convertedString += article
			convertedString += rules.end.main_article

			// End article block
			convertedString += rules.end.article

			// Start table block
			convertedString += rules.start.table

			// Start table
			convertedString += rules.start.table_start

			// Table title
			convertedString += rules.start.table_title
			convertedString += title
			convertedString += rules.end.table_title

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

			// Table desc
			convertedString += rules.start.table_link
			convertedString += amazon
			convertedString += rules.end.table_link

			// End table
			convertedString += rules.end.table_start

			// End table block
			convertedString += rules.start.table

			// Extras
			convertedString += rules.start.end

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
