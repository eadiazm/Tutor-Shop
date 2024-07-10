import React, { useEffect, useState } from "react";
import {
  fetchCities,
  fetchDepartments,
  fetchDocumentType,
  fetchGender,
  setStudentInfo,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const StudentContext = React.createContext();

export const StudentRegistrationProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formSended, setFormSended] = useState(false);
  const [formSendedError, setFormSendedError] = useState(false);
  const [genders, setGender] = useState([]);
  const [typeDocuments, setDocumentType] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

    const loadGender = async () => {
      try {
        const data = await fetchGender();
        setGender(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadGender();

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
    const selectedDept = departments.find(
      (dept) => dept.id === parseInt(departmentId, 10)
    );
    const departmentName = selectedDept ? selectedDept.name : "";

    try {
      // Llamar a la API para obtener las ciudades del departamento
      const citiesData = await fetchCities(departmentName); // Suponiendo una función fetchCitiesByDepartment que llama a la API
      const sortedData = citiesData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCities(sortedData);
    } catch (error) {
      console.error(error);
      setCities([]); // Manejo de error: establecer ciudades como un array vacío
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await setStudentInfo(values);

      if (!response.success) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar los datos");
      }

      //resetForm();
      setFormSended(true);
      setTimeout(() => {
        setFormSended(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      setFormSendedError(true);
      setTimeout(() => {
        setFormSendedError(false);
      }, 3000);
    }
  };

  const contextValue = {
    formSended,
    formSendedError,
    handleSubmit,
    departments,
    handleDepartmentChange,
    selectedDepartment,
    cities,
    genders,
    typeDocuments,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
