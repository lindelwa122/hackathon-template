class PlaceSerializer {
  constructor(places) {
    this.places = Array.isArray(places) ? places : [places];
  }

  serialize(place) {
    return {
      id: place._id,
      name: place.name,
      coordinates: {
        lat: place.latitude,
        lng: place.longitude
      },
      description: place.description || null,
      createdAt: place.createdAt?.toISOString?.() || null,
      user: place.user_id instanceof Object ? place.user_id._id : place.user_id
    };
  }

  getJSON() {
    return this.places.map(place => this.serialize(place));
  }
}

module.exports = PlaceSerializer;
