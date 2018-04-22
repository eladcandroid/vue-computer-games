function store(key, any) {
  console.log('store', key, any);
  localStorage[key] = JSON.stringify(any);
  return Promise.resolve();
}

function load(key) {
  return axios.get(
    'http://www.json-generator.com/api/json/get/cdYSuCPuUO?indent=2'
  );
}

export default {
  store,
  load
};
