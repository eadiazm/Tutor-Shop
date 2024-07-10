class RegisterSubjectDTO {
    id;
    name;
    description;
    grade;

    constructor(data){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.grade = data.grade;
    }
};

module.exports = RegisterSubjectDTO;