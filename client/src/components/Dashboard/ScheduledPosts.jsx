import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select'

const ScheduledPosts = () => {
  const {authUser} = useSelector((state) => state.auth)
  const [platforms, setPlatforms] = useState([])
  const [scheduleNow, setscheduleNow] = useState(false)
  const [postForm, setForm] = useState({
    platforms: [],
    caption: '',
    images: [],
    status: 'Scheduled',
    scheduleDate: '',
    isScheduled: scheduleNow,
    user: ''

  })
  const options = [
    {values: 'facebook', label: 'Facebook'},
    {values: 'linkedin', label: 'LinkedIn'},
    {values: 'instagram', label: 'Instagram'},
    {values: 'twitter', label: 'Twitter'},
  ]

  const handleOptions = (option) => {
    setPlatforms(option)
  }
  return (
    <div className="flex border-2 border-white">
      <div className="flex w-full flex-col">
      <div className="h-12 relative flex rounded-xl">
          <Select
          options={options}
          value={platforms}
          onChange={(e)=>handleOptions(e.value)}
          className="w-full bg-gray-800 text-white text-[14px] outline-none px-4 rounded-xl valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
            id="last"
            type="text"
          isMulti= {true}
          />
          {/* <label
            className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] duration-150"
            htmlFor="last"
          >
            Platforms
          </label> */}
        </div>
        <div className="h-12 relative flex rounded-xl">
          <input
            className="peer w-full text-white text-[14px] outline-none px-4 rounded-xl bg-black valid:bg-transparent valid:ring-1 valid:ring-[#5ef882] focus:bg-transparent focus:ring-2 focus:ring-[#ffffff]"
            id="last"
            type="text"
          />
          <label
            className="absolute top-1/2 translate-y-[-50%] text-[#a9a9a9] left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#fff] peer-valid:top-[-4px] peer-focus:bg-gray-900 peer-valid:bg-gray-900 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#5ef882] duration-150"
            htmlFor="last"
          >
            Caption
          </label>
        </div>
      </div>
    </div>
  );
};

export default ScheduledPosts;
