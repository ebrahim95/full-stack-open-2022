import { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { useState } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import { getDiaries, addDiaryEntry } from './services/diaryService';
import axios from 'axios';
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [addEntry, setEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: Visibility.Ok,
    weather: Weather.Sunny,
    comment: ""
  });
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDiaries().then(data => setDiaries(data));
  }, []);

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await addDiaryEntry(addEntry);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data && typeof error.response?.data === 'string') {
          setNotification(error.response?.data);
        }
      } else {
        console.error(error);
      }

    }
  };

  const handleAddEntry = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEntry({
      ...addEntry,
      [event.target.name]: value
    });
  };
  const handleAddSelectEntry = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setEntry({
      ...addEntry,
      [event.target.name]: value
    });
  };


  return (
    <div>
      <h2>Add Diary Entry</h2>
      <div>
        {notification === "" ? "" : <p>{notification}</p>}
      </div>
      <form onSubmit={void addDiary}>
        Date <input type='date' name='date' onChange={handleAddEntry} /><br />
        Visibility<select name='visibility' onChange={handleAddSelectEntry}>
          <option value={Visibility.Great}> Great </option>
          <option value={Visibility.Good}> Good </option>
          <option value={Visibility.Ok}> Ok </option>
          <option value={Visibility.Poor}> Poor </option>
        </select><br />
        Weather<select name='weather' onChange={handleAddSelectEntry}>
          <option value={Weather.Sunny}> Sunny </option>
          <option value={Weather.Rainy}> Rainy </option>
          <option value={Weather.Windy}> Windy </option>
          <option value={Weather.Stormy}> Stormy </option>
          <option value={Weather.Cloudy}> Cloudy </option>
        </select><br />
        Comment<input name='comment' onChange={handleAddEntry} /><br />
        <button type='submit'>Add</button>
      </form>
      <h2>Diary Entries</h2>
      {
        diaries.map(diary => <div key={diary.id}>
          {diary.date}
          <p>
            Visibility: {diary.visibility}<br />
            Weather: {diary.weather}
          </p>
        </div>)
      }
    </div >
  );
};
export default App;
