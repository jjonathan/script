$(function(){
	
	function getJson(cb){
		$.getJSON("replaceVars.json", function(json) {
		    cb(json)
		})
	}

	function convertData(cb){
		var title = $("#inputtitle").val()
		var cover = $("#inputcover").val()
		var amazon = $("#inputamazon").val()
		var excerpt = $("#inputexcerpt").val()
		var article = tinymce.get('inputarticle').getContent()

		var convertedFile = ""

		getJson(function(rules){
			console.log(rules)
			convertedFile += rules.start.header
			convertedFile += rules.start.first_column

			// Cover
			convertedFile += rules.start.half_column
			convertedFile += rules.start.cover
			// Image url
			convertedFile += cover
			convertedFile += rules.end.cover
			convertedFile += rules.end.half_column

			// Inicio Bloco de Título e Botão Alliate
			convertedFile += rules.start.last_column

			// Title
			convertedFile += rules.start.title
			convertedFile += title
			convertedFile += rules.end.title

			convertedFile += rules.start.padding

			//Amazon link
			convertedFile += rules.start.amazon_link
			convertedFile += amazon
			convertedFile += rules.end.amazon_link

			// Fim Bloco de Título e Botão Alliate
			convertedFile += rules.end.last_column

			// Start article block
			convertedFile += rules.start.article

			// Article content
			convertedFile += rules.start.main_article
			convertedFile += article
			convertedFile += rules.end.main_article

			// End article block
			convertedFile += rules.end.article

			// Start table block
			convertedFile += rules.start.table

			// Start table
			convertedFile += rules.start.table_start

			// Table title
			convertedFile += rules.start.table_title
			convertedFile += title
			convertedFile += rules.end.table_title

			// Table img
			convertedFile += rules.start.table_img
			convertedFile += cover
			convertedFile += rules.end.table_img

			// Table desc
			convertedFile += rules.start.table_desc
			convertedFile += firstContent(article)
			convertedFile += rules.end.table_desc

			// Table money
			convertedFile += rules.start.table_money

			// Table desc
			convertedFile += rules.start.table_link
			convertedFile += amazon
			convertedFile += rules.end.table_link

			// End table
			convertedFile += rules.end.table_start

			// End table block
			convertedFile += rules.start.table

			// Extras
			convertedFile += rules.start.end

			cb(convertedFile)
		})
	}

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

	$("#link").click(function(){
		convertData(function(convertedData){
			downloadString(convertedData, 'html', 'converted.html')
		})
	})

})