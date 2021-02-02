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

  setTimeout(() => {alert();
    // if(fields.input != undefined){
      
    //   if(fields.input.mask!= undefined){
    //     $(".inputStyle").mask(`${fields.input.mask}`);
        
    //   }
    // }
    setMasks(fields);
  }, 100);
}

function setMasks(fields) {
  fields.map(function (elem) {
    if(elem.input != undefined){
        if(elem.input.mask!=undefined){
          let id = elem.input.mask;
          if(id.includes("+")){
            id = id.replace(/[+]/, "");
            id = id.replace(/[\])}[{(]/g, "");
          }
          console.log(`id=${id}`);
          // console.log(`mask=${elem.input.mask}`);
          let element = $(`#${id}`).attr('id');
          console.log(element);
          // if($("#").attr('id') == id){
          //   $("#id .inputStyle").mask(`${id}`);
          // }
          
        }
    }
  });
}

//fields
function setFields(fields){
  // let inputString = JSON.stringify(fields.input);
  // inputString = inputString.replace(/,/g, "");

   let field =  fields.map(
    (elem) => `--><div id = "fieldsBlock">
    ${setLabel(elem.label)}
    ${setInput(elem.input)} </div><!--
    
  `);      
    return field;
    
}

// function setDataFields(fields) {
//   for (var i in fields) {
//   var output = "<h1>Исполнители</h1>";
//    output += "<ul>";
//   for (var j in fields[i].input) {
//     // console.log(fields.input);
//     output +=  `<input id = "inputStyle" type = ${setInputType(fields[i].input[j])} required = true placeholder=${fields[i].input[j].placeholderStr} ${setOtherInputParams(fields[i].input[j])}></input>`
//   }
// }
//   output += "<ul>";
//   document.getElementById("inputList").innerHTML=output;  
// }
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
    return `<input id = "inputFields" type = ${setInputType(input)} required = true ${setOtherInputParams(input)}></input>`
    
  }
  if(input.type == "technology")
  {
    return `<p><select multiple id = "selectFields">
    ${setTechnologyParam(input.technologies)}
    </select></p>`;
  }  
}
function setTechnologyParam(technologies) {
  let options;
  for (let i = 0; i < technologies.length; i++) {
      options +=`<option value= "s1">${technologies[i]}</option>`; 
  }
 return options;
  
}
function setInputType(input) {
    if(input.mask != undefined){
      let phoneMask = input.mask;
      if(phoneMask.includes("+")){
        phoneMask = phoneMask.replace(/[+]/, "");
        phoneMask = phoneMask.replace(/[\])}[{(]/g, "");
      }      
      return `tel id = "${phoneMask}"`;
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
// select


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
// $(document).ready(function(){
//     let elem = $("#(s").attr('id');
//     console.log(elem);
// });
