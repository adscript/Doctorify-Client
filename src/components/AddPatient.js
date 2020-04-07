import React, { useMemo, useCallback, useState } from 'react';
import { getDoctorsQuery, addPatientMutation, getPatientsQuery } from '../queries';
import { useQuery, useMutation } from '@apollo/react-hooks';


const getOptions = (loading, error, data) => {
   if (loading) {
      return <option disabled>Loading Doctors...</option>;
   } else if (error) {
      return <option disabled>Error loading Doctors</option>;
   } else {
      return data.doctors.map(({ name, id }) => {
         return (
            <option key={id} value={id}>
               {name}
            </option>
         );
      });
   }
};


const AddPatient = () => {
   const { loading, error, data } = useQuery(getDoctorsQuery);
   const [addPatient] = useMutation(addPatientMutation);
   const [name, setName] = useState('');
   const [symptoms, setSymptoms] = useState('');
   const [doctorId, setDoctor] = useState('');


   const options = useMemo(() => getOptions(loading, error, data), [
      loading,
      error,
      data
   ]);

   const nameCB = useCallback(e => setName(e.target.value), []);
   const symptomsCB = useCallback(e => setSymptoms(e.target.value), []);
   const doctorCB = useCallback(e => setDoctor(e.target.value), []);
   const addCB = useCallback(
      e => {
         e.preventDefault();
         addPatient({
            variables: {
               name,
               symptoms,
               doctorId
            },
            refetchQueries: [{ query: getPatientsQuery }]
         });
      },
      [name, symptoms, doctorId]
   );


   return (
      <form id="add-patient" onSubmit={addCB}>
         <div className="field">
            <label>Patient name: </label>
            <input type="text" onChange={nameCB} />
         </div>


         <div className="field">
            <label>Symptoms: </label>
            <input type="text" onChange={symptomsCB} />
         </div>


         <div className="field">
            <label>Doctor:</label>
            <select onChange={doctorCB}>
               <option>Select Doctor</option>
               {options}
            </select>
         </div>


         <button>+</button>
      </form>
   );
};


export default AddPatient;