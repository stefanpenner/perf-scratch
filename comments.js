function hashTree (fullPath) {
  // This function is used by the watcher. It makes the following guarantees:
  //
  // (1) It never throws an exception.
  //
  // (2) It does not miss changes. In other words, if after this function returns,
  // any part of the directory hierarchy changes, a subsequent call must
  // return a different hash.
  //
  // (1) and (2) hold even in the face of a constantly-changing file system.
  return hashStrings(keysForTree(fullPath))
}


function hashStrings(a) {
  // This function is used by the watcher. It makes the following guarantees:
  //
  // (1) It never throws an exception.
  //
  // (2) It does not miss changes. In other words, if after this function returns,
  // any part of the directory hierarchy changes, a subsequent call must
  // return a different hash.
  //
  // (1) and (2) hold even in the face of a constantly-changing file system.
}

function keysForTree(a) {

  // This function is used by the watcher. It makes the following guarantees:
  //
  // (1) It never throws an exception.
  //
  // (2) It does not miss changes. In other words, if after this function returns,
  // any part of the directory hierarchy changes, a subsequent call must
  // return a different hash.
  //
  // (1) and (2) hold even in the face of a constantly-changing file system.
}

while(true) {
  hashTree('');
}
