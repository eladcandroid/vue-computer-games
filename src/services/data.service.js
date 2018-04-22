// import utilService from './util.service.js'

import storageService from './storage.service.js';
// import storageService from './request.service.js';

const KEY = 'dataAppKey';

export default {
  query(filter = null, search = null) {
    let retData = [];
    // for axio
    // return storageService.load(KEY).then(({ data }) => {
    return storageService.load(KEY).then(data => {
      retData = data ? [...data] : [];
      if (!retData || retData.length === 0) {
        return (retData = this.generateData());
      }
      if (filter && filter.value) {
        retData = retData.filter(item => item[filter.prop] === filter.value);
      }
      if (search && search.value) {
        retData = retData.filter(item => {
          console.log('search.prop', item[search.prop]);
          return (
            item[search.prop]
              .toLowerCase()
              .indexOf(search.value.toLowerCase()) > -1
          );
        });
      }
      return retData;
    });
  },

  storeData(data) {
    return storageService.store(KEY, data);
  },

  getById(itemId) {
    return storageService.load(KEY).then(data => {
      return data.find(item => item.id === itemId);
    });
  },

  removeItem(itemId) {
    return storageService.load(KEY).then(data => {
      var itemIdx = data.findIndex(data => data.id === itemId);
      data.splice(itemIdx, 1);
      return storageService.store(KEY, data);
    });
  },

  saveItem(item) {
    return storageService.load(KEY).then(data => {
      if (item.id) {
        var itemIdx = data.findIndex(currItem => currItem.id === item.id);
        data.splice(itemIdx, 1, item);
      } else {
        item.id = Date.now();
        data.push(item);
      }
      return storageService.store(KEY, data);
    });
  },

  generateData() {
    console.log('generateData');

    const data = [
      {
        id: 1,
        title: 'Sam & Max Hit the Road',
        type: 'Quest',
        image:
          'https://static.giantbomb.com/uploads/scale_small/0/4938/609065-hit_the_road_box_front_6498x8205.jpg',
        price: 20
      },
      {
        id: 2,
        title: "Monkey Island 2: LeChuck's Revenge",
        type: 'Quest',
        image:
          'https://static.giantbomb.com/uploads/scale_small/0/24/379393-1216513843243.jpg',
        price: 20
      },
      {
        id: 3,
        title: 'Grim Fandango',
        type: 'Quest',
        image:
          'https://static.giantbomb.com/uploads/scale_small/0/595/2660822-gffinal+candidate.jpg',
        price: 20
      },
      {
        id: 4,
        title: 'Simon the Sorcerer',
        type: 'Quest',
        image:
          'https://static.giantbomb.com/uploads/scale_small/7/73970/1409362-simonthesorcerer_front.jpg',
        price: 20
      },
      {
        id: 5,
        title: 'Unreal Tournament',
        type: 'Shooting',
        image:
          'https://static.giantbomb.com/uploads/scale_small/8/87790/3011753-box_ut.png',
        price: 20
      },
      {
        id: 6,
        title: 'Command & Conquer: Red Alert',
        type: 'Strategy',
        image:
          'https://static.giantbomb.com/uploads/scale_small/0/2130/637220-ra.jpg',
        price: 20
      }
    ];

    this.storeData(data);

    return data;
  }
};
