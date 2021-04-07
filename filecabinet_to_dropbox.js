function mainApp() {
filters[0] = new nlobjSearchFilter('internalid', null, 'is', '-15');
var columns = new Array();
var filename = new nlobjSearchColumn('name', 'file');
var fileid = new nlobjSearchColumn('internalid', 'file');
columns[0] = filename;
columns[1] = fileid;
var searchResult = nlapiSearchRecord('folder', null , filters , columns);
if(searchResult) {
	var git_key = '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';
	for (var i = 0 ; i < searchResult.length; i++) {
		
		var f = searchResult[i];
		var fileId = f.getValue(fileid);
		var file = nlapiLoadFile(fileId);
        var fileContent = file.getContents();
		var file = nlapiLoadFile(fileId);
		var fileName = file.getName();
		var header = new Array();
            header['Authorization'] = 'token ' + git_key;
			header['content-type'] = 'text/plain; charset=ISO-8859-1';
			header['content-transfer-encoding'] = 'base64';
			var git_url = "https://uploads.github.com/repos/SquareGrove/NS-projects/contents/" + fileName;
			try {
			var outputbc = nlapiRequestURL(git_url, file, header, "POST");
			var output_body = outputbc.getBody();
			nlapiLogExecution('debug','Status',output_body);
			}
}
}
}