import React, { useCallback, useContext, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EmptyMessage, Load, LoadCenter } from 'ui/styled';
import { CoreContext } from 'context/CoreContext';
import SideFilters from 'components/Dashboard/SideFilters';
import TableHeader from '../TableHeader';
import CustomTablePagination from '../TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

export default function BasicTable({
  columns,
  fields,
  rows,
  items,
  loading,
  isLoading,
  config,
  options,
}) {
  const safeColumns = columns ?? fields ?? []
  const safeRows = rows ?? items ?? []
  const safeLoading = typeof loading === 'boolean' ? loading : !!isLoading
  const safeConfig = config ?? options ?? {}

  const { pagination, filter: filterable, search: searchable, tabs:tabsable } = safeConfig

  const { sideFilter, setSideFilter } = useContext(CoreContext)

  const [currentTab, setCurrentTab] = useState(0)
  const [currentFilters, setCurrentFilters] = useState(null)
  const [searchExpression, setSearchExpression] = useState("")

  const filterExpression = useCallback(item => {
      return ( !searchExpression || Object.keys(item).filter(k => `${ item[k] }`.toLowerCase().indexOf(searchExpression.toLowerCase()) !== -1 ).length > 0)
  }, [searchExpression])

  const filterFilters = useCallback(item => {
      return !currentFilters || (
          Object.keys(currentFilters)?.filter(key => currentFilters?.[key] === item?.[key]?.documentId || currentFilters?.[key] === item?.[key])?.length === Object.keys(currentFilters)?.length
      )
  }, [currentFilters])

  const filterTab = useCallback((item) => {
      return !currentTab || (
          tabs?.[currentTab]?.id === (tabsable?.all||"Todos") ||
          (tabsable?.options?.[currentTab-1]?.id === item?.[tabsable?.ref] )
      )
  }, [currentTab, tabsable])

  const tabs = useMemo(() => {
    return !tabsable ? null : [
        { id: (tabsable?.all||"Todos"), title:(tabsable?.all||"Todos") },
        ...tabsable?.options
    ]
  }, [tabsable])

  const filterFormItems = useMemo(() => {
    const reduceId = (p, c) => p?.map(m => m?.id)?.includes(c?.id) ? p : [...p, c]
    return (safeColumns||[])?.filter(f => f?.ref && f?.ref !== 'id')?.map( col => ({
        ref: col?.ref,
        label: col?.title,
        placeholder: `Selecione ${ col?.title }`,
        full: true,
        options: (safeRows||[])?.map(m => ({
          id: m?.[col?.ref],
          title: (typeof col?.parseFilter === 'function' ? col?.parseFilter(m?.[col?.ref]) : m?.[col?.ref])
        }))?.reduce( reduceId , [])
      }))
  }, [safeRows, safeColumns])

  const filtredRows = useMemo(() => {
    return safeRows?.filter(filterTab)?.filter(filterExpression)?.filter(filterFilters)
  }, [safeRows, filterTab, filterExpression, filterFilters])

  const onPageChange = (e, p) => { if(typeof pagination?.setPage === 'function'){pagination?.setPage(p);} }

  return (
    <>

        <TableHeader
          tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab}
          searchExpression={searchable && searchExpression} setSearchExpression={searchable && setSearchExpression}
          query={searchExpression} setQuery={setSearchExpression} onSearchChange={setSearchExpression}
          isActive={filterable && sideFilter} setIsActive={filterable && setSideFilter}
          filtersOpen={sideFilter} setFiltersOpen={setSideFilter} onToggleFilters={setSideFilter}
          filterLabel={filterable?.placeholder} searchLabel={searchable?.placeholder} />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {
                    safeColumns?.map((item, key) =>
                        <StyledTableCell key={key}  align={key === 0 ? "left" : "right" } >{ item.title }</StyledTableCell>
                    )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {filtredRows.map((row, rowIndex) => (
                <TableRow
                  key={row?.id || row?.documentId || row?.name || rowIndex}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {
                        safeColumns?.map((item, key) =>
                            <TableCell key={key} align={ key === 0 ? "left" :  "right" } >
                                { item?.['renderCell'] ? item.renderCell({row}) : row?.[item.ref] }
                            </TableCell>
                        )
                    }
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {
            !safeLoading ? <>
              { filtredRows?.length ? null : <EmptyMessage>Nenhum registro encontrado</EmptyMessage> }
            </> : <LoadCenter><Load /></LoadCenter>
          }
        </TableContainer>
        {!pagination || !filtredRows?.length || pagination?.pageCount < 2 ? null : <CustomTablePagination count={pagination?.total} page={pagination?.page} rowsPerPage={pagination?.pageSize} onPageChange={onPageChange} onChangePage={onPageChange} /> }
        <SideFilters formItems={filterFormItems} filters={filterFormItems} isActive={sideFilter} open={sideFilter} setIsActive={setSideFilter} setOpen={setSideFilter} currentFilters={currentFilters} values={currentFilters} setCurrentFilters={setCurrentFilters} setValues={setCurrentFilters} onChange={setCurrentFilters} />
    </>
  );
}
