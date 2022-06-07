import React from 'react';
import DataGrid, {Column, RowDragging, Scrolling, Lookup} from 'devextreme-react/data-grid';

const Grid = ({dataSource, status}: any) => {
    const [filterExpr, setStatus] = React.useState(['Status', '=', status])
    const onAdd = () => {

    }
    return <DataGrid dataSource={dataSource}
        height={440}
        showBorders={true}
        filterValue={ 
            filterExpr
        }
        columns={
            
        }
        >
        <RowDragging data={status}
            group="tasksGroup"
            onAdd={onAdd}/>
        <Scrolling mode="virtual"/>
        <Column dataField="Subject" dataType="string"/>
        <Column dataField="Priority" dataType="number"/>
        <Column dataField="Status" dataType="number"
            visible={false}/>

    </DataGrid>
}

export default Grid;
