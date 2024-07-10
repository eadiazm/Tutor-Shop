// DOTs: Patrón de Transferencia de datos. Describir cómo recibe datos y los expone en sus capas.
class RegisterReservationDTO {
  id;
  date;
  date_start;
  date_end;
  status;
  studentId;
  tutorId;
  reservationTypeId;
  subjectId;

  constructor(data) {
    this.id = data.id;
    this.date = data.date;
    this.date_start = data.date_start;
    this.date_end = data.date_end;
    this.status = data.status;
    this.studentId = data.studentId;
    this.tutorId = data.tutorId;
    this.reservationTypeId = data.reservationTypeId;
    this.subjectId = data.subjectId;
  }
}

module.exports = RegisterReservationDTO;
