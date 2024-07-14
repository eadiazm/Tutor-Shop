import { Profile } from "./Profile";
import { Scheduled } from "./Scheduled";
import { Request } from "./Request";
import { useState } from "react";
import { Subjects } from "./Subjects";

export function Dashboard() {
  const [updateScheduled, setUpdateScheduled] = useState(false);

  const handleRequestAccepted = () => {
    // Activar la actualización de Scheduled
    setUpdateScheduled(true);
  };

  const handleScheduledUpdate = () => {
    // Desactivar la actualización después de que Scheduled se haya actualizado
    setUpdateScheduled(false);
  };

  return (
    <div className="container height-container p-3">
      <div className="row">
        <div>
          <h1>
            <p>Dashboard del tutor</p>
          </h1>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <Profile />
        </div>
        <div className="col">
          <Request onAcceptRequest={handleRequestAccepted} />
        </div>
      </div>
      <div class="row row-cols-1 row-cols-lg-2">
        <div className="col">
          <Scheduled
            shouldUpdate={updateScheduled}
            onUpdate={handleScheduledUpdate}
          />
        </div>
        <div className="col">
          <Subjects />
        </div>
      </div>
    </div>
  );
}
