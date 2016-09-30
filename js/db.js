var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
var db;
var request = window.indexedDB.open("myDB.db",2);

request.onsuccess = function (event){
  db = event.target.result;
  console.log("DB loaded successfully");
};

request.onerror = function (event){
    console.log("DB do not loaded successfully");
};

request.onupgradeneeded = function (event){
  db = event.target.result;
  console.log("DB initialized / created");
  db.createObjectStore("nameTbl",{keyPath:"itemId", autoIncrement:true});
};


function addToDo(){
  var n = ReactDOM.findDOMNode(this.refs.toDoInput).value;

  var transaction = db.transaction(["nameTbl"],"readwrite");
  var objectStore = transaction.objectStore("nameTbl");
  var request = objectStore.add({stuName:n});
  request.onsuccess(function (event){
    var result = event.target.result;
    console.log(result);
  });
}
