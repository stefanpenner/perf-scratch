
function throwSometimes(){
  if (Math.random() > 0.9) {
    throw new Error('FOOO');
  }
}

function catcher() {
  try {
    throwSometimes();
  } catch(e) {

  }
}

while(true) {
  catcher();
}
