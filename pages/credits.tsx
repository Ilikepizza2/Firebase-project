import React from 'react'
import type { NextPage } from 'next'
import { useTable, usePagination } from 'react-table'

import firebase from '../firebase/clientApp'

import Navbar from './components/Navbar'

const Credits: NextPage = () => {
  function Table({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    )

    // Render the UI for your table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={index}
                className="bg-slate-400 dark:bg-zinc-600"
              >
                {headerGroup.headers.map((column, index) => (
                  <th {...column.getHeaderProps()} key={index}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: any) => {
              prepareRow(row)
              return (
                <tr
                  {...row.getRowProps()}
                  key={i}
                  className="even:bg-slate-200 dark:even:bg-zinc-700"
                >
                  {row.cells.map((cell: any, index: any) => {
                    return (
                      <td {...cell.getCellProps()} key={index}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination my-10 flex gap-6">
          <div className="flex gap-2">
            <button
              className="w-8 rounded-xl bg-slate-300 hover:bg-slate-500"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </button>{' '}
            <button
              className="w-8 rounded-xl bg-slate-300 hover:bg-slate-500"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </button>{' '}
            <button
              className="w-8 rounded-xl bg-slate-300 hover:bg-slate-500"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'>'}
            </button>{' '}
            <button
              className="w-8 rounded-xl bg-slate-300 hover:bg-slate-500"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
          </div>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              className="rounded-md bg-slate-300 px-2 py-1 dark:bg-zinc-500"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            className="rounded-md bg-slate-300 px-2 py-1 dark:bg-zinc-500"
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  }
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'Credits',
        accessor: 'credit',
      },
    ],

    []
  )
  const [data, setData] = React.useState<any>([])
  const [fetched, setFetched] = React.useState<any>([])
  React.useEffect(() => {
    // Create a reference to the RFPs in the database
    const firestoreArr = firebase.firestore().collection('Credits')

    // Listen for changes to the RFPs collection
    firestoreArr.onSnapshot((querySnapshot) => {
      const items: any[] = []
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setData(items)
      setFetched(items)
    })
  }, [])
  const [inputText, setInputText] = React.useState('')
  let inputHandler = (e: any) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase()
    setInputText(lowerCase)
  }
  function searchFunc() {
    //search for the input text in the data
    setData(data.filter((item: any) => item.name.toLowerCase().includes(inputText)))
    if (inputText.length === 0) {
      setData(fetched)
    }
  }
  return (
    <div className={'h-100 mr-auto'}>
      <Navbar />
      <h1 className="table-heading">Credits</h1>
      <div className="search flex justify-center">
        <div className="w-1/2">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={inputHandler}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              onClick={() => {
                searchFunc()
              }}
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="table-container">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Credits
