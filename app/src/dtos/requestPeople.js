// DOTs: Patrón de Transferencia de datos. Describir cómo recibe datos y los expone en sus capas. 

class RegisterPeopleDTO {
    id;
    names;
    lastNames;
    typeDocument;
    numberDocument;
    email;
    gender;
    birthdate;
    phone;
    password;
    cityId;

    constructor(data){
        this.id = data.id;
        this.names = data.names;
        this.lastNames = data.lastNames;
        this.typeDocument = data.typeDocument;
        this.numberDocument = data.numberDocument;
        this.email = data.email;
        this.gender = data.gender;
        this.birthdate = data.birthdate;
        this.phone = data.phone;
        this.password = data.password;
        this.cityId = data.cityId;
    }
};

module.exports = RegisterPeopleDTO;