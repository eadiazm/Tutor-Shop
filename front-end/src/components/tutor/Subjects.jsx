import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteTutorSubject, fetchSubjectsByTutorID, fetchSubjectsUnselectedByTutorID, setTutorSubject } from "../services/api";

export function Subjects({ shouldUpdate }) {
    const user = useSelector((state) => state.user);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [show, setShow] = useState(false);
    const [subjectsUnselected, setUnselectedSubjects] = useState([]);

    const loadSelectedSubjects = async () => {
        try {
            const data = await fetchSubjectsByTutorID(user.tutorId);
            setSelectedSubjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadUnselectedSubjects = async () => {
        try {
            const data = await fetchSubjectsUnselectedByTutorID(user.tutorId);
            setUnselectedSubjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadUnselectedSubjects();
    }, [user.tutorId]);

    useEffect(() => {
        loadSelectedSubjects();
    }, [user.tutorId, shouldUpdate]);

    const handleClickAdd = async (subject) => {

        try {
            const resp = await setTutorSubject(user.tutorId, subject.id)
            loadSelectedSubjects();
            loadUnselectedSubjects();
        } catch (error) {
            console.error(error);
        }
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleAddSubject = () => setShow(true)

    const handleClickDelete = async (subject) => {
        try {

            const resp = await deleteTutorSubject(subject.id)
            loadSelectedSubjects();
            loadUnselectedSubjects();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="card mb-3" style={{ maxWidth: '450px' }} >
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="m-0">Materias dictadas</h5>
                <button className="btn btn-success" onClick={() => handleAddSubject()}>Agregar</button>
            </div>
            {selectedSubjects.map((subject, index) => (

                <div key={index} className="row g-0">
                    <div className="d-flex text-center align-items-center justify-content-center w-100">
                        <div className="col-6">
                            <div className="card-title my-1"><nobr>{subject.Subject.name}</nobr></div>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-light" onClick={() => handleClickDelete(subject)}>Eliminar</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Seleccione las materias que dicta</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            {subjectsUnselected.map((subject, index) => (
                                <div key={index} className="row g-0">
                                    <div className="d-flex text-center align-items-center justify-content-center w-100">
                                        <div className="col-8">
                                            <div className="card-title my-1"><nobr>{subject.name}</nobr></div>
                                        </div>
                                        <div className="col-4">
                                            <button type="button" className="btn btn-light" onClick={() => handleClickAdd(subject)}>Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={handleClose}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}