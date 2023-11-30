import React, { lazy } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TbFilePlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { ImNewspaper } from "react-icons/im";
import { AiFillCloseCircle } from "react-icons/ai";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import moment from "moment";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  useRegisterNewsMutation,
  useUpdateNewsDetailsMutation,
  useGetAllNewsQuery,
  useDeleteNewsDetailsMutation,
} from "../../../../services/news";
import Pagination from 'react-responsive-pagination'
import '../../../../Component/Pagination/pagination.css'

const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

function isValidFileType(fileName, fileType) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const newsSchema = Yup.object({
  photo: Yup.mixed()
    .required('Please select an image')
    .test("is-valid-type", "Logo should be in jpg, jpeg or png format",
      value => {
        return isValidFileType(value && value.name.toLowerCase(), "image")
      })
    .test("is-valid-size", "Max allowed size is 2MB", value => {
      if (!value) {
        return true;
      }
      return value && value.size <= 2097152
    }),
  title: Yup.string().required("Please enter title"),
  tags: Yup.string().required("Please enter tags"),
  description: Yup.string().required("Please enter description"),
});

const NewsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [model, setModel] = React.useState(false);
  const [newsRegistration, { ...thing }] = useRegisterNewsMutation();
  const [newsUpdate, { ...updateData }] = useUpdateNewsDetailsMutation();
  const [deleteNewsDetails, { ...deleteNews }] = useDeleteNewsDetailsMutation()
  const [pageNo, setPageNo] = React.useState(1);

  const initialValues = {
    photo: "",
    title: "",
    tags: "",
    description: ""
  }
  const [value, setValue] = React.useState({
    photo: "",
    title: "",
    tags: "",
    description: "",
  });

  const { isLoading, data, refetch } = useGetAllNewsQuery({
    pageNo: pageNo - 1,
  });

  const { values, errors, resetForm, handleBlur, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: value ? value : initialValues,
      validationSchema: newsSchema,
      onSubmit(data) {
        try {
          const fd = new FormData();
          fd.append("photo", data.photo);
          let ok = JSON.stringify({
            NewsInfo: data,
          });
          fd.append("data", ok);
          
          newsRegistration(fd).then();
        } catch (err) {
          toast.error(err.message);
        }
      },
    });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure to delete this news?',
      text: "The news will be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: async () => {
        const response = await deleteNewsDetails(id)
        if (response.error) {
          toast.error(response.error.data.message)
        }
        else if (response.data.success) {
          toast.success(response.data.message)
        }
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        refetch()
      }
    })
  };

  const handleUpdate = (id) => {
    let updatenews = data?.AllNews?.find((n) => {
      return n?.id == id;
    });

    setValue(updatenews)
    setModel(true);
  };

  React.useEffect(() => {
    if (thing.isError) {
      toast.error(thing?.error?.data?.message);
    }
    if (thing.isSuccess) {
      if (thing?.data?.success) {
        toast.success(thing.data.message);
        refetch()
        resetForm()
        setModel(false);
      }
    }
  }, [thing.isError, thing.isSuccess]);

  // React.useEffect(() => {
  //   if (newsUpdate.isError) {
  //     toast.error(newsUpdate?.error?.data?.message);
  //   }
  //   if (updateData.isSuccess) {
  //     if (updateData?.data?.success) {
  //       toast.success("News Updated Successfull ");
  //       setModel(false);
  //     }
  //   }
  // }, [updateData.isError, updateData.isSuccess]);

  return (
    <>
      <div className="relative">
        {model && (
          <div className="w-full h-full bg-black  ">
            <div className="flex justify-center shadow-2xl  ">
              <div className="absolute sm:mx-0 w-[90%] xl:w-[75%] opacity-100 shadow-2xl rounded top-5 sm:top-2 md:top-4 lg:top-10 xl:top-10 bg-white z-50 ">
                <div className="">
                  <div className="flex justify-end ">
                    <button
                      onClick={() => {
                        resetForm()
                        setModel(false);
                      }}
                      className="absolute translate-x-4 -translate-y-4 font-bold text-2xl p-2 text-[#571217] "
                    >
                      <AiFillCloseCircle />
                    </button>
                  </div>
                  <div className="  rounded-md  my-5 xl:py-4  px-5 xl:px-10">
                    <h1 className="font-semibold text-lg lg:text-2xl pb-5 xl:pb-10">
                      Add News
                    </h1>
                    <form
                      action=""
                      className=" space-y-5 xl:space-y-10 "
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col lg:flex-row items-center space-y-5 md:space-y-4 lg:space-y-0 lg:space-x-5 xl:space-x-10">
                        <div className="firstname flex flex-col space-y-2 w-full ">
                          <label htmlFor="Firstname">Photo</label>
                          <input
                            type="file"
                            name="photo"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => setFieldValue("photo", e.target.files[0])}
                            className="rounded-md py-[3px] md:py-[3px] w-full xl:py-2 px-3 outline-non border border-slate-300 outline-blue-200"
                          />
                          {errors.photo && touched.photo ? (
                            <p className="form-error text-red-600 text-sm font-semibold">
                              {errors.photo}
                            </p>
                          ) : null}
                        </div>
                        <div className="email flex flex-col space-y-2  w-full ">
                          <label htmlFor="email">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            value={value.title ? value.title : values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-md py-1 md:py-[5px] xl:py-[10px] px-3 outline-non border border-slate-300 outline-blue-200"
                            placeholder="Enter title "
                          />
                          {errors.title && touched.title ? (
                            <p className="form-error text-red-600 text-sm font-semibold">
                              {errors.title}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5 xl:space-x-10">
                        <div className="flex flex-col space-y-2 w-full ">
                          <label htmlFor="phone">Tags</label>
                          <input
                            type="text"
                            name="tags"
                            id="tags"
                            value={value.tags ? value.tags : values.tags}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-md py-1 md:py-[5px] xl:py-[10px] px-3 outline-non border border-slate-300 outline-blue-200"
                            placeholder="Enter tags "
                          />
                          {errors.tags && touched.tags
                            ?
                            <p className='form-error text-red-600 text-sm font-semibold'>{errors.tags}</p>
                            :
                            null}
                        </div>
                        <div className="flex flex-col space-y-2 w-full ">
                          <label htmlFor="Description">Description</label>
                          <input
                            type="text"
                            name="description"
                            id="description"
                            value={value.description ? value.description : values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="rounded-md py-1 md:py-[5px] xl:py-[10px] px-3 w-[100%] outline-non border  border-slate-300 outline-blue-200"
                            placeholder="Enter description "
                          />
                          {errors.description && touched.description ? (
                            <p className="form-error text-red-600 text-sm font-semibold">
                              {errors.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex justify-center items-center w-full space-x-5 ">
                        <button
                          type="submit"
                          disabled={thing.isLoading}
                          className={`${thing.isLoading ? "opacity-60" : ""}
               bg-slate-900   relative inline-flex items-center justify-center  px-4 py-1.5 
              sm:px-8 sm:py-[6px] xl:px-32 xl:py-2 overflow-hidden font-medium tracking-tighter text-white rounded-lg cursor-pointer group`}
                        >
                          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ee6730] rounded-lg group-hover:w-full group-hover:h-56"></span>
                          <span className="relative">
                            {thing.isLoading
                              ? "Loading..."
                              : updateData.isLoading
                                ? "Updating..."
                                : location?.state?.isEdit
                                  ? "UPDATE"
                                  : "SUBMIT"}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={`bg-slate-100 ${model && "opacity-10"}`}>
          <div className=" xl:px-10 h-full">
            <div className="flex justify-between py-5 md:py-10 px-5">
              <h1 className=" font-semibold md:text-2xl">News List</h1>
              <button
                onClick={() => {
                  setModel(true);
                }}
                type="submit"
                className="bg-slate-900  relative inline-flex items-center justify-center px-2  sm:px-4  py-1 sm:py-1.5  overflow-hidden font-medium tracking-tighter text-white rounded-lg cursor-pointer group"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#ee6730] rounded-lg group-hover:w-full group-hover:h-56"></span>
                <div className="flex items-center space-x-2">
                  <span className="relative text-[10px] sm:text-xs md:text-sm xl:text-base">
                    Add News
                  </span>
                  <TbFilePlus className="relative text-xs md:text-xl" />
                </div>
              </button>
            </div>
            <div className="md:px-5 py-3">
              <ul className="flex md:px-2 2xl:px-8 justify-between bg-gray-300 md:rounded-lg py-[10px] shadow-sm text-black font-medium px-2 ">
                <li className="w-2 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Sr.
                </li>
                <li className="w-16 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Photo
                </li>
                <li className="w-32 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Title
                </li>
                <li className="w-20 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Tags
                </li>
                <li className="w-72 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Description
                </li>
                <li className="w-18 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Date
                </li>
                <li className="w-12 text-left text-[8px] sm:text-[9.5px] md:text-[12px] 2xl:text-base ">
                  Action
                </li>
              </ul>
              {data?.AllNews.length > 0 ? (
                data?.AllNews.map((News, index) => {
                  return (
                    <ul
                      key={index}
                      className="flex items-center space-x-2 justify-between font-normal md:px-2 2xl:px-8 py-2 rounded-lg cursor-pointer hover:bg-gray-100 bg-white shadow-sm my-3"
                    >
                      <li className="w-2 text-[6px] sm:text-[8.5px] md:text-[12px] 2xl:text-sm text-left">
                       {index+1}
                      </li>
                      <li className="w-18 flex justify-center items-center">
                        <img
                          src={News?.photo ? News?.photo : ""}
                          alt=""
                          className="border object-cover -[3px] shadow-sm w-5 h-5 sm:w-8 sm:h-8 md:w-14 md:h-14 2xl:w-20 2xl:h-20"
                        />
                      </li>
                      <li className="w-32 text-left text-[6px] sm:text-[8.5px] md:text-[12px] 2xl:text-sm ">
                        {News?.title ? News?.title : ""}
                      </li>
                      <li className="w-20 text-left text-[6px] sm:text-[8.5px] md:text-[12px] 2xl:text-sm ">
                        {News?.tags ? News?.tags : ""}
                      </li>
                      <li className="w-72 text-left text-[6px] sm:text-[8.5px] md:text-[12px] 2xl:text-sm overflow-hidden">
                        {News?.description ? News?.description : ""}
                      </li>
                      <li className="w-18 text-left text-[6px] sm:text-[8.5px] md:text-[12px] 2xl:text-sm">
                        {News.created_at
                          ? moment(News?.created_at).format("DD/MM/YYYY")
                          : ""}
                      </li>
                      <li className="w-12 text-left flex flex-col md:flex-row items-center justify-start space-y-2 md:space-y-0 md:space-x-3">
                        <FiEdit
                          className="text-[11px] md:text-sm lg:text-[19px] "
                          onClick={() => handleUpdate(News?.id ? News?.id : "")}
                        />
                        <MdDelete
                          className="text-[11px] md:text-sm lg:text-[21px] text-red-500"
                          onClick={() => handleDelete(News?.id ? News?.id : "")}
                        />
                      </li>
                    </ul>
                  );
                })
              ) : (
                <div className="flex justify-center items-center w-full py-10">
                  <ImNewspaper className=" text-2xl sm:text-3xl md:text-[30px] text-gray-400 mr-2" />
                  <p className="text-xs xs:text-sm sm:text-lg 2xl:text-[20px] font-medium text-gray-400">
                    News Not Found
                  </p>
                </div>
              )}
            </div>

            <div className='mx-auto px-20 py-12 sm:px-24 sm:py-12 md:px-28 md:py-10'>
              <Pagination
                total={data && data.pageCount ? data.pageCount : 0}
                current={pageNo}
                onPageChange={(page) => setPageNo(page)}
              // previousLabel="Previous" nextLabel="Next"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default NewsList;
