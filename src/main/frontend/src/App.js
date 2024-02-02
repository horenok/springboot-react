
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/data')
        .then(res => setHello(res.data))
        .catch(err => console.log(err))
  }, []);

  return (
      <div>
        백엔드에서 가져온 데이터입니다 : {data}
      </div>
  );
}

export default App;