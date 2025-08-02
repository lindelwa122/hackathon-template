class AlertsSerializer {
  constructor(alerts) {
    this.alerts = Array.isArray(alerts) ? alerts : [alerts]; // supports single or multiple
  }

  serialize(alert) {
    return {
      id: alert._id,
      title: alert.title,
      message: alert.message,
      status: alert.status,
      timestamp: alert.timestamp.toISOString(),
      user: alert.user_id instanceof Object ? alert.user_id._id : alert.user_id,
    };
  }

  getJSON() {
    return this.alerts.map(alert => this.serialize(alert));
  }
}

module.exports = AlertsSerializer;
