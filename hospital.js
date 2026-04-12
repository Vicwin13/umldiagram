class Person{
    #id;
    #name;
    #age;

    constructor(id, name, age){
        this.#id = id;
        this.#name = name;
        this.#age = age;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }
    get age(){
        return this.#age;
    }

    introduce(){
        console.log(`Hello, I am ${this.#name}, and I am ${this.#age} years old.`);
    }
}





class Patient extends Person{
    #illness;
    static totalPatients = 0;
    constructor(id, name, age, illness) {
        super(id, name, age);
        this.#illness = illness;
        this.appointment = null;
        Patient.totalPatients++;
    }

    get illness(){
        return this.#illness;
    }

    introduce(){
        console.log(`Hello, I am ${this.name}, and I am ${this.age} years old. I am suffering from ${this.illness}.`);
    }
    register(){
        console.log(`Patient ${this.name} registered successfully. With ID ${this.id}`);
    }

    bookAppointment(appointment, doctor){

        appointment.confirm(this, doctor);
        this.appointment = appointment;
    }

  cancelAppointment() {
  if (this.appointment && this.appointment.status === "Confirmed") {
    this.appointment.cancel();
    this.appointment = null;
  } else if (this.appointment && this.appointment.status !== "Confirmed") {
    console.log(`${this.name}'s appointment is not confirmed, nothing to cancel.`);
  } else {
    console.log(`${this.name} has no active appointment to cancel.`);
  }
}

    static getTotalPatients(){
        return Patient.totalPatients;
    }
}

class Doctor extends Person{
    #specialty;
    #availableSlots;
    static totalDoctors = 0;

    constructor(id, name, age, specialty, availableSlots) {
        super(id, name, age);
        this.#specialty = specialty;
        this.#availableSlots = availableSlots;

        Doctor.totalDoctors++;
    }

    get specialty(){
        return this.#specialty;
    }
    get availableSlots(){
        return this.#availableSlots;
    }
    getAvailability(){
        return this.#availableSlots > 0;
    }

    updateSlots(n){
        this.#availableSlots += n;
        console.log(`Doctor ${this.name} now has ${this.#availableSlots} available slots.`);
    }

    cancelSlot(){
        this.#availableSlots++;
        console.log(`Doctor ${this.name} has a slot canceled. Available slots: ${this.#availableSlots}`);
    }

    introduce(){
        console.log(`Hello, I am Dr. ${this.name}. I specialize in ${this.#specialty}. I have ${this.#availableSlots} available slots.`);
    }

    static getTotalDoctors(){
        return Doctor.totalDoctors;
    }

}

class Specialist extends Doctor{
    #consultationFee;
    #hospital;

    constructor(id, name, age, specialty, availableSlots, consultationFee, hospital) {
        super(id, name, age, specialty, availableSlots);
        this.#consultationFee = consultationFee;
        this.#hospital = hospital;
    }

    get consultationFee(){
        return this.#consultationFee;
    }

    get hospital(){
        return this.#hospital;
    }

    introduce(){
        console.log(`Hello, I am Dr. ${this.name}, a specialist in ${this.specialty}. My consultation fee is $${this.consultationFee}. I work at ${this.hospital}.`);
    }
}

class Appointment {
    #appointmentId;
    #status;
    static totalBooked = 0;
    constructor(appointmentId, date){
        this.#appointmentId = appointmentId;
        this.date = date;
        this.patient = null;
        this.doctor = null;
        this.#status = 'Pending';
    }

    get appointmentId(){
        return this.#appointmentId;
    }

    get status(){
        return this.#status;
    }

    confirm(patient, doctor){
        if(doctor.getAvailability()){
            this.patient = patient;
            this.doctor = doctor;
            this.#status = 'Confirmed';
            doctor.updateSlots(-1);
            Appointment.totalBooked++;
            console.log(`Appointment ${this.#appointmentId} confirmed for patient ${patient.name} with doctor ${doctor.name} on ${this.date}.`);
        } else{
            console.log(`Doctor ${doctor.name} is not available on ${this.date}.`);
        }
    }

    cancel(){
        if(this.status === 'Confirmed'){
            this.#status = 'Canceled';
            this.doctor.cancelSlot();
            Appointment.totalBooked--;
            console.log(`Appointment ${this.#appointmentId} has been canceled.`);
        } else {
            console.log('No confirmed appointment to cancel')
        }
    }

    static getTotalBooked(){
        return Appointment.totalBooked;
    }
}


// ==================== CREATE DOCTORS ====================
console.log("========== CREATING DOCTORS ==========");
const doctor1 = new Doctor("DOC001", "Adaeze Okafor", 42, "Cardiology", 10);
const doctor2 = new Doctor("DOC002", "Emeka Nwosu", 38, "General Practice", 5);
const specialist1 = new Specialist("DOC003", "Ifeanyi Chukwu", 50, "Neurosurgery", 3, 500, "Lagos University Teaching Hospital");

console.log(`Created Doctor: ${doctor1.name} | ID: ${doctor1.id} | Age: ${doctor1.age} | Specialty: ${doctor1.specialty} | Available Slots: ${doctor1.availableSlots}`);
console.log(`Created Doctor: ${doctor2.name} | ID: ${doctor2.id} | Age: ${doctor2.age} | Specialty: ${doctor2.specialty} | Available Slots: ${doctor2.availableSlots}`);
console.log(`Created Specialist: ${specialist1.name} | ID: ${specialist1.id} | Age: ${specialist1.age} | Specialty: ${specialist1.specialty} | Fee: $${specialist1.consultationFee} | Hospital: ${specialist1.hospital} | Available Slots: ${specialist1.availableSlots}`);

// ==================== CREATE PATIENTS ====================
console.log("\n========== CREATING & REGISTERING PATIENTS ==========");
const patient1 = new Patient("PAT001", "Chukwuemeka Eze", 34, "Malaria");
const patient2 = new Patient("PAT002", "Ngozi Adeyemi", 28, "Headache");
const patient3 = new Patient("PAT003", "Tunde Balogun", 45, "Back Pain");
const patient4 = new Patient("PAT004", "Amina Bello", 31, "Fracture");

patient1.register();
patient2.register();
patient3.register();
patient4.register();

console.log(`\nPatient Details:`);
console.log(`  ${patient1.name} | ID: ${patient1.id} | Age: ${patient1.age} | Illness: ${patient1.illness}`);
console.log(`  ${patient2.name} | ID: ${patient2.id} | Age: ${patient2.age} | Illness: ${patient2.illness}`);
console.log(`  ${patient3.name} | ID: ${patient3.id} | Age: ${patient3.age} | Illness: ${patient3.illness}`);
console.log(`  ${patient4.name} | ID: ${patient4.id} | Age: ${patient4.age} | Illness: ${patient4.illness}`);

// ==================== INTRODUCTIONS ====================
console.log("\n========== INTRODUCTIONS ==========");
patient1.introduce();
patient2.introduce();
doctor1.introduce();
doctor2.introduce();
specialist1.introduce();

// ==================== BOOK APPOINTMENTS ====================
console.log("\n========== BOOKING APPOINTMENTS ==========");
const appt1 = new Appointment("APT001", "2025-06-10");
const appt2 = new Appointment("APT002", "2025-06-11");
const appt3 = new Appointment("APT003", "2025-06-12");
const appt4 = new Appointment("APT004", "2025-06-13");

patient1.bookAppointment(appt1, doctor1);
patient2.bookAppointment(appt2, doctor1);
patient3.bookAppointment(appt3, doctor2);
patient4.bookAppointment(appt4, specialist1);

// ==================== APPOINTMENT DETAILS ====================
console.log("\n========== APPOINTMENT DETAILS ==========");
console.log(`Appointment ${appt1.appointmentId} | Date: ${appt1.date} | Status: ${appt1.status} | Patient: ${appt1.patient.name} | Doctor: ${appt1.doctor.name}`);
console.log(`Appointment ${appt2.appointmentId} | Date: ${appt2.date} | Status: ${appt2.status} | Patient: ${appt2.patient.name} | Doctor: ${appt2.doctor.name}`);
console.log(`Appointment ${appt3.appointmentId} | Date: ${appt3.date} | Status: ${appt3.status} | Patient: ${appt3.patient.name} | Doctor: ${appt3.doctor.name}`);
console.log(`Appointment ${appt4.appointmentId} | Date: ${appt4.date} | Status: ${appt4.status} | Patient: ${appt4.patient.name} | Doctor: ${appt4.doctor.name}`);

// ==================== CANCEL AN APPOINTMENT ====================
console.log("\n========== CANCELING APPOINTMENT ==========");
patient2.cancelAppointment();
console.log(`Appointment ${appt2.appointmentId} status after cancellation: ${appt2.status}`);

// ==================== TRY CANCELING AGAIN (no appointment) ====================
console.log("\n========== TRY CANCELING AGAIN (already canceled) ==========");
patient2.cancelAppointment();

// ==================== DOCTOR AVAILABILITY ====================
console.log("\n========== DOCTOR AVAILABILITY AFTER BOOKINGS & CANCELLATIONS ==========");
console.log(`Dr. ${doctor1.name} | Available Slots: ${doctor1.availableSlots} | Available: ${doctor1.getAvailability()}`);
console.log(`Dr. ${doctor2.name} | Available Slots: ${doctor2.availableSlots} | Available: ${doctor2.getAvailability()}`);
console.log(`Dr. ${specialist1.name} | Available Slots: ${specialist1.availableSlots} | Available: ${specialist1.getAvailability()}`);

// ==================== STATIC TOTALS ====================
console.log("\n========== STATIC TOTALS ==========");
console.log(`Total Patients Registered: ${Patient.getTotalPatients()}`);
console.log(`Total Doctors: ${Doctor.getTotalDoctors()}`);
console.log(`Total Active Appointments: ${Appointment.getTotalBooked()}`);