// Telephone class implementing the Observer pattern
class Telephone {
  constructor() {
    this.phoneNumbers = [];
    this.observers = [];
  }

  // ---- Phone Number Management ----

  // Add a new phone number to the list
  AddPhoneNumber(phoneNumber) {
    if (!this.phoneNumbers.includes(phoneNumber)) {
      this.phoneNumbers.push(phoneNumber);
      console.log(`Phone number ${phoneNumber} added.`);
    } else {
      console.log(`Phone number ${phoneNumber} already exists.`);
    }
  }

  // Remove a phone number from the list
  RemovePhoneNumber(phoneNumber) {
    const index = this.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.phoneNumbers.splice(index, 1);
      console.log(`Phone number ${phoneNumber} removed.`);
    } else {
      console.log(`Phone number ${phoneNumber} not found.`);
    }
  }

  // Dial a phone number (only if it has been added) and notify observers
  DialPhoneNumber(phoneNumber) {
    if (this.phoneNumbers.includes(phoneNumber)) {
      console.log(`Dialing ${phoneNumber}...`);
      this.NotifyObservers(phoneNumber);
    } else {
      console.log(
        `Cannot dial ${phoneNumber} — number has not been added to the telephone.`
      );
    }
  }

  // ---- Observer Pattern Methods ----

  // Add an observer
  AddObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  // Remove an observer
  RemoveObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all observers with the given phone number
  NotifyObservers(phoneNumber) {
    for (const observer of this.observers) {
      observer.notify(phoneNumber);
    }
  }
}

module.exports = Telephone;
