var files = [];

function selectFiles(){
	document.getElementById("object_file").click();
}

function showSelectedFiles(){
	let row = document.getElementById("tab_header");
	if(row.childElementCount == 0){
		let name = row.insertCell(0);
		name.innerHTML = "File Name";
		let size = row.insertCell(1);
		size.innerHTML = "Size(bytes)";	
	}
	let i = 0;
	let filesElement = document.getElementById('object_file');
	const tableBody = document.getElementById("tab_body");
	while(filesElement.files.item(i) != undefined){
		files.push(filesElement.files.item(i));
		row = tableBody.insertRow();
		let name = row.insertCell(0);
		let size = row.insertCell(1);
		name.innerHTML = filesElement.files.item(i).name;
		size.innerHTML = filesElement.files.item(i).size;
		i++;
	}
	filesElement.value = ``;
}

function viewFiles(){
	for(let i = 0; i < files.length; i++){
		let textParsed;
		let textString;
		let reader = new FileReader();
		let fileName = files[i].name; 
		let contentArea = document.getElementsByClassName("content2")[0];
		contentArea.innerHTML = ``;
		reader.readAsBinaryString(files[i]);
		reader.onloadend = function(){
			textParsed = JSON.parse(reader.result);
			textString = JSON.stringify(textParsed, null, 4);
		    contentArea.innerHTML += `<label for="area${i}">${fileName}</label><br>`;
			contentArea.innerHTML += `<textarea id="area${i}" name="area${i}" readonly>${textString}</textarea><br><br>`;
		}
	}
}

function clearArea(){
	files.length = 0;

	const row = document.getElementById("tab_header");
	row.innerHTML = ``;

	const tableBody = document.getElementById("tab_body");
	tableBody.innerHTML = ``;

	let contentArea = document.getElementsByClassName("content2")[0];
	contentArea.innerHTML = ``;
}