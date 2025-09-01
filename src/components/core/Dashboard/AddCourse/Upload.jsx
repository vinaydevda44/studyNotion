import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  edit = false,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const { course } = useSelector((state) => state.course)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: video ? { "video/*": [] } : { "image/*": [] },
  })

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewSource(reader.result)
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    if (selectedFile) {
      setValue(name, selectedFile)
    }
  }, [selectedFile, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-yellow-100" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className="cursor-pointer rounded-md border border-dashed border-richblack-500 bg-richblack-700 p-6"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <FiUploadCloud className="text-2xl text-yellow-50" />
          <p className="text-sm text-richblack-200">
            Drag & drop or <span className="font-semibold text-yellow-50">Browse</span> to upload
          </p>
          <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
            <li>Aspect ratio 16:9</li>
            <li>Recommended size 1024x576</li>
          </ul>
        </div>
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

      {previewSource && (
        <div className="mt-4">
          {video ? (
            <ReactPlayer url={previewSource} controls width="100%" height="300px" />
          ) : (
            <img src={previewSource} alt="Preview" className="max-h-[300px]" />
          )}
        </div>
      )}

      {edit && !previewSource && viewData && (
        <div className="mt-4">
          {video ? (
            <ReactPlayer url={viewData} controls width="100%" height="300px" />
          ) : (
            <img src={viewData} alt="Preview" className="max-h-[300px]" />
          )}
        </div>
      )}
    </div>
  )
}
