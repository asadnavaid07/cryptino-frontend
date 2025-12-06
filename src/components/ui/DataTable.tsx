import React from 'react'

interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  isLoading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

export default function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  isLoading,
  emptyMessage = 'No data found',
  onRowClick
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="card p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key as string} 
                  className={`table-header text-left ${col.className || ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id} 
                className={`table-row ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td 
                    key={`${item.id}-${col.key as string}`} 
                    className={`table-cell ${col.className || ''}`}
                  >
                    {col.render 
                      ? col.render(item) 
                      : String(item[col.key as keyof T] ?? '-')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
