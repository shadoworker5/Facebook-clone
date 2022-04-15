import idb from './db';

var dbPromise = idb.open('store_item', 1, function (db) {
    if (!db.objectStoreNames.contains('cards')) {
      db.createObjectStore('cards', {keyPath: 'id'});
    }
    // if (!db.objectStoreNames.contains('sync-posts')) {
    //   db.createObjectStore('sync-posts', {keyPath: 'id'});
    // }
});
  
export function writeData(st, data) {
    return dbPromise.then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
        });
}
  
export function readAllData(st) {
    return dbPromise.then(function(db) {
        var tx = db.transaction(st, 'readonly');
        var store = tx.objectStore(st);
        return store.getAll();
    });
}

export function readData(table, post_id){
    return dbPromise.then(function(db) {
        let request = db.transaction(table, 'readonly');
        let store = request.objectStore(table);
		return store.get(post_id);
    });
}
  
export function clearAllData(st) {
    return dbPromise.then(function(db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.clear();
        return tx.complete;
    });
}
  
export function deleteItemFromData(st, id){
    dbPromise.then(function(db) {
        var tx = db.transaction(st, 'readwrite');
        var store = tx.objectStore(st);
        store.delete(id);
        return tx.complete;
      }).then(function() {
        console.log('Item deleted!');
    });
}
  
export function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}