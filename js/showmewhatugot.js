  


db.changes({
    since: 'now',
    live: true
  }).on('change', showPjsheet);

  function showPjsheet() {
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
      redrawPjsheetUI(doc.rows);
    });
  }


//CHEKCTHIS AGAIN
  function checkboxChanged(todo, event) {
    todo.completed = event.target.checked;
    db.put(todo);
  }
//NEED?!

//Only Achivate should be possible
  function deleteButtonPressed(todo) {
    db.remove(todo);
  };
//DONT REMOVE, BUT MOVE INTO: OLDPJSHEETS OSMTH

//IDUNNO
  // The input box when editing a todo has blurred, we should save
  // the new title or delete the todo if the title is empty
  function todoBlurred(todo, event) {
    var trimmedText = event.target.value.trim();
    if (!trimmedText) {
      db.remove(todo);
    } else {
      todo.title = trimmedText;
      db.put(todo);
    }
  }

  // Initialise a sync with the remote server
  function sync() {
    syncDom.setAttribute('data-sync-state', 'syncing');
    var opts = {live: true};
    db.sync(remoteCouch, opts, syncError);
  }
    
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }