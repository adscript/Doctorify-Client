import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { getPatientQuery } from '../queries'

function PatientDetails(props) {
    const { data } = useQuery(getPatientQuery, {
        variables: { id: props.patientId },
    });

    const displayPatientDetails = () => {
        if (data) {
            const patient = data.patient;
            return (
                <div>
                    <h2>{patient.name}</h2>
                    <p>{patient.symptoms}</p>
                    {patient.doctor ? <>
                        <p>Doctor : {patient.doctor.name}</p>
                        <p>All patients by {patient.doctor.name}:</p>
                        <ul className="other-patients">
                            {patient.doctor.patients.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })}
                        </ul>
                    </> : <div>Loading...</div>}
                </div>
            );
        } else {
            return (<div>No patient selected...</div>);
        }
    }

    return (
        <div className="patient-details">
            {displayPatientDetails()}
        </div>
    )
}

export default PatientDetails