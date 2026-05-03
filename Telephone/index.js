const Telephone = require("./telephone");
const Observer = require("./observer");

// Create a new Telephone instance
const telephone = new Telephone();

// ---- Create Observers ----

// Observer 1: Simply prints the phone number
const printPhoneNumberObserver = new Observer("PrintPhoneNumber", (phoneNumber) => {
  console.log(phoneNumber);
});

// Observer 2: Prints "Now Dialling <phoneNumber>"
const nowDiallingObserver = new Observer("NowDialling", (phoneNumber) => {
  console.log(`Now Dialling ${phoneNumber}`);
});

// ---- Register Observers with the Telephone ----
telephone.AddObserver(printPhoneNumberObserver);
telephone.AddObserver(nowDiallingObserver);

// ---- Demonstrate the Telephone ----

// Add phone numbers
telephone.AddPhoneNumber("2347023232");
telephone.AddPhoneNumber("08012345678");

console.log("\n--- Dialing a valid number ---");
telephone.DialPhoneNumber("2347023232");

console.log("\n--- Dialing an unregistered number ---");
telephone.DialPhoneNumber("9999999999");

console.log("\n--- Removing a number then dialling it ---");
telephone.RemovePhoneNumber("08012345678");
telephone.DialPhoneNumber("08012345678");
