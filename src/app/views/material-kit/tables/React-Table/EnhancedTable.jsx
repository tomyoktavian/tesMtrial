import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import MaUTable from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import {
    Collapse,
    TextField,
    Icon
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableToolbar from './TableToolbar'
import {
    useExpanded,
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table'

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        )
    }
)

// const inputStyle = {
//     padding: 0,
//     margin: 0,
//     border: 0,
//     background: 'transparent',
// }

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData, // This is a custom function that we supplied to our table instance
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <TextField
            // style={inputStyle}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            size="small"
            variant="outlined"
            label="..."></TextField>
    )
}


// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <TextField
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
            inputProps={{ 'aria-label': 'search' }}
        />
    )
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell,
    Filter: DefaultColumnFilter,
}

// Create a default prop getter
const defaultPropGetter = () => ({})

const EnhancedTable = ({
    columns,
    data,
    setData,
    updateMyData,
    skipPageReset,
    renderRowSubComponent,
    useFilter,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}) => {
    const [open, setOpen] = React.useState(false);
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        preGlobalFilteredRows,
        setGlobalFilter,
        visibleColumns,
        state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            autoResetPage: !skipPageReset,
            updateMyData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                {
                    Header: () => null, // No header
                    id: 'expander', // It needs an ID
                    Cell: ({ row }) => (
                        <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? (
                                <IconButton aria-label="Hide" onClick={() => setOpen(!open)}>
                                    <Icon >{`keyboard_arrow_down`}</Icon>
                                </IconButton>
                            ) : (
                                <IconButton aria-label="Show" onClick={() => setOpen(!open)}>
                                    <Icon >{`keyboard_arrow_right`}</Icon>
                                </IconButton>
                            )}
                        </span>
                    ),
                },
                ...columns,
            ])
        }
    )

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setPageSize(Number(event.target.value))
    }

    const removeByIndexs = (array, indexs) =>
        array.filter((_, i) => !indexs.includes(i))

    const deleteUserHandler = event => {
        const newData = removeByIndexs(
            data,
            Object.keys(selectedRowIds).map(x => parseInt(x, 10))
        )
        setData(newData)
    }

    const addUserHandler = user => {
        const newData = data.concat([user])
        setData(newData)
    }

    // Render the UI for your table
    return (
        <TableContainer>
            <TableToolbar
                numSelected={Object.keys(selectedRowIds).length}
                deleteUserHandler={deleteUserHandler}
                addUserHandler={addUserHandler}
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
            />
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell
                                    {...(column.id === 'selection'
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps([
                                            {
                                                className: column.className,
                                                style: column.style,
                                            },
                                            getColumnProps(column),
                                            getHeaderProps(column),
                                            column.getSortByToggleProps(),
                                        ]))}
                                >
                                    {column.render('Header')}
                                    {column.id !== 'selection' ? (
                                        <TableSortLabel
                                            active={column.isSorted}
                                            direction={column.isSortedDesc ? 'desc' : 'asc'}
                                        />
                                    ) : null}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {useFilter && headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <TableCell {...column.getHeaderProps()}>
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <>
                                <TableRow {...row.getRowProps(getRowProps(row))}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps([
                                                {
                                                    className: cell.column.className,
                                                    style: cell.column.style,
                                                },
                                                getColumnProps(cell.column),
                                                getCellProps(cell),
                                            ])}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                                {row.isExpanded ? (
                                    <TableRow>
                                        <TableCell colSpan={visibleColumns.length}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                            {renderRowSubComponent({ row })}
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                ) : null}
                            </>
                        )
                    })}
                </TableBody>
            </MaUTable>
            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </TableContainer>
    )
}

EnhancedTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    updateMyData: PropTypes.func.isRequired,
    setData: PropTypes.func.isRequired,
    skipPageReset: PropTypes.bool.isRequired,
    renderRowSubComponent: PropTypes.func.isRequired,
    useFilter: PropTypes.bool.isRequired,
    // getHeaderProps: PropTypes.func.isRequired,
    // getColumnProps: PropTypes.func.isRequired,
    // getRowProps: PropTypes.func.isRequired,
    // getCellProps: PropTypes.func.isRequired,
}

export default EnhancedTable
