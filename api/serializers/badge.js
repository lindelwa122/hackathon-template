class BadgeSerializer {
  constructor(Badge) {
    this.returnValue = {
      id: Badge._id,
      type: Badge.type,
      description: Badge.description,
      image: Badge.image,
    };
  }

  exclude (keys) {
    const keysArr = keys.split(' ');
    for (const key of keysArr) {
      delete this.returnValue[key];
    }
  }

  include (keys) {
    const keysArr = keys.split(' ');
    for (const [key, _] of Object.entries(this.returnValue)) {
      if (!keysArr.includes(key)) {
        delete this.returnValue[key];
      }
    }
  }

  getJSON () {
    return this.returnValue;
  }
}

module.exports = BadgeSerializer;
