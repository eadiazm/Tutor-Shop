import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteTutorialReserve,
  fetchRequestTutorialsByStudentId,
} from "../services/api";

const BookTutorials = ({ sendingReload, updateReload }) => {
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const data = await fetchRequestTutorialsByStudentId(user.studentId);
      setRequests(data);
      updateReload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCancel = async (request) => {
    try {
      await deleteTutorialReserve(request.id);
    } catch (error) {
      console.log(error);
    } finally {
      loadRequests();
    }
  };

  useEffect(() => {
    loadRequests();
  }, [user.studentId, sendingReload]);

  return (
    <div className="grid back-color p-5 align-item-center">
      <div className="">
        <h2 className="text-center">Tus tutorias</h2>
        <div
          className="container card shadow d-flex justify-content-center align-items-center px-md-5"
          style={{ maxWidth: "696px" }}
        >
          {requests.length !== 0 ? (
            requests.map((request, index) => (
              <div
                key={index}
                className="card shadow container row row-cols-1 back-color p-1 mx-0 my-2"
              >
                <div className="row row-cols-2">
                  <div className="text-center">
                    <p className="mb-0 fw-bolder">
                      {`${request.Tutor.Person.names} ${request.Tutor.Person.lastNames} (${request.Subject.name}) `}
                    </p>
                    <p className="mb-0">
                      {`${request.date_start} - ${request.date_end}`}{" "}
                    </p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="btn btn-dark"
                      onClick={() => handleClickCancel(request)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="fw-bolder">
              En este momento no tienes ninguna tutoria pendiente
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTutorials;
