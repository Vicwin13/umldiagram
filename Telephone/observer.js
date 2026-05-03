// Observer class that gets notified by the Telephone when a number is dialed
class Observer {
  constructor(name, onNotify) {
    this.name = name;
    this.onNotify = onNotify;
  }

  // Method called by the Telephone class to notify this observer
  notify(phoneNumber) {
    this.onNotify(phoneNumber);
  }
}

module.exports = Observer;
