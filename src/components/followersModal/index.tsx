import React, { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useFollowers } from '../../gql/follow'
import { Link } from 'react-router-dom'
import FollowUnFollow from '../followUnFollow'
import { useAuth } from '../../redux/store'

const FollowersModal = ({ isOpen, setIsOpen, userId }: any) => {
  let completeButtonRef = useRef(null)
  const auth = useAuth()
  const followers = useFollowers(userId, auth.login.user?._id, isOpen)
  return (
    <Dialog
      open={isOpen}
      initialFocus={completeButtonRef}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center  min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-2xl p-3 mx-auto flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl">Followers</Dialog.Title>
            <svg
              ref={completeButtonRef}
              onClick={() => {
                setIsOpen(false)
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 cursor-pointer text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {followers.isLoading && <div>Cargando usuarios...</div>}
          {followers.status === 'success' && (
            <ul className="h-40 w-96 overflow-y-auto px-3">
              {followers.data?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.data.map(({ userId: user, isFollow }: any, i: any) => (
                    <li
                      key={user._id}
                      className="flex justify-between items-center "
                    >
                      <div className="flex items-center space-x-2">
                        <div>
                          <img
                            className="rounded-full h-7 w-7 object-cover"
                            src={user.avatar ? user.avatar : '/avatar.png'}
                            alt=""
                          />
                        </div>
                        <div>
                          <Link
                            className="font-semibold text-sm"
                            onClick={() => setIsOpen(false)}
                            to={`/${user.username}`}
                          >
                            {user.username}
                          </Link>
                          <span className="block text-xs text-gray-600">
                            {user.name}
                          </span>
                        </div>
                      </div>
                      <div>
                        <FollowUnFollow
                          userIdReq={userId}
                          userId={user._id}
                          isFollow={isFollow}
                        />
                      </div>
                    </li>
                  ))}
                </React.Fragment>
              ))}

              <button
                disabled={!followers.hasNextPage}
                onClick={() => followers.fetchNextPage()}
              >
                {followers.isFetchingNextPage
                  ? 'Cargando mas...'
                  : followers.hasNextPage
                  ? 'Cargar mas'
                  : 'No hay mas para mostrar'}
              </button>
            </ul>
          )}
        </div>
      </div>
    </Dialog>
  )
}

export default FollowersModal
