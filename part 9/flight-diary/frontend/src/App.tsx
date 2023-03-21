import { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import { DiaryEntry } from './types';
import { getDiaries } from './services/diaryService';
const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getDiaries().then(data => setDiaries(data));
  }, []);
  return (
    <div>
      {diaries.map(diary => <div key={diary.id}>{diary.date}</div>)}
    </div>
  );
};
export default App;
