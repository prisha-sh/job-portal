import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, setUserProfile, updateUserProfile } from "../services/apicalls/authApi";
import { toast } from "react-hot-toast";
import { setRole, setUserData, setUserId } from "../redux/slices/authSlice";
import LoadingScreen from "./LoadingScreen";
const ProfileSetter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    country: "",
    tenthPercentage: "",
    twelfthPercentage: "",
    undergradCourse: "",
    undergradCGPA: "",
    undergradInstitute: "",
    postgradCourse: "",
    postgradCGPA: "",
    postgradInstitute: "",
    resume: null
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getUser(dispatch, token);
        const data = res.data;
        dispatch(setUserData(data));
        dispatch(setUserId(data.user_id));
        dispatch(setRole("user"));
        setExists(true);
        setFormData({
          profilePicture: data.user_avatar_link,
          firstName: data.firstname,
          lastName: data.lastname,
          age: data.age,
          gender: data.male ? "male" : "female",
          city: data.city,
          state: data.state,
          country: data.country,
          tenthPercentage: data["10th_percentage"],
          twelfthPercentage: data["12_percentage"],
          undergradCourse: data.undergrad_degree,
          undergradCGPA: data.undergrad_cgpa,
          undergradInstitute: data.undergrad_institute,
          postgradCourse: data.postgrad_degree,
          postgradCGPA: data.postgrad_cgpa,
          postgradInstitute: data.postgrad_institute,
          resume: data.resume_link
        });
        if (data.user_avatar_link) {
          setProfilePreview(data.user_avatar_link);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          setExists(false);
        } else {
          console.error("Error fetching profile:", err);
       
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [dispatch, token]);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profilePicture: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== "application/pdf") {
      toast.error("Please upload a PDF resume.");
      e.target.value = "";
      return;
    }
    setFormData(prev => ({ ...prev, resume: file }));
    setResumeFileName(file?.name || "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) {
      toast.error("Please enter first and last name.");
      return;
    }
    if (!formData.resume) {
      toast.error("Please upload resume (PDF).");
      return;
    }
    setLoading(true);
    try {
      let res;
      if (exists) {
        res = await updateUserProfile(
          dispatch,
          navigate,
          formData.firstName,
          formData.lastName,
          formData.age ? Number(formData.age) : "",
          formData.gender === "male",
          formData.city,
          formData.state,
          formData.country,
          formData.tenthPercentage,
          formData.twelfthPercentage,
          formData.undergradCGPA,
          formData.undergradInstitute,
          formData.postgradCGPA,
          formData.postgradInstitute,
          formData.undergradCourse,
          formData.postgradCourse,
          formData.resume,
          formData.profilePicture
        );
      } else {
        res = await setUserProfile(
          dispatch,
          navigate,
          formData.firstName,
          formData.lastName,
          formData.age ? Number(formData.age) : "",
          formData.gender === "male",
          formData.city,
          formData.state,
          formData.country,
          formData.tenthPercentage,
          formData.twelfthPercentage,
          formData.undergradCGPA,
          formData.undergradInstitute,
          formData.postgradCGPA,
          formData.postgradInstitute,
          formData.undergradCourse,
          formData.postgradCourse,
          formData.resume,
          formData.profilePicture
        );
      }
      console.log("save response:", res);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen w-5xl  flex rounded-xl items-center justify-center bg-white p-8 mt-5  ml-10">
      <div className="w-full max-w-4xl bg-white  rounded-lg mx-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-black">Update Your Profile</h1>
          {profilePreview && (
            <div className="flex justify-center mb-6">
              <img
                src={profilePreview}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-gray-200"
              />
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block mb-1 text-black">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block mb-1 text-black">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block mb-1 text-black">Age</label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="Age"
                  min={0}
                />
              </div>
              <div>
                <label htmlFor="gender" className="block mb-1 text-black">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                >
                  <option value="" className="text-black">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block mb-1 text-black">City</label>
                <input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="City"
                />
              </div>
              <div>
                <label htmlFor="state" className="block mb-1 text-black">State</label>
                <input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="State"
                />
              </div>
              <div>
                <label htmlFor="country" className="block mb-1 text-black">Country</label>
                <input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="Country"
                />
              </div>
            </div>

            {/* Academics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="tenthPercentage" className="block mb-1 text-black">10th %</label>
                <input
                  id="tenthPercentage"
                  name="tenthPercentage"
                  value={formData.tenthPercentage}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="10th %"
                />
              </div>
              <div>
                <label htmlFor="twelfthPercentage" className="block mb-1 text-black">12th %</label>
                <input
                  id="twelfthPercentage"
                  name="twelfthPercentage"
                  value={formData.twelfthPercentage}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                  placeholder="12th %"
                />
              </div>
            </div>

            {/* Undergraduate */}
            <div className="border-t pt-4">
              <h2 className="font-semibold mb-3 text-black">Undergraduate</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="undergradCourse" className="block mb-1 text-black">Degree</label>
                  <select
                    id="undergradCourse"
                    name="undergradCourse"
                    value={formData.undergradCourse}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                  >
                    <option value="" className="text-black">Degree</option>
                    {["B.Sc","B.Tech","B.E","B.Com","B.A","BCA","Other"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="undergradCGPA" className="block mb-1 text-black">CGPA</label>
                  <input
                    id="undergradCGPA"
                    name="undergradCGPA"
                    value={formData.undergradCGPA}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                    placeholder="CGPA"
                  />
                </div>
                <div>
                  <label htmlFor="undergradInstitute" className="block mb-1 text-black">Institute</label>
                  <input
                    id="undergradInstitute"
                    name="undergradInstitute"
                    value={formData.undergradInstitute}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                    placeholder="Institute"
                  />
                </div>
              </div>
            </div>

            {/* Postgraduate */}
            <div className="border-t pt-4">
              <h2 className="font-semibold mb-3 text-black">Postgraduate (if any)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="postgradCourse" className="block mb-1 text-black">Degree</label>
                  <select
                    id="postgradCourse"
                    name="postgradCourse"
                    value={formData.postgradCourse}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black"
                  >
                    <option value="" className="text-black">Degree</option>
                    {["M.Sc","M.Tech","M.E","M.Com","M.A","MCA","MBA","Other"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="postgradCGPA" className="block mb-1 text-black">CGPA</label>
                  <input
                    id="postgradCGPA"
                    name="postgradCGPA"
                    value={formData.postgradCGPA}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                    placeholder="CGPA"
                  />
                </div>
                <div>
                  <label htmlFor="postgradInstitute" className="block mb-1 text-black">Institute</label>
                  <input
                    id="postgradInstitute"
                    name="postgradInstitute"
                    value={formData.postgradInstitute}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 w-full text-black placeholder-black"
                    placeholder="Institute"
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Profile Picture Card */}
  <div className="flex flex-col items-center p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition">
    <span className="text-2xl mb-2">📷</span>
    <label htmlFor="profilePicture" className="cursor-pointer text-black font-medium">
      Upload Profile Picture
    </label>
    <input
      id="profilePicture"
      type="file"
      accept="image/*"
      onChange={handleProfileFileChange}
      className="mt-2 text-black border-2 border-gray-600 border-dashed rounded-xl p-1"
      name="profilePicture"
    />
    {profilePreview && (
      <img
        src={profilePreview}
        alt="Preview"
        className="mt-4 h-20 w-20 rounded-full object-cover border border-gray-200"
      />
    )}
  </div>

  {/* Resume Card */}
  <div className="flex flex-col items-center p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500 transition">
    <span className="text-2xl mb-2">📄</span>
    <label htmlFor="resume" className="cursor-pointer text-black font-medium">
      Upload Resume (PDF)
    </label>
    <input
      id="resume"
      type="file"
      accept="application/pdf"
      onChange={handleResumeChange}
      className="mt-2 text-black border-2 border-gray-600 border-dashed rounded-xl p-1"
      name="resume"
    />
    {resumeFileName && (
      <div className="mt-4 flex items-center space-x-2">
        <span className="text-black">{resumeFileName}</span>
        <button
          type="button"
          onClick={() => { setFormData(prev => ({ ...prev, resume: null })); setResumeFileName(""); }}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    )}
  </div>
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
      </div>
    </div>
  );
};

export default ProfileSetter;
