const fs = require('fs')


fs.readFile('sourcefile.md', 'utf8' , (err, markdownText) => {
	if (err) {
		console.error(err)
		return
	}
	
	var markdownWithFixedTitles = markdownText.replace(/^title: ([^\n]+)\n\s+([^\n]+)/gm, `title: $1 $2`)
	var markdownAsLineArray = markdownWithFixedTitles.split("\n")
	
	var filenames = [];
  
	markdownAsLineArray.forEach(function(singleLine) {
		var titleLine = singleLine.replace(/title: /, '');

		if(titleLine == singleLine) { return; }	// Meaning it's not a title line
		
		var filename = titleLine.replace(/ /g, "-").toLowerCase() + ".md";
		filenames.push(filename);
		// console.log(filename);
	});
	
	var markdownAsBlocks = markdownWithFixedTitles.split("---\ntitle:")
	
	// console.log(markdownAsBlocks);

	// console.log(markdownWithFixedTitles)
	
	for(i = 0; i < filenames.length; ++i) {
		var filename = filenames[i];
		var newMarkdown = "---\ntitle: " + markdownAsBlocks[i + 1];
		
		fs.writeFile(filename, newMarkdown, function() {});
	}
})
