import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category._id) // FIXED
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    )
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      formData.append("courseId", course._id)

      if (data.courseTitle !== course.courseName)
        formData.append("courseName", data.courseTitle)
      if (data.courseShortDesc !== course.courseDescription)
        formData.append("courseDescription", data.courseShortDesc)
      if (data.coursePrice !== course.price)
        formData.append("price", data.coursePrice)
      if (data.courseTags.toString() !== course.tag.toString())
        formData.append("tag", JSON.stringify(data.courseTags))
      if (data.courseBenefits !== course.whatYouWillLearn)
        formData.append("whatYouWillLearn", data.courseBenefits)
      if (data.courseCategory !== course.category._id)
        formData.append("category", data.courseCategory)
      if (
        data.courseRequirements.toString() !== course.instructions.toString()
      )
        formData.append(
          "instructions",
          JSON.stringify(data.courseRequirements)
        )
      if (data.courseImage !== course.thumbnail) {
        if (data.courseImage instanceof File) {
          formData.append("thumbnailImage", data.courseImage)
        } else {
          toast.error("Please upload a valid image file")
          return
        }
      }

      setLoading(true)
      const result = await editCourseDetails(formData, token)
      setLoading(false)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    } else {
      formData.append("courseName", data.courseTitle)
      formData.append("courseDescription", data.courseShortDesc)
      formData.append("price", data.coursePrice)
      formData.append("tag", JSON.stringify(data.courseTags))
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", JSON.stringify(data.courseRequirements))

      if (data.courseImage instanceof File) {
        formData.append("thumbnailImage", data.courseImage)
      } else {
        toast.error("Please upload a valid image file")
        return
      }

      setLoading(true)
      const result = await addCourseDetails(formData, token)
      setLoading(false)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-yellow-100">
          Course Title <sup className="text-pink-200 ">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="form-style w-full bg-white rounded-md p-1"
        />
        {errors.courseTitle && (
          <span className="text-xs text-pink-200">Course title is required</span>
        )}
      </div>

      {/* Course Short Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-yellow-100">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          className="form-style min-h-[130px] resize-none  bg-white rounded-md p-1"
        />
        {errors.courseShortDesc && (
          <span className="text-xs text-pink-200">
            Course Description is required
          </span>
        )}
      </div>

      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-yellow-100">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12  bg-white rounded-md p-1"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.coursePrice && (
          <span className="text-xs text-pink-200">Course Price is required</span>
        )}
      </div>

      {/* Course Category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-yellow-100">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          className="form-style w-full  bg-white rounded-md p-1"
          defaultValue=""
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            courseCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="text-xs text-pink-200">Category is required</span>
        )}
      </div>

      {/* Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Upload Thumbnail */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="text-sm text-yellow-100">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits"
          {...register("courseBenefits", { required: true })}
          className="form-style min-h-[130px] resize-none bg-white rounded-md p-1"
        />
        {errors.courseBenefits && (
          <span className="text-xs text-pink-200">Benefits are required</span>
        )}
      </div>

      {/* Requirements */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-md bg-richblack-300 px-4 py-2 font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={editCourse ? "Save Changes" : "Next"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
