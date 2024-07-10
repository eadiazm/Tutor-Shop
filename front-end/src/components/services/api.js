const urlAPI =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:4000/api/";

export const fetchLogin = async (values) => {
  const response = await fetch(`${urlAPI}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: values.email,
      password: values.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Error ingresando al sistema");
  }

  const data = await response.json();
  return data;
};

export const fetchDepartments = async () => {
  const response = await fetch(`${urlAPI}city/departments`);
  if (!response.ok) {
    throw new Error("Error fetching departments");
  }
  const data = await response.json();
  return data.sort((a, b) => a.name.localeCompare(b.name)); // devuelve los departamentos ordenados alfabéticamente
};

export const fetchCities = async (department) => {
  const response = await fetch(
    `${urlAPI}city/departments/cities?name=${department}`
  );
  if (!response.ok) {
    throw new Error("Error fetching cities");
  }
  const data = await response.json();
  return data.sort((a, b) => a.name.localeCompare(b.name)); //devuelve las ciudades ordenadas alfabéticamente
};

export const fetchGender = async () => {
  const response = await fetch(`${urlAPI}generic/gender`);
  if (!response.ok) {
    throw new Error("Error fetching gender");
  }
  const data = await response.json();
  const dataArray = Object.entries(data).map(([key, value]) => ({
    id: key,
    name: value,
  }));
  return dataArray; //devuelve los generos
};

export const fetchDocumentType = async () => {
  const response = await fetch(`${urlAPI}generic/documentType`);
  if (!response.ok) {
    throw new Error("Error fetching document type");
  }

  const data = await response.json();
  const dataArray = Object.entries(data).map(([key, value]) => ({
    id: key,
    name: value,
  }));
  return dataArray; //devuelve los tipos de documento
};

export const fetchTutorInfo = async (userId) => {
  const response = await fetch(`${urlAPI}tutor/tutor/${userId}`);
  if (!response.ok) {
    throw new Error("Error fetching document type");
  }

  const data = await response.json();
  return data.tutor; //devuelve los datos del tutor
};

export const fetchRequestsByTutorIdAndStatus = async (tutorId, status) => {
  try {
    const response = await fetch(
      `${urlAPI}reservation/reservations/tutor/${tutorId}/${status}`
    );

    if (!response.ok) {
      throw new Error("Error fetching reservations by tutor and status");
    }

    const data = await response.json();
    return data.reservations; //devuelve los datos del tutor
  } catch (error) {
    console.log(error);
  }
};

export const setRequestStatus = async (request, status) => {
  request.status = status;
  const valuesToInsert = JSON.stringify(request);

  const response = await fetch(
    `${urlAPI}reservation/reservation/${request.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: valuesToInsert,
    }
  );
  if (!response.ok) {
    throw new Error(`Error al enviar la información del tutor`);
  }
  return response.json();
};

export const setTutorInfo = async (values) => {
  const valuesToInsert = JSON.stringify(values);

  const response = await fetch(`${urlAPI}tutor/tutor/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: valuesToInsert,
  });
  if (!response.ok) {
    throw new Error(`Error al enviar la información del tutor`);
  }
  return response.json();
};

export const fetchSubjectsByTutorID = async (tutorId) => {
  const response = await fetch(`${urlAPI}tutorSubject/tutorSubject/${tutorId}`);
  if (!response.ok) {
    throw new Error("Error fetching subjects by tutor");
  }

  const data = await response.json();
  return data.tutorSubject; //devuelve los datos del tutor
};

export const fetchSubjectsUnselectedByTutorID = async (tutorId) => {
  const response = await fetch(
    `${urlAPI}tutorSubject/tutorUnselectedSubject/${tutorId}`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo las materias del tutor");
  }

  const data = await response.json();
  return data.unselectedSubjects; //devuelve los datos del tutor
};

export const setTutorSubject = async (tutorId, subjectId) => {
  const valuesToInsert = JSON.stringify({ tutorId, subjectId });

  const response = await fetch(`${urlAPI}tutorSubject/tutorSubject/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: valuesToInsert,
  });
  if (!response.ok) {
    throw new Error(`Error al enviar la información del tutor materia`);
  }
  return response.json();
};

export const deleteTutorSubject = async (id) => {
  const response = await fetch(`${urlAPI}tutorSubject/tutorSubject/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar la información del tutor materia`);
  }

  return response.json();
};

/*******  student requests *******/
export const setStudentInfo = async (values) => {
  const valuesStudent = JSON.stringify(values);

  const response = await fetch(`${urlAPI}student/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: valuesStudent,
  });
  if (!response.ok) {
    throw new Error(`Error al enviar la información del estudiante`);
  }
  return response.json();
};

export const fetchSubjects = async () => {
  const response = await fetch(`${urlAPI}subject/subjects`);
  if (!response.ok) {
    throw new Error("Error fetching subjects");
  }
  const data = await response.json();
  return data.subjects.sort((a, b) => a.name.localeCompare(b.name)); //devuelve las materias ordenadas alfabéticamente
};

export const fetchTutorials = async () => {
  const response = await fetch(`${urlAPI}generic/reservationType`);
  if (!response.ok) {
    throw new Error("Error fetching reservationType");
  }
  const data = await response.json();
  const dataArray = Object.entries(data).map(([key, value]) => ({
    id: key,
    name: value,
  }));
  return dataArray.sort((a, b) => a.name.localeCompare(b.name)); //devuelve las tutorias ordenadas alfabéticamente
};

export const fetchTutorsBySubject = async (id) => {
  const response = await fetch(`${urlAPI}subject/tutorsSubject/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching tutors");
  }
  const data = await response.json();

  return data.tutorSubjects;
};

export const setReserveTutorial = async (values) => {
  const valuesToInsert = JSON.stringify(values);

  const response = await fetch(`${urlAPI}reservation/reservation/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: valuesToInsert,
  });
  if (!response.ok) {
    throw new Error(`Error al enviar la solicitud de la tutoría`);
  }
  return response.json();
};

export const fetchRequestTutorialsByStudentId = async (studentId) => {
  const response = await fetch(
    `${urlAPI}reservation/reservations/student/${studentId}`
  );

  if (!response.ok) {
    throw new Error("Error fetching reservation tutorials by student Id");
  }

  const data = await response.json();
  return data.reservations;
};


export const deleteTutorialReserve = async (id) => {
  const response = await fetch(`${urlAPI}reservation/reservation/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error al eliminar la información del tutor materia`);
  }

  return response.json();
};