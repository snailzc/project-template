import {useRef, useEffect} from 'react';

const fetchData = (url: string) => {
  const token = localStorage.token;
  const data = useRef();
  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(res => res.json())
      .then(res => {
        data.current = res.data;
      })
  }, [])
  return data;
}

export default fetchData;
