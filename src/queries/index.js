import { gql } from 'apollo-boost'

const getPatientsQuery = gql`
{
    patients{
        name
        id
    }
}
`

const getDoctorsQuery = gql`
{
    doctors{
        name
        id
    }
}
`

const addPatientMutation = gql`
mutation($name: String!, $symptoms: String!, $doctorId: ID!){
    addPatient(name: $name, symptoms: $symptoms, doctorId: $doctorId){
        name
        id
    }
}
`
const getPatientQuery = gql`
query($id: ID!){
    patient(id:$id){
        id
        name
        symptoms
        doctor{
            id
            name
            age 
            patients{
                name
                id
            }
        }
    }
}
`

export {
    getDoctorsQuery,
    getPatientsQuery,
    addPatientMutation, 
    getPatientQuery
}