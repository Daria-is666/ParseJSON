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

  // setTimeout(() => {alert();
  //   // if(fields.input != undefined){
      
  //   //   if(fields.input.mask!= undefined){
  //   //     $(".inputStyle").mask(`${fields.input.mask}`);
        
  //   //   }
  //   // }
  //   setMasks(fields);
  // }, 100);
}

// function setMasks(fields) {
//   fields.map(function (elem) {
//     if(elem.input != undefined){
//         if(elem.input.mask!=undefined){
//           let id = elem.input.mask;
//           if(id.includes("+")){
//             id = id.replace(/[+]/, "");
//             id = id.replace(/[\])}[{(]/g, "");
//           }
//           console.log(`id=${id}`);
//           // console.log(`mask=${elem.input.mask}`);
//           let element = $(`#${id}`).attr('id');
//           console.log(element);
//           // if($("#").attr('id') == id){
//           //   $("#id .inputStyle").mask(`${id}`);
//           // }
          
//         }
//     }
//   });
// }

// //fields
function setFields(fields){
   let field =  fields.map(
    (elem) => `
    ${setLabel(elem.label)}
    <input class = inputStyle type = ${setInputType(elem.input)} required = true ${setOtherInputParams(elem.input)}></input>
  `);      
    return field;
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

function setLabel(label) {
  if(label != undefined)

    return `<label id="lableFields">${label}</label>  `;
  else
    return ``;
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
 let inputStr=JSON.stringify(input);
 inputStr = inputStr.replace(/[,]/, "");
 input=JSON.parse(inputStr);

}

function setInputPlaceholder(placeholder) {
  
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
    return `<input class = inputStyle type = ${input.type} required = true ${setOtherInputParams(input)}></input>`;
  else
    return ``;
}

function setReferencesText (textWith,text, ref) {
if(textWith!= undefined && text != undefined && ref != undefined)
  return `<h>${textWith}</h>
  <a ref=${ref}>${text}</a>`;
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
// $(document).ready(function(){
//     let elem = $("#(s").attr('id');
//     console.log(elem);
// });
