import React from 'react';

/* Start debug data - to not rate limit myself over the hour. */
const useHardCodedData = false;
const hardCodedData = '[{"analyzer":"Threat feed (flow)","endTime":"2020-09-03 12:00:00","id":1,"identifier":"192.168.1.3","score":75,"startTime":"2020-09-03 11:00:00","status":"Closed"},{"analyzer":"Unusual internal service","endTime":"2020-09-03 12:00:00","id":2,"identifier":"192.168.1.1","score":50,"startTime":"2020-09-03 11:00:00","status":"Open"},{"analyzer":"Unusual internal service","endTime":"2020-09-03 13:00:00","id":3,"identifier":"192.168.1.8","score":40,"startTime":"2020-09-03 12:00:00","status":"Closed"},{"analyzer":"Horizontal scanning","endTime":"2020-09-04 04:00:00","id":4,"identifier":"192.168.1.100","score":80,"startTime":"2020-09-04 03:00:00","status":"Open"},{"analyzer":"Vertical scanning","endTime":"2020-09-04 04:00:00","id":5,"identifier":"192.168.1.100","score":70,"startTime":"2020-09-04 03:00:00","status":"Open"},{"analyzer":"Bytes to external endpoint","endTime":"2020-09-03 05:00:00","id":6,"identifier":"192.168.1.13","score":100,"startTime":"2020-09-03 04:00:00","status":"Open"},{"analyzer":"Bytes to external endpoint","endTime":"2020-09-03 05:00:00","id":7,"identifier":"192.168.1.13","score":90,"startTime":"2020-09-03 04:00:00","status":"Open"},{"analyzer":"Bytes to external endpoint","endTime":"2020-09-03 06:00:00","id":8,"identifier":"192.168.1.13","score":95,"startTime":"2020-09-03 05:00:00","status":"Open"},{"analyzer":"Bytes to external endpoint","endTime":"2020-09-03 07:00:00","id":9,"identifier":"192.168.1.13","score":90,"startTime":"2020-09-03 06:00:00","status":"Closed"},{"analyzer":"DNS volume (proxy)","endTime":"2020-09-03 16:00:00","id":10,"identifier":"woist.net","score":90,"startTime":"2020-09-03 15:00:00","status":"Open"},{"analyzer":"Threat feed (proxy)","endTime":"2020-09-03 17:00:00","id":11,"identifier":"192.168.1.20","score":30,"startTime":"2020-09-03 16:00:00","status":"Open"},{"analyzer":"Threat feed (proxy)","endTime":"2020-09-03 17:00:00","id":12,"identifier":"192.168.1.21","score":25,"startTime":"2020-09-03 16:00:00","status":"Open"},{"analyzer":"Command & control","endTime":"2020-09-04 11:00:00","id":13,"identifier":"malicious.example.com:1337","score":75,"startTime":"2020-09-04 10:00:00","status":"Open"},{"analyzer":"Command & control","endTime":"2020-09-04 12:00:00","id":14,"identifier":"malicious-server.example.com:1337","score":100,"startTime":"2020-09-04 11:00:00","status":"Closed"},{"analyzer":"Command & control","endTime":"2020-09-04 15:00:00","id":15,"identifier":"malicious-server.example.com:1337","score":100,"startTime":"2020-09-04 14:00:00","status":"Closed"},{"analyzer":"Typosquatting","endTime":"2020-09-05 16:00:00","id":16,"identifier":"yaghoo.com","score":20,"startTime":"2020-09-05 15:00:00","status":"Open"},{"analyzer":"Typosquatting","endTime":"2020-09-05 16:00:00","id":17,"identifier":"go0gle.com","score":20,"startTime":"2020-09-05 15:00:00","status":"Open"}]';
/* End debug data */

export const FetchReducerActions = {
  Fetch: 'fetch',
  FetchError: 'error',
  FetchSuccess: 'success',
};


export function fetchReducer(state, action) {
  switch(action.type) {
    case FetchReducerActions.Fetch:
      return {
        ...state,
        loading: true,
      };
    case FetchReducerActions.Success:
      return {
        data: action.data,
        error: null,
        loading: false,
      };
    case FetchReducerActions.Error:
      return {
        ...state,
        error: `An error happened for some reason`,
        loading: false,
      };
    default:
      throw new Error(`Action type isn't supported`);
  }
}


export function useFetch (url) {
  const [state, dispatch] = React.useReducer(
    fetchReducer,
    {
      error: null,
      data: [],
      loading: true,
    }
  )

  React.useEffect(() => {
    dispatch({
      type: FetchReducerActions.Fetch,
    });

    if (useHardCodedData) {
      console.warn('You are using the local hard coded data');

      dispatch({
        type: FetchReducerActions.Success,
        data: JSON.parse(hardCodedData),
      });
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((data) => dispatch({
          type: FetchReducerActions.Success,
          data: data.anomalies,
        }))
        .catch((e) => dispatch({
          type: FetchReducerActions.Error,
        }));
    }
  }, [url])

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
  }
}
