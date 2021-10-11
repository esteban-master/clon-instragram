import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Dialog } from '@headlessui/react'
import { useCreatePost } from '../../gql/post'
import { toast } from 'react-toastify'
import { useQueryClient } from 'react-query'
const CreatePostModal = ({ isOpen, setIsOpen, userId, username }: any) => {
  const createPost = useCreatePost()
  const queryClient = useQueryClient()

  const [filePreview, setFilePreview] = useState<any>({
    file: '',
    preview: ''
  })
  const [description, setDescription] = useState('')

  const onDropAccepted = useCallback((acceptedFiles) => {
    // Do something with the files
    // console.log('QUE SALE: ', acceptedFiles)
    setFilePreview({
      file: acceptedFiles[0],
      preview: URL.createObjectURL(acceptedFiles[0])
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: 'image/jpeg, image/png',
    multiple: false,
    noKeyboard: true
  })

  function publicar() {
    const reader = new FileReader()
    reader.readAsDataURL(filePreview.file)
    reader.onloadend = () => {
      if (reader.result) {
        uploadImage(reader.result.toString())
      }
    }
  }

  async function uploadImage(base64EncodedImage: string) {
    createPost.mutate(
      {
        text: description,
        photo: base64EncodedImage,
        postedBy: userId
      },
      {
        onSuccess: (data, variables, ctx) => {
          setFilePreview({
            file: '',
            preview: ''
          })
          setDescription('')
          setIsOpen(false)
          const posts: any = queryClient.getQueryData(['posts', username])
          if (posts) {
            console.log(posts, 'DATA: ', data, posts.concat(data), [
              'posts',
              username
            ])
            const newsPost = [data, ...posts]
            queryClient.setQueryData(['posts', username], newsPost)
          }
          toast.success(`Post creado!`)
        },
        onError: (err, variables, ctx) => {
          console.log('ERRORES: ', err, variables)
        }
      }
    )
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center  min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-2xl p-3 mx-auto flex flex-col space-y-2">
          <Dialog.Title className="text-3xl">Agregar Post</Dialog.Title>
          <Dialog.Description>
            Crea un post seleccionando una imagen con una descripcion opcional
          </Dialog.Description>
          <div>
            <label htmlFor="text_post" className="font-semibold">
              Descripcion
              <span className="text-xs text-gray-500 ml-2">Opcional</span>
            </label>
            <textarea
              id="text_post"
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md block resize-y w-full max-h-32 p-2 focus:outline-none focus:border-2"
            ></textarea>
          </div>
          <div
            {...getRootProps()}
            className={`${
              !filePreview.preview && ' cursor-pointer border-gray-300 p-2 px-5'
            } h-auto  flex items-center justify-center bg-gray-200 border`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta la imagen aquí ...</p>
            ) : (
              <>
                {filePreview.preview ? (
                  <div>
                    <img src={filePreview.preview} alt="Imagen a subir" />
                  </div>
                ) : (
                  <p className="flex flex-col items-center">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    Arrastre y suelte la imagen aquí, o haga clic para
                    seleccionar una imagen
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                setIsOpen(false)
              }}
              className="bg-red-600 text-white font-semibold py-1 px-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={publicar}
              disabled={!filePreview.file}
              className="bg-blue-600 text-white font-semibold py-1 px-2 rounded"
            >
              {createPost.isLoading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default CreatePostModal
