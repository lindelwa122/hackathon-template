class ProfileSerializer {
  constructor(Profile) {
    this.returnValue = {
      id: Profile._id,
      user_id: Profile.user_id,
      risk_score: Profile.risk_score,
      badges: Profile.badges,
      last_known_location: {
        address: Profile.last_known_location.address,
        badges: Profile.last_known_location.badges,
      }
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

module.exports = ProfileSerializer;
