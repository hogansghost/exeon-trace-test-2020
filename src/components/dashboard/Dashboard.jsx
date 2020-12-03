import React from 'react';

import { useFetch } from '../../customHooks/reducers/fetchReducer';

import {
  DataOptions,
  DataTable,
} from '../index';

// https://demo.exeontrace.com/interview/api/v1.0/anomalies


export const DataPointTypes = {
  analyzer: 'Analyzer',
  identifier: 'Identifier',
  startTime: 'Start time',
  endTime: 'End time',
  score: 'Score',
  status: 'Status',
};


export const Dashboard = () => {
  const [dataType, setDataType] = React.useState('anomalies');
  const [displayClosed, setDisplayClosed] = React.useState(true);
  const [sortOrder, setSortOrder] = React.useState('status');

  const {
    data = [],
    error,
    loading,
  } = useFetch(
    `https://demo.exeontrace.com/interview/api/v1.0/${dataType}`,
  );


  const onSortChangeHandler = (e) => {
    setSortOrder(e.target.value);
  }

  const onDisplayClosedHandler = () => {
    setDisplayClosed((closed) => !closed);
  }

  const onDataTypeSelectionHandler = (e) => {
    setDataType(e.target.value);
  }

  const dataCategories = Object.entries(DataPointTypes);

  const dataSorted = data.sort((a, b) => {
    // Type checking required for the data sort. This is a rough generic catch all for the time being.
    let sortValue = 0;

    const aSort = a[sortOrder];
    const bSort = b[sortOrder];

    if (aSort < bSort) {
      sortValue = -1;
    } else if (aSort > bSort) {
      sortValue = 1;
    }

    return sortValue;
  }).filter((dataPoint) => {
    return displayClosed ? dataPoint : dataPoint.status !== 'Closed';
  });

  return (
    <>
      <DataOptions
        displayClosed={displayClosed}
        sortOptions={dataCategories}
        onSortChange={onSortChangeHandler}
        onDisplayClosedChange={onDisplayClosedHandler}
      />

      <main>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            data={dataSorted}
            dataColumns={dataCategories}
          />
        )}
      </main>
    </>
  )
};

export default Dashboard;
