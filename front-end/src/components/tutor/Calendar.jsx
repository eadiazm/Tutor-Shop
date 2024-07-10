import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Estilos de la librería
import 'react-date-range/dist/theme/default.css'; // Tema por defecto
import { es } from 'date-fns/locale'; // Localización en español
import { createStaticRanges } from 'react-date-range/dist/defaultRanges';

const customStaticRanges = createStaticRanges([
    {
        label: 'Hoy',
        range: () => ({
            startDate: new Date(),
            endDate: new Date(),
        }),
    },
    {
        label: 'Ayer',
        range: () => ({
            startDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            endDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        }),
    },
    {
        label: 'Esta semana',
        range: () => ({
            startDate: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
            endDate: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay()))),
        }),
    },
    // Agrega más rangos personalizados según sea necesario
]);

export function EditableCalendar() {
    const [selectionRanges, setSelectionRanges] = useState({
        selection1: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection1',
        }
    });

    const addRange = () => {
        const newKey = `selection${Object.keys(selectionRanges).length + 1}`;
        setSelectionRanges({
            ...selectionRanges,
            [newKey]: { startDate: new Date(), endDate: new Date(), key: newKey }
        });
    };

    const handleSelect = (ranges) => {
        const newRanges = {};
        for (let key in ranges) {
            newRanges[key] = ranges[key];
        }
        setSelectionRanges(newRanges);
    };

    return (
        <div className="card mb-3" >
            <div className="card-header">
                <h5 className="m-0">Disponibilidad</h5>
            </div>
            <div className="row g-0">
                <div className='col-auto'>
                    <button className='btn btn-dark' onClick={addRange}>Agregar disponibilidad</button>
                </div>
                <div className='col-10'>
                    <DateRangePicker
                        ranges={Object.values(selectionRanges)}
                        onChange={handleSelect}
                        editableDateInputs={true}
                        locale={es}
                        staticRanges={[]}
                        inputRanges={[]}
                    />
                </div>
            </div>
        </div>
    );
}
