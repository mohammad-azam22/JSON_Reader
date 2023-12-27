let file = null;

function selectFile(){
	document.getElementById("object_file").click();
}

function showSelectedFile(){
	clearArea();
	let row = document.getElementById("tab_header");
	if(row.childElementCount == 0){
		let name = row.insertCell(0);
		name.innerHTML = "File Name";
		let size = row.insertCell(1);
		size.innerHTML = "Size(bytes)";	
	}
	let filesElement = document.getElementById('object_file');
	const tableBody = document.getElementById("tab_body");
	if(filesElement.files.item(0) != undefined){
		file = filesElement.files.item(0);
		row = tableBody.insertRow();
		let name = row.insertCell(0);
		let size = row.insertCell(1);
		name.innerHTML = filesElement.files.item(0).name;
		size.innerHTML = filesElement.files.item(0).size;
	}
	filesElement.value = ``;
}

function editFile(){
	let reader = new FileReader();
		let contentArea = document.getElementsByClassName("content2")[0];
		contentArea.innerHTML = ``;
		reader.readAsBinaryString(file);
		reader.onloadend = function(){
			textParsed = JSON.parse(reader.result);
			textString = JSON.stringify(textParsed, null, 4);
		    contentArea.innerHTML += `<label for="editor">${file.name}</label><br>`;
			contentArea.innerHTML += `<textarea id="editor" name="editor">${textString}</textarea><br><br>`;
		}
	fileElement = ``;
}

function clearArea(){
	const row = document.getElementById("tab_header");
	row.innerHTML = ``;

	const tableBody = document.getElementById("tab_body");
	tableBody.innerHTML = ``;
}

function saveFile(){
	try{
		const text = document.getElementById('editor').value;
		const parsedText = JSON.parse(text);
		const textString = JSON.stringify(parsedText, null, 4);
		const blob = new Blob([textString], {type: "application/json"});
	    const url = URL.createObjectURL(blob);
	    let link = document.createElement('a');
	    link.download = `modified_${file.name}`;
	    link.href = url;
	    link.click();
	}
	catch(throw_error){
		alert(throw_error.message);
	}	
}