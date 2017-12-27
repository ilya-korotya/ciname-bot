module.exports = {

  logStart() {
    console.log('Bot - started!');
  },

  getUserInd(msg) {
    return msg.chat.id;
  },

  getDistanceToCinema(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return Math.round(d);
  },

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  },


  getMountToInt(filmData) {
    const stringMount = this.getMountFromData(filmData)[0];
    return mountList.indexOf(stringMount.toLowerCase()) + 1;
  },

  getMountFromData(filmData) {
    return filmData.match(/[a-zA-z]+/);
  }

};

const mountList = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept' , 'oct', 'nov', 'dec'];
