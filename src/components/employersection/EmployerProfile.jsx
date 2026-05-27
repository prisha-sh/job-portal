import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getEmployer, setEmployerDetails, updateEmployerProfile } from "../../services/apicalls/authApi";
import { setUserData, setUserId } from "../../redux/slices/authSlice";
import LoadingScreen from "../LoadingScreen"
import { FaBellSlash } from "react-icons/fa";

export default function EmployerProfileForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [loading,setLoading] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [male, setMale] = useState("true");
  const [org, setOrg] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [country, setCountry] = useState("");
  const [logofile, setLogofile] = useState(null);
  const token2 = useSelector((state) => state.auth.token);
  const [previewUrl, setPreviewUrl] = useState("");
  const [existingProfile, setExistingProfile] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getEmployer(dispatch, token2);
        console.log(res);
        
        if (res && res.data) {
          setExistingProfile(res.data);
          dispatch(setUserData(res.data));
          setUserId(res.data.employer_id);
          setCity(res.data.city || "");
          setCountry(res.data.country || "");
          setFirstname(res.data.firstname || "");
          setLastname(res.data.lastname || "");
          setOrg(res.data.org || "");
          setStateVal(res.data.state || "");
          setLogofile(res.data.org_avatar);
          
          if (res.data.org_avatar) setPreviewUrl(res.data.org_avatar);
        } else {
          setExistingProfile(null);
        }
      } catch (error) {
        console.error("Error fetching employer:", error);
        setExistingProfile(null);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  }, [token2]);


  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogofile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      setLogofile(null);
      setPreviewUrl("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
    if (existingProfile) {
      // Update existing profile
      await updateEmployerProfile(
        dispatch,
        navigate,
        firstname,
        lastname,
        male,
        org,
        city,
        stateVal,
        country,
        logofile
      );
    } else {
      // Create new profile
      if (!firstname || !lastname || !org || !city || !stateVal || !country || !logofile) {
        toast.error("Please fill all required fields and upload avatar image.");
        return;
      }

      await setEmployerDetails(
        dispatch,
        navigate,
        firstname,
        lastname,
        male,
        org,
        city,
        stateVal,
        country,
        logofile
      );
    }
    setLoading(false)
  };


  return (
    <div>
      {
        (loading)?<LoadingScreen/>: <div className="min-h-screen w-[960px] ml-[95px] flex items-center justify-center p-8">
      <form
        className="w-full  bg-white ml-20 rounded-2xl shadow-2xl p-10 space-y-7 border border-gray-100"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* Avatar preview moved to top */}
        {previewUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={previewUrl}
              alt="Organization Avatar Preview"
              className="w-36 h-36 rounded-full border-8 border-white shadow-xl object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}


        <h2 className="text-4xl font-extrabold text-gray-800 text-center tracking-wide">
          Create Recruiter Profile
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fill in the details to create your professional profile
        </p>


        {[{
          id: "firstname", label: "First Name", value: firstname, setter: setFirstname
        }, {
          id: "lastname", label: "Last Name", value: lastname, setter: setLastname
        }, {
          id: "org", label: "Organization", value: org, setter: setOrg
        }, {
          id: "city", label: "City", value: city, setter: setCity
        }, {
          id: "state", label: "State", value: stateVal, setter: setStateVal
        }, {
          id: "country", label: "Country", value: country, setter: setCountry
        }].map(({ id, label, value, setter }) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id} className="mb-3 font-semibold text-gray-700">{label}</label>
            <input
              id={id}
              name={id}
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              required
              className="border border-gray-300 rounded-lg px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
              style={{ color: '#1a202c' }} // enforce dark text color
            />
          </div>
        ))}


        <div className="flex flex-col">
          <label htmlFor="male" className="mb-3 font-semibold text-gray-700">Gender</label>
          <select
            id="male"
            name="male"
            value={male}
            onChange={(e) => setMale(e.target.value)}
            className="border border-gray-300 rounded-lg px-5 py-3 text-gray-900 focus:outline-none focus:ring-3 focus:ring-blue-400 transition duration-200"
            style={{ color: '#1a202c' }} // enforce dark text color
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>


        <div className="flex flex-col">
          <label htmlFor="logo" className="mb-3 font-semibold text-gray-700">
            Organization image
          </label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            required={!logofile}
            className="border border-gray-300 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-5 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-black transition"
          />
        </div>


        <div className="w-full  flex items-center justify-center">
          <button
          type="submit"
          className="w-[60%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-transform duration-300"
        >
          Save Profile
        </button>
        </div>
      </form>
    </div>
      }
    </div>
   
  );
}
