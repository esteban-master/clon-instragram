import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  of
} from 'rxjs'

import { useSearchUsers } from '../../gql/user'

const Search = () => {
  const searchRef = useRef(null)
  const [search, setSearch] = useState('')
  const { data, isLoading, error, status } = useSearchUsers(search)

  useEffect(() => {
    const input$ = fromEvent<KeyboardEvent<HTMLInputElement>>(
      searchRef.current!,
      'keyup'
    )

    const subs = input$
      .pipe(
        debounceTime(500),
        map<KeyboardEvent<HTMLInputElement>, string>((e) => {
          const target = e.target as HTMLInputElement
          return target.value
        }),
        distinctUntilChanged(),
        switchMap((search) => of(search))
      )
      .subscribe((search) => {
        setSearch(search)
      })
    return () => {
      subs.unsubscribe()
    }
  }, [])

  return (
    <div className="relative">
      <input
        type="text"
        id="buscar"
        placeholder="Buscar"
        ref={searchRef}
        className={`focus:outline-none outline-none w-32 md:w-96 py-0 px-2 border-2 border-gray-300 rounded-sm ${
          search && 'border-b-0'
        }`}
      />
      {status === 'success' && search.length > 0 && (
        <div className="absolute border-2 border-gray-300 border-t-0  w-full px-2 bg-white overflow-y-auto h-52">
          {data.length ? (
            <ul>
              {data.map(({ username }: any) => (
                <Link
                  onClick={() => setSearch('')}
                  key={username}
                  className="cursor-pointer border-t-2 flex items-center space-x-2 py-2 font-bold hover:underline"
                  to={`/${username}`}
                >
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={data.avatar ? data.avatar : '/avatar.png'}
                    alt=""
                  />
                  <span>{username}</span>
                </Link>
              ))}
            </ul>
          ) : (
            <ul>
              <li className="cursor-pointer border-b "> Sin resultados </li>
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Search
