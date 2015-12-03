(function() {

  'use strict'; // <-- was ist das?
    
  var newCatNoCDDom = document.getElementById('CatNoCD');
  var newEingangDom = document.getElementById('Eingang');
  var newCatNoLPDom = document.getElementById('CatNoLP');
  var newFertigstellungDom = document.getElementById('Fertigstellung');
  var newCatNoMxDom = document.getElementById('CatNoMx');
  var newArtist_titelDom = document.getElementById('Artist_titel');
  var newLableClientDom = document.getElementById('LableClient');
  var newSubmitDom = document.getElementById('submitbutton');

    
  var syncDom = document.getElementById('sync-wrapper');


  var db = new PouchDB('pjsheets');
  var remoteCouch = 'http://localhost:5984/pjsheets';
    
  function addPjsheet(VCatNoCD,VEingang,VCatNoLP,VFertigstellung,VCatNoMx,VArtist_titel,VLableClient) {
    var pjsheet = {
      _id: new Date().toISOString(), //_id reserved //primkey 
      CatNoCD: VCatNoCD,
      Eingang: VEingang,
      Engineer: $('#Engineer').val(),
      CatNoLP: VCatNoLP,
      Fertigstellung: VFertigstellung,
      Projektordner: $('#Projektordner').val(),
      CatNoMx: VCatNoMx,
      MON: MON.checked,
      PMX: PMX.checked,
      Artist_titel: VArtist_titel,
      LableClient: VLableClient
    };
      
    db.put(pjsheet).then(function(result){
      console.log("Alles ist gut gelaufen!");
      console.log(result);
       Materialize.toast('Projektsheet erfolgreich eingefügt', 4000)

    }).catch(function(err){
      console.log("FehlerCode: #1");
      console.log(err);
    });
  }


  // User has double clicked a todo, display an input so they can edit the title
  function todoDblClicked(todo) {
    var div = document.getElementById('li_' + todo._id);
    var inputEditTodo = document.getElementById('input_' + todo._id);
    div.className = 'editing';
    inputEditTodo.focus();
  }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  function todoKeyPressed(todo, event) {
    if (event.keyCode === ENTER_KEY) {
      var inputEditTodo = document.getElementById('input_' + todo._id);
      inputEditTodo.blur();
    }
  }

  // Given an object representing a todo, this will create a list item
  // to display it.
  function createTodoListItem(todo) {
    var checkbox = document.createElement('input');
    checkbox.className = 'toggle';
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', checkboxChanged.bind(this, todo));

    var label = document.createElement('label');
    label.appendChild( document.createTextNode(todo.title));
    label.addEventListener('dblclick', todoDblClicked.bind(this, todo));

    var deleteLink = document.createElement('button');
    deleteLink.className = 'destroy';
    deleteLink.addEventListener( 'click', deleteButtonPressed.bind(this, todo));

    var divDisplay = document.createElement('div');
    divDisplay.className = 'view';
    divDisplay.appendChild(checkbox);
    divDisplay.appendChild(label);
    divDisplay.appendChild(deleteLink);

    var inputEditTodo = document.createElement('input');
    inputEditTodo.id = 'input_' + todo._id;
    inputEditTodo.className = 'edit';
    inputEditTodo.value = todo.title;
    inputEditTodo.addEventListener('keypress', todoKeyPressed.bind(this, todo));
    inputEditTodo.addEventListener('blur', todoBlurred.bind(this, todo));

    var li = document.createElement('li');
    li.id = 'li_' + todo._id;
    li.appendChild(divDisplay);
    li.appendChild(inputEditTodo);

    if (todo.completed) {
      li.className += 'complete';
      checkbox.checked = true;
    }

    return li;
  }

  function redrawPjsheetUI(todos) {
    var ul = document.getElementById('todo-list');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }

  function newTodoKeyPressHandler( event ) {
      addPjsheet(newCatNoCDDom.value,newEingangDom.value,newCatNoLPDom.value,newFertigstellungDom.value,newCatNoMxDom.value,newArtist_titelDom.value,newLableClientDom.value);
      newCatNoCDDom.value = '';
      newEingangDom.value = '';
      $('#Engineer').val('');
      newCatNoLPDom.value = '';
      newFertigstellungDom.value = '';
      $('#Projektordner').val('');
      newCatNoMxDom.value = '';
      newArtist_titelDom.value = '';
      newLableClientDom.value = '';
      MON.checked=false;
      PMX.checked=false;
  }

  function addEventListeners() {
    newSubmitDom.addEventListener('click', newTodoKeyPressHandler, false);
  }

  addEventListeners();
  showPjsheet();

  if (remoteCouch) {
    sync();
  }

})();
