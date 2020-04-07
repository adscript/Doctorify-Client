import React, {useState} from 'react'
import { graphql } from 'react-apollo'
import { getPatientsQuery } from '../queries'
import PatientDetails from './PatientDetails'

function PatientList(props) {
    const [selected, setSelected] = useState(null)
    
    const displayPatients = () => {
        let data = props.data
        if (data.loading) return (<div>Loading Records ...</div>)
        return data.patients.map(patient => {
            return (
                <li key={patient.id} onClick={(e) => setSelected(patient.id)}>{patient.name}</li>
            )
        })
    }

    return (
        <div>
            <ul className="patient-list">
                {displayPatients()}
            </ul>
            <PatientDetails patientId={ selected } />
        </div>
    )
}

export default graphql(getPatientsQuery)(PatientList)
