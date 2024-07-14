import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StatusEnum from "../models/status.model";
import {
  fetchRequestsByTutorIdAndStatus,
  setRequestStatus,
} from "../services/api";

export function Request({ onAcceptRequest }) {
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("");

  const loadRequests = async () => {
    try {
      const data = await fetchRequestsByTutorIdAndStatus(
        user.tutorId,
        StatusEnum.Created
      );
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user.tutorId) {
      loadRequests();
    }
  }, [user]);

  const handleActionClick = (request, actionType) => {
    setSelectedRequest(request);
    setAction(actionType);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleConfirmAction = async () => {
    let status = "";

    if (action === "accept") {
      status = StatusEnum.Accepted;
    } else if (action === "reject") {
      status = StatusEnum.Canceled;
    }

    try {
      await setRequestStatus(selectedRequest, status);
      onAcceptRequest();
      loadRequests();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
    handleClose();
  };

  return (
    <div className="card mb-3 tutorContainers">
      <h5 className="card-header">Solicitudes de tutorias</h5>
      {requests && requests.length > 0 ? (
        requests.map((request, index) => (
          <div key={index} className="row g-0">
            <div className="d-flex text-center align-items-center justify-content-center w-100">
              <div className="col-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${request.Student.Person.names}+${request.Student.Person.lastNames}&background=random`}
                  className="img-fluid rounded-circle"
                  alt={`${request.Student.Person.names} ${request.Student.Person.lastNames}`}
                  style={{ width: "30px", height: "30px", objectFit: "cover" }}
                />
              </div>
              <div className="col-3">
                <div className="card-title my-1">
                  <nobr>
                    {request.Student.Person.names}{" "}
                    {request.Student.Person.lastNames}
                  </nobr>
                </div>
                <div className="card-text" style={{ marginTop: "-5px" }}>
                  <small className="text-muted">{request.subjects}</small>
                </div>
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => handleActionClick(request, "accept")}
                >
                  Aceptar
                </button>
              </div>
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleActionClick(request, "reject")}
                >
                  Rechazar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hay solicitudes disponibles.</p>
      )}

      <div
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {action === "accept" ? "Aceptar" : "Rechazar"} tutoria
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                ¿Está seguro que desea{" "}
                {action === "accept" ? "aceptar" : "rechazar"} la tutoria de{" "}
                {selectedRequest?.Student?.Person?.names}{" "}
                {selectedRequest?.Student?.Person?.lastNames}?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleConfirmAction}
              >
                {action === "accept" ? "Aceptar" : "Rechazar"}
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}
