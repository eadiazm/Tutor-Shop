import React, { useCallback, useState, useEffect } from "react";
import { fetchCities, fetchDepartments, fetchDocumentType, fetchGender, setTutorInfo } from '../services/api'

const TutorContext = React.createContext();

const validate = (values) => {
    const errors = {};
    const namePattern = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!values.names) {
        errors.names = 'Ingresa el nombre';
    } else if (!namePattern.test(values.names)) {
        errors.names = 'El nombre ingresado es inválido';
    }

    if (!values.lastNames) {
        errors.lastNames = 'Ingresa el apellido';
    } else if (!namePattern.test(values.lastNames)) {
        errors.lastNames = 'El apellido ingresado es inválido';
    }

    if (!values.birthdate) {
        errors.birthdate = 'Ingresa la fecha de nacimiento';
    }

    if (!values.gender) {
        errors.gender = 'Selecciona el género';
    }

    if (!values.typeDocument) {
        errors.typeDocument = 'Selecciona el tipo de documento';
    }

    if (!values.numberDocument) {
        errors.numberDocument = 'Ingresa el número de documento';
    }

    if (!values.department) {
        errors.department = 'Selecciona el departamento';
    }

    if (!values.cityId) {
        errors.cityId = 'Selecciona la ciudad';
    }

    if (!values.profession) {
        errors.profession = 'Ingresa tu profesión';
    }

    if (!values.phone) {
        errors.phone = 'Ingresa el número de teléfono o celular';
    }

    if (!values.email) {
        errors.email = 'Ingresa el correo electrónico';
    } else if (!emailPattern.test(values.email)) {
        errors.email = 'El correo electrónico ingresado es inválido';
    }

    if (!values.password) {
        errors.password = 'Ingresa la contraseña';
    }

    if (!values.profession) {
        errors.profession = 'Ingresa la profesión';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Ingresa la confirmación de la contraseña';
    } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'La confirmación de contraseña no coincide con la contraseña';
    }

    return errors;
};

export function TutorRegistrationProvider({ children }) {
    const [formSended, setFormSended] = useState(false);
    const [formSendedError, setFormSendedError] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [genders, setGender] = useState([]);
    const [typeDocuments, setDocumentType] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments();
                setDepartments(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadDepartments();
    }, []);

    useEffect(() => {
        const loadGender = async () => {
            try {
                const data = await fetchGender();
                setGender(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadGender();
    }, []);

    useEffect(() => {
        const loadDocumentType = async () => {
            try {
                const data = await fetchDocumentType();
                setDocumentType(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadDocumentType();
    }, []);

    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;
        setSelectedDepartment(departmentId);

        // Buscar el nombre del departamento seleccionado
        const selectedDept = departments.find(dept => dept.id === parseInt(departmentId, 10));
        const departmentName = selectedDept ? selectedDept.name : '';

        try {
            // Llamar a la API para obtener las ciudades del departamento
            const citiesData = await fetchCities(departmentName); // Suponiendo una función fetchCitiesByDepartment que llama a la API
            const sortedData = citiesData.sort((a, b) => a.name.localeCompare(b.name));
            setCities(sortedData);
        } catch (error) {
            console.error(error);
            setCities([]); // Manejo de error: establecer ciudades como un array vacío
        }
    };
    
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await setTutorInfo(values);

            if (!response.success) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al enviar los datos');
            }

            resetForm();
            setFormSended(true);
            setTimeout(() => {
                setFormSended(false);
            }, 5000);
        } catch (error) {
            setFormSendedError(true);
            setTimeout(() => {
                setFormSendedError(false);
            }, 5000);
        }
    };

    const contextValue = {
        formSended,
        formSendedError,
        handleSubmit,
        validate,
        departments,
        handleDepartmentChange,
        selectedDepartment,
        cities,
        genders,
        typeDocuments,
    };

    return (
        <TutorContext.Provider value={contextValue}>
            {children}
        </TutorContext.Provider>
    );
}

export default TutorContext;
