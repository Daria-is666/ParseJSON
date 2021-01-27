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

//body  
function setData({name,fields,references,buttons}){
  document.body.insertAdjacentHTML('afterend', `
    <h1>${name}</h1>
    <div class="data">${setFields(fields)}</div>
    <div id = "references" >${setButtons(references)}</div>
    <div id = "buttons" >${setButtons(buttons)}</div>
  `)
  if(references == undefined)
      document.getElementById('references').remove();
  if(buttons == undefined)
      document.getElementById('buttons').remove();
}

//field
function setFields(fields){
  return fields.map(
    (elem) => `
   <label>${elem.label}</label>  
  <input id = "inputStyle" type = ${elem.input.type} required = true ${setOtherInputParams(elem.input)}></input>
  `);
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
}

//references
function setReferences(references) {
  if(references != undefined){
    return references.map(
      (elem) => `
      <a href="${elem.ref}" class="controlBtn">${elem.text}</a>
      `);
  }
  
}


//buttons
function setButtons(buttons) {
  if(buttons != undefined){
    return buttons.map(
      (elem) => `
      <a href="${elem.ref}" class="controlBtn">${elem.text}</a>
      `);
  }
}
  
