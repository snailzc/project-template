export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function moment(timestamps = null) {
  const d = timestamps ? new Date(timestamps) : new Date();
  const [year, month, day, hour, minute, second] = [
    d.getFullYear(),
    d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : `0${d.getMonth() + 1}`,
    d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`,
    d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`,
    d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`,
    d.getSeconds() >= 10 ? d.getSeconds() : `0${d.getSeconds()}`,
  ];

  return {
    format(patterns = 'YYYY-MM-DD HH:mm:SS') {
      return patterns
        .replace(/YYYY/g, year)
        .replace(/MM/g, month)
        .replace(/DD/g, day)
        .replace(/HH/g, hour)
        .replace(/mm/g, minute)
        .replace(/SS/g, second);
    },
  };
}

/**
 * @description 格式化人民币 eg:10000 => 10,000.00
 * @param {*} money
 */
export function formatMoney(money, decimal = 2) {
  if (Number(money) === 0 || Number.isNaN(Number(money))) return '0.00';
  return Number(money)
    .toFixed(decimal)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function convertData(data = []) {
  const res = [];
  for (const item of data) {
    const geoCoord = geoCoordMap[item.name];
    if (geoCoord) {
      res.push({
        name: item.name,
        value: geoCoord.concat(item.value),
        // visualMap: false,
      });
    }
  }
  return res;
}

export const geoCoordMap = {
  上海: [119.1803, 31.2891],
  福建: [119.4543, 25.9222],
  重庆: [108.384366, 30.439702],
  北京: [116.4551, 40.2539],
  辽宁: [123.1238, 42.1216],
  河北: [114.4995, 38.1006],
  天津: [117.4219, 39.4189],
  山西: [112.3352, 37.9413],
  陕西: [109.1162, 34.2004],
  甘肃: [103.5901, 36.3043],
  宁夏: [106.3586, 38.1775],
  青海: [101.4038, 36.8207],
  新疆: [87.9236, 43.5883],
  西藏: [91.11, 29.97],
  四川: [103.9526, 30.7617],
  吉林: [125.8154, 44.2584],
  山东: [117.1582, 36.8701],
  河南: [113.4668, 34.6234],
  江苏: [118.8062, 31.9208],
  安徽: [117.29, 32.0581],
  湖北: [114.3896, 30.6628],
  浙江: [119.5313, 29.8773],
  内蒙古: [110.3467, 41.4899],
  江西: [116.0046, 28.6633],
  湖南: [113.0823, 28.2568],
  贵州: [106.6992, 26.7682],
  云南: [102.9199, 25.4663],
  广东: [113.12244, 23.009505],
  广西: [108.479, 23.1152],
  海南: [110.3893, 19.8516],
  黑龙江: [127.9688, 45.368],
  台湾: [121.4648, 25.563],
  南海诸岛: [114.252615, 15.86029]
};

export function searlizeMenu(menuList) {
  const resultMenu = [];
  const menuAll = (data) => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      resultMenu.push(node);
      if (node.children && node.children.length) {
        menuAll(node.children);
      }
    }
  };
  const localMenu = menuList || localStorage.menu ? JSON.parse(localStorage.menu) : [];
  menuAll(localMenu);
  return resultMenu;
}

export function resetLocal() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('antd-pro-authority');
  localStorage.removeItem('info');
  localStorage.removeItem('menu');
  localStorage.removeItem('leftSeconds');
  localStorage.removeItem('routerData');
  localStorage.removeItem('bytes');
}

export function getConfigElement(pageName) {
  if (localStorage.info && localStorage.info !== 'undefined') {
    const elements = JSON.parse(localStorage.info);
    const pageElement = {};
    if (elements.status === 2100003) {
      this.resetLocal();
      window.location.reload();
    } else if (elements && !elements.elements) {
      this.resetLocal();
      window.location.reload();
    } else {
      elements.elements.forEach((item) => {
        if (item.code.split(':')[0] === pageName) {
          pageElement[item.code.split(':')[1]] = item;
        }
      });
      return pageElement;
    }
  } else {
    return {};
  }
}
export function FETCH_ENV() {
  const envir = process.env.API_ENV;
  if (envir === 'pro') {
    // 正式环境
    return 'https://passport.imuyuan.com/cas/login?service=';
  } else {
    // 测试版本
    return 'https://passport-test.imuyuan.com:8443/cas/login?service=';
  }
}

// 数组去重，替代Array.form();
export function uniqueArray(arr) {
  const list = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (list.indexOf(arr[i]) === -1) {
      list.push(arr[i]);
    }
  }
  return list;
}
