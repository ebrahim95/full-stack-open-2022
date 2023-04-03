import { useParams } from "react-router-dom"
import { Diagnosis, Patient, Entry, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry, EntryWithoutId } from "../types"
import { useState, useEffect, ChangeEvent, SyntheticEvent } from "react"
import PatientService from "../services/patients"
import DiagnosisService from "../services/diagnosis"
import { Button, FormControl, Input, MenuItem, Select, SelectChangeEvent, InputLabel, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import axios from "axios"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union memeber: ${JSON.stringify(value)}`
  )
}

interface Occupation {
  entries: OccupationalHealthcareEntry
}

interface HealthCheck {
  entries: HealthCheckEntry
}

interface Hospital {
  entries: HospitalEntry
}
const Hospital = (props: Hospital) => {

  const { entries } = props
  return (
    <div>
      <div key={entries.date}>
        {entries.date}
        <br />{entries.description}
        <p>Diagnosed by {entries.specialist}</p>
      </div>
    </div>
  )
}


const Occupational = (props: Occupation) => {
  const { entries } = props

  return (
    <div>
      <div key={entries.date}>
        {entries.date}
        <br />{entries.description}
        <p>Diagnosed by {entries.specialist}</p>
      </div>
    </div>)
}

const HealthCheck = (props: HealthCheck) => {
  const { entries } = props
  return (
    <div>
      <div key={entries.date}>
        {entries.date}
        <br />{entries.description}
        <p>Diagnosed by {entries.specialist}</p>
      </div>
    </div>
  )
}



const EntryDetails = ({ entries }: { entries: Entry }) => {
  switch (entries.type) {
    case "Hospital":
      return <Hospital entries={entries} />

    case "OccupationalHealthcare":
      return <Occupational entries={entries} />

    case "HealthCheck":
      return <HealthCheck entries={entries} />
    default:
      return assertNever(entries)

  }
}


const SinglePatient = () => {

  const [singlePatient, setSinglePatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();
  const [visible, setVisible] = useState<Boolean>(false);
  const [addEntry, setEntry] = useState<EntryWithoutId>({
    date: "",
    description: "",
    specialist: "",
    type: "Hospital",


  } as EntryWithoutId);

  const [formType, setType] = useState<string>("")
  const [formDiagnosis, setFormDiagnosis] = useState<string[]>([])

  const { id } = useParams()
  useEffect(() => {
    const fetchPatient = async () => {
      if (id !== undefined) {
        const patient = await PatientService.getSingle(id);
        setSinglePatient(patient);
        const get_diagnosis = await DiagnosisService.getDiagnosis()
        setDiagnosis(get_diagnosis);
      }

    }

    void fetchPatient();
  }, [])
  const hideOrShow = () => {
    setVisible(!visible);
  }

  const onSubmit = (id: string) => {
    const addTheEntry = async () => {
      try {
        const response = await PatientService.create_entry(id, addEntry);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data && typeof error.response?.data === 'string') {
            console.log(error.response?.data);
          } else {
            console.error(error)
          }
        }
      }
    }

    void addTheEntry();
  }

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (id !== undefined) {
      onSubmit(id);
    }
  }
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target?.value

    setEntry({
      ...addEntry,
      [event.target.name]: value
    });
  }

  const handleRadio = (event: ChangeEvent<HTMLInputElement>) => {

    const value = event.target?.value
    setType(value)
    setEntry({
      ...addEntry,
      [event.target.name]: value
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target
    if (Array.isArray(value)) {
      setFormDiagnosis(value)
    }
  }

  return (
    <div>
      <h2> {singlePatient?.name} </h2>
      <p> ssh: {singlePatient?.ssn} <br />
        occupation: {singlePatient?.occupation}
      </p>
      <h3> New Entries </h3>

      {visible ?
        <FormControl sx={{ m: 2 }} onSubmit={submitEntry}>
          <TextField onChange={handleInput} placeholder="Description" name="description" type='text' />

          <TextField onChange={handleInput} name="date" type="date" />
          <TextField onChange={handleInput} placeholder="Specialist" name="specialist" type="text" />

          <Select multiple
            value={formDiagnosis}
            onChange={handleSelectChange}
          >
            {diagnosis ? diagnosis.map(obj => (
              <MenuItem
                key={obj.name}
                value={obj.code}
              > {obj.code} </MenuItem>
            )) : ""}
          </Select>


          <RadioGroup onChange={handleRadio} name="type" row>
            <FormControlLabel key='HealthCheck'
              value='HealthCheck'
              control={<Radio size="small" />}
              label="Health Check" />
            <FormControlLabel key='OccupationalHealthcare'
              value='OccupationalHealthcare'
              control={<Radio size="small" />}
              label="OccupationalHealthcare" />
            <FormControlLabel key='Hospital'
              value='Hospital'
              control={<Radio size="small" />}
              label="Hospital" />
          </RadioGroup>


          <TextField onChange={handleInput} placeholder="Health Check Rating" name="healthCheckRating" type="number" />
          <Button type="submit"> Submit </Button>
        </FormControl> : null}
      <br />
      <Button variant="contained" onClick={hideOrShow} >{visible ? "Hide" : "Add a new Entry"} </Button>
      <h3> entries </h3>
      <div>
        {singlePatient?.entries !== undefined ? singlePatient?.entries.map(obj => {
          return <EntryDetails key={obj.id} entries={obj} />
        })
          : null}

      </div>

    </div>
  )
}

export default SinglePatient


