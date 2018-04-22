function store(key, any) {
  console.log('store', key, any);
  localStorage[key] = JSON.stringify(any);
  return Promise.resolve();
}

function load(key) {
  var str = localStorage[key] || 'null';
  return Promise.resolve(JSON.parse(str));
}

export default {
  store,
  load
};
