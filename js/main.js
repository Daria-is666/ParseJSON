//загрузка
function readFile(input) {
  let jsonFile;
  let file = input.files[0];
  let reader = new FileReader();  
  reader.readAsText(file);
  
  reader.onload = function() {

      jsonFile = JSON.parse(reader.result);
      setData(jsonFile);
      console.log(jsonFile);            
    };
  reader.onerror = function() {
     console.log(reader.error);
  };
}

// //body  
function setData({name,fields,references,buttons}){
  document.body.insertAdjacentHTML('afterend', `
    <h1 id="name">${name}</h1>
    <div id="fields">${setFields(fields)}</div>
    <div id = "references" >${setReferences(references)}</div>
    <div id = "buttons" >${setButtons(buttons)}</div>
  `)
  //проверка на наличие ключей 
  if(name == undefined)
      document.getElementById('name').remove();
  if(fields == undefined)
      document.getElementById('fields').remove();
  if(references == undefined)
      document.getElementById('references').remove();
  if(buttons == undefined)
      document.getElementById('buttons').remove();
  
}

// //fields
function setFields(fields){
   let field =  fields.map(
    (elem) => `
    ${setLabel(elem.label)}
    <input id = "inputStyle" type = ${elem.input.type} required = true ${setOtherInputParams(elem.input)}></input>
  `);
        
    return field;
}

function setLabel(label) {
  if(label != undefined)
    return `<label id="lableFields">${label}</label>  `;
  else
    return ``;
}

function setOtherInputParams(elem) {
  if(elem.mask != undefined){
      // return `pattern = ${elem.mask}`;
     $("#inputStyle").mask(`${elem.mask}`);
  }
  if(elem.placeholder != undefined){
    return `placeholder = ${elem.placeholder}`;
  }
  if(elem.multiple != undefined){
    return `multiple = ${elem.multiple}`;
  }
  if(elem.filetype != undefined){
     return `filetype = ${elem.filetype}`;
  }
  if(elem.checked != undefined){
    return `checked = ${elem.checked}`;
 }
}

// // references
function setReferences(references) {

if(references!= undefined)
{
  return references.map(
    (elem) => `
     ${setReferencesInput(elem.input)}
     ${setReferencesText(elem["text without ref"],elem.text,elem.ref)}     
  `);
}  
}

function setReferencesInput(input) {
  if(input != undefined)
    return `<input id = "inputStyle" type = ${input.type} required = true ${setOtherInputParams(input)}></input>`;
  else
    return ``;
}

function setReferencesText (textWith,text, ref) {
if(textWith!= undefined && text != undefined && ref != undefined)
  return `<a ref=${ref}>${text}</a>
  <h>${textWith}</h>`;
else
  return ``;
}


function convertToString(text) {
    if(text instanceof String){
      console.log(text);
      let ConvertedText = text.replace(/,/, "");
      return ConvertedText;
    }
   
}


//buttons
function setButtons(buttons) {
  if(buttons != undefined){
    return buttons.map(
      (elem) => `
      <a href="${elem.ref}" >${elem.text}</a>
      `);
  }
}
  
