//загрузка

let count;

function readFile(input) {
  count = 1;
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

//body  
function setData({name,fields,references,buttons}){
  document.body.insertAdjacentHTML('afterend', `
  <div id="intro">
    <h1 id="name">${name}</h1>
    <div id="fields"><!--${setFields(fields)}--></div>
    <div id = "references"><!--${setReferences(references)}--></div>
    <div id = "buttons" ><!--${setButtons(buttons)}--></div>
  </div>
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

  setTimeout(() => {
    count = 1;
    setMasks(fields);
  }, 100);
}

// masked
function setMasks(fields) {
  fields.map(function (elem) {
    if(elem.input != undefined && elem.input.mask!=undefined){
      if($(`#${count}`).attr('id') == count){
          $(`#${count}`).mask(`${elem.input.mask}`);
          count++;
      }          
    }
  });
}

//fields
function setFields(fields){
   let field =  fields.map(
    (elem) => `--><div id = "fieldsBlock">
    ${setLabel(elem.label)}
    ${setInput(elem.input)} </div><!--
    
  `);      
    return field; 
}

// label
function setLabel(label) {
  if(label != undefined)

    return `<label id="labelFields">${label}</label>  `;
  else
    return ``;
}
// input
function setInput(input) {
  if(input.type != "technology")
  {
    return `<input class=inputFields type = ${setInputType(input)} required = true ${setOtherInputParams(input)}></input>`
    
  }
  if(input.type == "technology")
  {
    return `<p><select multiple id = "selectFields">
    ${setTechnologyParam(input.technologies)}
    </select></p>`;
  }  
}
// select
function setTechnologyParam(technologies) {
  let options;
  for (let i = 0; i < technologies.length; i++) {
      options +=`<option value= "s1">${technologies[i]}</option>`; 
  }
 return options;
  
}
function setInputType(input) {
    if(input.mask != undefined){
      let inputId = `tel id = "${count}"`;
      count++;
      return inputId;
    }
    else{
      return input.type;
    }

}
function setOtherInputParams(input) {
  if(input.placeholder != undefined){
    let placeholderStr=JSON.stringify(input.placeholder);
    return `placeholder = ${placeholderStr}`;
  }
  if(input.multiple != undefined){
    return `multiple = ${input.multiple}`;
  }
  if(input.filetype != undefined){
     return `filetype = ${input.filetype}`;
  }
  if(input.checked != undefined){
    return `checked = ${input.checked}`;
 }
}


// references
function setReferences(references) {
if(references!= undefined)
{
  return references.map(
    (elem) => `--><div id = "referencesBlock">
     ${setReferencesInput(elem.input)}
     ${setReferencesText(elem["text without ref"],elem.text,elem.ref)}</div><!--    
  `);
}  
}
// input references
function setReferencesInput(input) {
  if(input != undefined)
    return `<input id = "inputReferences" type = ${input.type} required = true ${setOtherInputParams(input)}></input>`;
  else
    return ``;
}
// link references
function setReferencesText (textWith,text, ref) {
if(textWith!= undefined && text != undefined && ref != undefined)
  return `<h id = "textWithRef">${textWith}</h>
  <a ref=${ref} id = "linkReferences">${text}</a>`;
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
      --><div id = "buttonBlock"><a href="${elem.ref}" id = "linkButton" >${elem.text}</a></div><!--
      `);
  }
}

