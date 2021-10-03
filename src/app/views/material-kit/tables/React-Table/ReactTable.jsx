import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './EnhancedTable'
import makeData from './exampledata.json'

const App = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
            },
        ],
        []
    )

    const [data, setData] = React.useState(makeData)
    const [skipPageReset, setSkipPageReset] = React.useState(false)

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
            <pre
                style={{
                    fontSize: '10px',
                }}
            >
                <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
            </pre>
        ),
        []
    )

    return (
        <div>
            <CssBaseline />
            <EnhancedTable
                columns={columns}
                data={data}
                setData={setData}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
                useFilter
                renderRowSubComponent={renderRowSubComponent}
                getRowProps={row => ({
                    style: {
                        background: row.index % 2 === 0 ? 'rgba(0,0,0,.1)' : 'white',
                    },
                })}
                getCellProps={cellInfo => ({
                    style: {
                        backgroundColor: `hsl(${120 * ((120 - cellInfo.value) / 120) * -1 +
                            120}, 100%, 67%)`,
                    },
                })}
            />
        </div>
    )
}

export default App
