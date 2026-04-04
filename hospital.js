class Patient {
    static totalPatients = 0;
    constructor(patientId, name, age) {
        this.patientId = patientId;
        this.name = name;
        this.age = age;
        this.appointment = null;
        Patient.totalPatients++;
    }

    register(){
        console.log(`Patient ${this.name} registered successfully. With ID ${this.patientId}`);
    }

    bookAppointment(appointment, doctor){

        appointment.confirm(this, doctor);
        this.appointment = appointment;
    }

  cancelAppointment() {
  if (this.appointment && this.appointment.status === "confirmed") {
    this.appointment.cancel();
    this.appointment = null;
  } else if (this.appointment && this.appointment.status !== "confirmed") {
    console.log(`${this.name}'s appointment is not confirmed, nothing to cancel.`);
  } else {
    console.log(`${this.name} has no active appointment to cancel.`);
  }
}

    static getTotalPatients(){
        return Patient.totalPatients;
    }
}

class Doctor{
    
    static totalDoctors = 0;

    constructor(doctorId, name, specialization, availableSlots) {
        this.doctorId = doctorId;
        this.name = name;
        this.specialization = specialization;
        this.availableSlots = availableSlots;

        Doctor.totalDoctors++;
    }

    getAvailability(){
        return this.availableSlots > 0;
    }

    updateSlots(n){
        this.availableSlots += n;
        console.log(`Doctor ${this.name} now has ${this.availableSlots} available slots.`);
    }

    cancelSlot(){
        this.availableSlots++;
        console.log(`Doctor ${this.name} has a slot canceled. Available slots: ${this.availableSlots}`);
    }

    static getTotalDoctors(){
        return Doctor.totalDoctors;
    }

}

class Appointment {
    static totalBooked = 0;
    constructor(appointmentId, date){
        this.appointmentId = appointmentId;
        this.date = date;
        this.patient = null;
        this.doctor = null;
        this.status = 'Pending';
    }

    confirm(patient, doctor){
        if(doctor.getAvailability()){
            this.patient = patient;
            this.doctor = doctor;
            this.status = 'Confirmed';
            doctor.updateSlots(-1);
            Appointment.totalBooked++;
            console.log(`Appointment ${this.appointmentId} confirmed for patient ${patient.name} with doctor ${doctor.name} on ${this.date}.`);
        } else{
            console.log(`Doctor ${doctor.name} is not available on ${this.date}.`);
        }
    }

    static getTotalBooked(){
        return Appointment.totalBooked;
    }
}


const doctor1 = new Doctor("DOC001", "Adaeze Okafor", "Cardiology", 10);
const doctor2 = new Doctor("DOC002", "Emeka Nwosu", "General Practice", 5);

const patient1 = new Patient("PAT001", "Chukwuemeka Eze", 34);
const patient2 = new Patient("PAT002", "Ngozi Adeyemi", 28);
const patient3 = new Patient("PAT003", "Tunde Balogun", 45);

patient1.register();
patient2.register();
patient3.register();

const appt1 = new Appointment("APT001", "2025-06-10");
const appt2 = new Appointment("APT002", "2025-06-11");
const appt3 = new Appointment("APT003", "2025-06-12");

patient1.bookAppointment(appt1, doctor1);
patient2.bookAppointment(appt2, doctor1);
patient3.bookAppointment(appt3, doctor2);

// patient2.cancelAppointment();

// console.log(`\nTotal patients: ${Patient.getTotalPatients()}`);
// console.log(`Total doctors: ${Doctor.getTotalDoctors()}`);
console.log(`Active appointments: ${Appointment.getTotalBooked()}`);