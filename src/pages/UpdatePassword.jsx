
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();


    const [formData, setFormData] = useState({password: "", confirmPassword: ""})

    const {password, confirmPassword} = formData


    const onChangeHandler = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name] : event.target.value
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(location.pathname)
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));

    }

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? 
                        (<div className = "loader"></div>) :
                        (
                            <div className="max-w-[500px] p-4 lg:p-8">
                                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                                    Create New Password
                                </h1>

                                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                                    Almost done. Enter your new password and you are all set.
                                </p>

                                <form onSubmit={onSubmitHandler}>
                                    <label className="relative">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            New Password <sup className = "text-pink-200">*</sup>
                                        </p>

                                        <input
                                           required
                                           type = {showPassword ? "text" : "password"}
                                           name = "password"
                                           value = {password}
                                           onChange={onChangeHandler}
                                           placeholder = "Enter new password"
                                           className="form-style w-full !pr-10 relative bg-richblack-800 rounded-sm p-2 px-3 placeholder:text-richblack-200 text-richblack-5 focus:border-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                                        />
                                        
                                        <span className="absolute left-98 top-[32px] z-[10] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                                            {
                                                showPassword ? 
                                                             (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
                                                             (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                            }
                                        </span>
                                    </label>

                                    <label className="relative mt-3 block">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Confirm New Password <sup className = "text-pink-200">*</sup>
                                        </p>

                                        <input
                                           required
                                           type = {showConfirmPassword ? "text" : "password"}
                                           name = "confirmPassword"
                                           value = {confirmPassword}
                                           onChange={onChangeHandler}
                                           placeholder = "Confirm new password"
                                           className="form-style w-full !pr-10 bg-richblack-800 rounded-sm p-2 px-3 placeholder:text-richblack-200 text-richblack-5 focus:border-yellow-50 focus:outline-none focus:ring-1 focus:ring-yellow-50"
                                        />
                                        <span className="absolute right-3 top-[32px] z-[10] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                            {
                                                showConfirmPassword ? 
                                                             (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) :
                                                             (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                            }
                                        </span>
                                    </label>

                                    <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900" type = "submit">
                                        Reset Password
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center justify-between">
                                    <Link to="/login">
                                    <p className="flex items-center gap-x-2 text-richblack-5">
                                        <BiArrowBack /> Back To Login
                                    </p>
                                    </Link>
                                </div>
                            </div>

                        )
            }
        </div>
    )
}

export default UpdatePassword
