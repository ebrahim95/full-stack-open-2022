import { useParams } from "react-router-dom"
import { Patient } from "../types"
import { useState, useEffect } from "react"
import PatientService from "../services/patients"
const SinglePatient = () => {

  const [singlePatient, setSinglePatient] = useState<Patient>();

  const { id } = useParams()
  useEffect(() => {
    const fetchPatient = async () => {
      if (id !== undefined) {
        const patient = await PatientService.getSingle(id);
        setSinglePatient(patient)
      }
    }

    void fetchPatient();
  }, [])


  return (
    <div>
      <h2> {singlePatient?.name} </h2>
      <p> {singlePatient?.ssn} </p>
      <p> {singlePatient?.occupation} </p>
    </div>
  )
}

export default SinglePatient
