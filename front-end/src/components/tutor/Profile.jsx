import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { fetchTutorInfo } from "../services/api";

export function Profile() {
    const user = useSelector((state) => state.user);
    const [tutor, setTutor] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchTutorInfo(user.tutorId);

                setTutor(data);
            } catch (error) {
                console.error(error);
            }
        };
        loadProfile();
    }, []);

    if (!tutor) {
        return <div>Cargando perfil del tutor...</div>;
    }
    return (
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <h5 className="card-header">Perfil del tutor</h5>
            <div className="row g-0">
                <div className="col-md-4 text-center">
                    <img src={`https://ui-avatars.com/api/?name=${tutor.Person.names}+${tutor.Person.lastNames}&background=random`} className="img-fluid rounded-circle" alt={tutor.Person.names} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                    <h6 className="card-title">{tutor.Person.names} {tutor.Person.lastNames}</h6>
                    <p className="card-text"><small className="text-muted">Tutor desde {tutor.Person.birthdate}</small></p>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Sobre mi</h5>
                        <p className="card-text">{tutor.profession}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}