import React from 'react';

import * as DataTableStyled from './DataTable.styles';


export const DataTable = ({
  data = [],
  dataColumns = [],
})  => (
  <>
    <DataTableStyled.Table>
      <DataTableStyled.Row>
        {dataColumns.map((option) => (
          <DataTableStyled.Cell key={option[0]}>{option[1]}</DataTableStyled.Cell>
        ))}
      </DataTableStyled.Row>

      { data && data.map((dataPoint) => (
        <DataTableStyled.Row key={dataPoint.id}>
          {dataColumns.map((option) => (
            <DataTableStyled.Cell key={option[0]}>{dataPoint[option[0]]}</DataTableStyled.Cell>
          ))}
        </DataTableStyled.Row>
      ))}
    </DataTableStyled.Table>
  </>
)

export default DataTable;
