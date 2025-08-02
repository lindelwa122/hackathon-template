class PlaceSerializer {
  constructor(Place) {
    this.returnValue = {
      id: Place._id,
      name: Place.name,
      location: Place.location,
      arrival: Place.arrival,
      departure: Place.departure,
      created_at: Place.created_at,
      updated_at: Place.updated_at,
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

module.exports = PlaceSerializer;
