// ============================================================
// Browser-side JavaScript for the Telephone Observer Pattern
// ============================================================

// ----- Observer Class -----
class Observer {
  constructor(name, onNotify) {
    this.name = name;
    this.onNotify = onNotify;
  }

  notify(phoneNumber) {
    this.onNotify(phoneNumber);
  }
}

// ----- Telephone Class -----
class Telephone {
  constructor() {
    this.phoneNumbers = [];
    this.observers = [];
  }

  AddPhoneNumber(phoneNumber) {
    if (!this.phoneNumbers.includes(phoneNumber)) {
      this.phoneNumbers.push(phoneNumber);
      addLogEntry(`Phone number ${phoneNumber} added.`, "success");
      renderPhoneBook();
      return true;
    } else {
      addLogEntry(`Phone number ${phoneNumber} already exists.`, "warning");
      return false;
    }
  }

  RemovePhoneNumber(phoneNumber) {
    const index = this.phoneNumbers.indexOf(phoneNumber);
    if (index !== -1) {
      this.phoneNumbers.splice(index, 1);
      addLogEntry(`Phone number ${phoneNumber} removed.`, "error");
      renderPhoneBook();
      return true;
    } else {
      addLogEntry(`Phone number ${phoneNumber} not found.`, "warning");
      return false;
    }
  }

  DialPhoneNumber(phoneNumber) {
    if (this.phoneNumbers.includes(phoneNumber)) {
      addLogEntry(`Dialing ${phoneNumber}...`, "info");
      this.NotifyObservers(phoneNumber);
    } else {
      addLogEntry(
        `Cannot dial ${phoneNumber} — number has not been added.`,
        "error"
      );
    }
  }

  AddObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  RemoveObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  NotifyObservers(phoneNumber) {
    for (const observer of this.observers) {
      observer.notify(phoneNumber);
    }
  }
}

// ============================================================
// UI Logic
// ============================================================

const telephone = new Telephone();

// Create two observers as required
const printPhoneNumberObserver = new Observer("PrintPhoneNumber", (phoneNumber) => {
  addLogEntry(phoneNumber, "observer-1");
});

const nowDiallingObserver = new Observer("NowDialling", (phoneNumber) => {
  addLogEntry(`Now Dialling ${phoneNumber}`, "observer-2");
});

// Register observers
telephone.AddObserver(printPhoneNumberObserver);
telephone.AddObserver(nowDiallingObserver);

// ----- DOM Elements -----
const phoneInput = document.getElementById("phoneInput");
const btnAdd = document.getElementById("btnAdd");
const btnDial = document.getElementById("btnDial");
const btnRemove = document.getElementById("btnRemove");
const phoneBookList = document.getElementById("phoneBookList");
const activityLog = document.getElementById("activityLog");
const btnClearLog = document.getElementById("btnClearLog");
const keypadKeys = document.querySelectorAll(".key");

// ----- Keypad -----
keypadKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;
    if (value === "clear") {
      phoneInput.value = "";
    } else if (value === "backspace") {
      phoneInput.value = phoneInput.value.slice(0, -1);
    } else {
      phoneInput.value += value;
    }
    phoneInput.focus();
  });
});

// ----- Action Buttons -----
btnAdd.addEventListener("click", () => {
  const number = phoneInput.value.trim();
  if (!number) {
    addLogEntry("Please enter a phone number.", "warning");
    return;
  }
  telephone.AddPhoneNumber(number);
  phoneInput.value = "";
  phoneInput.focus();
});

btnDial.addEventListener("click", () => {
  const number = phoneInput.value.trim();
  if (!number) {
    addLogEntry("Please enter a phone number to dial.", "warning");
    return;
  }
  telephone.DialPhoneNumber(number);
});

btnRemove.addEventListener("click", () => {
  const number = phoneInput.value.trim();
  if (!number) {
    addLogEntry("Please enter a phone number to remove.", "warning");
    return;
  }
  telephone.RemovePhoneNumber(number);
  phoneInput.value = "";
  phoneInput.focus();
});

btnClearLog.addEventListener("click", () => {
  activityLog.innerHTML =
    '<p class="empty-state">No activity yet. Add a number and dial it!</p>';
});

// Allow pressing Enter to add a number
phoneInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btnAdd.click();
  }
});

// ----- Render Phone Book -----
function renderPhoneBook() {
  if (telephone.phoneNumbers.length === 0) {
    phoneBookList.innerHTML =
      '<li class="empty-state">No phone numbers added yet.</li>';
    return;
  }

  phoneBookList.innerHTML = telephone.phoneNumbers
    .map(
      (num) => `
      <li data-number="${num}">
        <span class="number-text">${num}</span>
        <span class="dial-icon">📞</span>
      </li>`
    )
    .join("");

  // Click on a phone book entry to populate the input
  phoneBookList.querySelectorAll("li").forEach((li) => {
    li.addEventListener("click", () => {
      phoneInput.value = li.dataset.number;
      phoneInput.focus();
    });
  });
}

// ----- Activity Log -----
function addLogEntry(message, type) {
  // Remove empty state if present
  const emptyState = activityLog.querySelector(".empty-state");
  if (emptyState) emptyState.remove();

  const entry = document.createElement("div");
  entry.classList.add("log-entry", `log-${type}`);

  const time = new Date().toLocaleTimeString();
  entry.innerHTML = `<span class="log-time">${time}</span>${message}`;

  // Prepend (newest on top)
  activityLog.prepend(entry);
}
