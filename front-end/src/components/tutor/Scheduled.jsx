import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRequestsByTutorIdAndStatus, setRequestStatus } from "../services/api";
import StatusEnum from "../models/status.model";

export function Scheduled({ shouldUpdate, onUpdate }) {
    const user = useSelector((state) => state.user);
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [show, setShow] = useState(false);
    const loadRequests = async () => {
        try {
            const data = await fetchRequestsByTutorIdAndStatus(user.tutorId, StatusEnum.Accepted);

            setRequests(data);
            if (onUpdate) {
                onUpdate();
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadRequests();
    }, [user.tutorId, shouldUpdate]);

    const handleActionClick = (request) => {
        setSelectedRequest(request);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleConfirmAction = async () => {
        const status = StatusEnum.Canceled;

        try {
            await setRequestStatus(selectedRequest, status);
        } catch (error) {
            console.error("Error updating request status:", error);
        }
        loadRequests();
        handleClose();
    };

    return (
        <div className="card mb-3" style={{ maxWidth: '450px' }} >
            <div className="card-header">
                <h5 className="m-0">Tutorias aceptadas</h5>
            </div>
            {requests.map((request, index) => (
                <div key={index} className="row g-0">
                    <div className="d-flex text-center align-items-center justify-content-center w-100">
                        <div className="col-2">
                            <img src={`https://ui-avatars.com/api/?name=${request.Student.Person.names}+${request.Student.Person.lastNames}&background=random`} className="img-fluid rounded-circle" alt={`${request.Student.Person.names} ${request.Student.Person.lastNames}`} style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-6">
                            <div className="card-title my-1"><nobr>{request.Student.Person.names} {request.Student.Person.lastNames}</nobr></div>
                        </div>
                        <div className="col-4">
                            <button type="button" className="btn btn-light" onClick={() => handleActionClick(request)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            ))}

            <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Cancelar tutoria</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Está seguro que desea cancelar la tutoria de {selectedRequest?.Student?.Person?.names} {selectedRequest?.Student?.Person?.lastNames}?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" onClick={handleConfirmAction}>
                                Aceptar
                            </button>
                            <button type="button" className="btn btn-warning" onClick={handleClose}>
                                Omitir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show"></div>}
        </div>
    );
}