class RegisterTutorSubjectDTO {
    id;
    tutorId;
    subjectId;

    constructor(data){
        this.id = data.id;
        this.tutorId = data.tutorId;
        this.subjectId = data.subjectId;
    }
};

module.exports = RegisterTutorSubjectDTO;