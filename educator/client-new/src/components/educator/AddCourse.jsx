import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { assets } from '../../assets/assets'
import AppContext from '../../context/AppContext'

import { toast } from 'react-toastify'
import axios from 'axios'

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext)
  const quilRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])

  const [showPopup, setShowPopup] = useState(false)
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const [loading, setLoading] = useState(false)

  // Clean up image URL when component unmounts or image changes
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image)
    }
  }, [image])

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter name')
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        }
        setChapters([...chapters, newChapter])
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId))
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId)
      setShowPopup(true)
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent = chapter.chapterContent.filter((_, idx) => idx !== lectureIndex)
          }
          return chapter
        })
      )
    }
  }

  const addLecture = () => {
    if (!lectureDetails.lectureTitle.trim()) {
      toast.error('Lecture title is required')
      return
    }
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          }
          chapter.chapterContent.push(newLecture)
        }
        return chapter
      })
    )
    setShowPopup(false)
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!courseTitle.trim()) {
      toast.error('Course title is required')
      return
    }
    if (chapters.length === 0) {
      toast.error('Please add at least one chapter')
      return
    }
    setLoading(true)
    try {
      const courseData = {
        courseTitle,
        courseDescription: quilRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      }
      const formData = new FormData()
      formData.append('courseData', JSON.stringify(courseData))
      if (image) {
        formData.append('image', image)
      }

      const token = await getToken()
      const { data } = await axios.post(backendUrl + '/api/courses', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      if (data.success) {
        toast.success(data.message)
        setCourseTitle('')
        setCoursePrice(0)
        setDiscount(0)
        setImage(null)
        setChapters([])
        quilRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add course')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // initiate Quill only once
    if (!quilRef.current && editorRef.current) {
      quilRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg text-gray-700">
  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-800" htmlFor="courseTitle">Course Title</label>
    <input
      id="courseTitle"
      onChange={(e) => setCourseTitle(e.target.value)}
      type="text"
      value={courseTitle}
      placeholder="Enter course title"
      className="outline-none py-3 px-4 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
      required
    />
  </div>

  <div className="flex flex-col gap-2">
    <label className="font-semibold text-gray-800">Course Description</label>
    <div
      ref={editorRef}
      className="border border-gray-300 rounded p-3 min-h-[150px] bg-white shadow-sm"
    ></div>
  </div>

  <div className="flex flex-wrap gap-6 items-center justify-between">
    <div className="flex flex-col gap-2 w-36">
      <label className="font-semibold text-gray-800" htmlFor="coursePrice">Course Price</label>
      <input
        id="coursePrice"
        onChange={(e) => setCoursePrice(e.target.value)}
        type="number"
        value={coursePrice}
        placeholder="0"
        min={0}
        className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
        required
      />
    </div>

    <div className="flex flex-col gap-2 items-center">
      <label className="font-semibold text-gray-800">Course Thumbnail</label>
      <label
        htmlFor="thumbnailImage"
        className="flex items-center gap-3 cursor-pointer select-none"
      >
        <img src={assets.file_upload_icon} alt="upload" className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition" />
        <input
          type="file"
          id="thumbnailImage"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          hidden
        />
        {image && (
          <img
            className="max-h-12 rounded border border-gray-300 shadow-sm"
            src={URL.createObjectURL(image)}
            alt="Preview"
          />
        )}
      </label>
    </div>
  </div>

  <div className="flex flex-col gap-2 w-36">
    <label className="font-semibold text-gray-800" htmlFor="discount">Discount %</label>
    <input
      id="discount"
      onChange={(e) => setDiscount(e.target.value)}
      type="number"
      value={discount}
      placeholder="0"
      min={0}
      max={100}
      className="outline-none py-2 px-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-400 transition"
      required
    />
  </div>

  {/* Chapters and Lectures container */}
  <div className="mt-8">
    {chapters.map((chapter, chapterIndex) => (
      <div
        key={chapter.chapterId}
        className="bg-white border border-gray-300 rounded-lg mb-5 shadow-sm"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img
              onClick={() => handleChapter('toggle', chapter.chapterId)}
              src={assets.dropdown_icon}
              width={18}
              alt="Toggle"
              className={`cursor-pointer transition-transform ${
                chapter.collapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
            <h3 className="font-semibold text-lg text-gray-900">
              {chapterIndex + 1}. {chapter.chapterTitle}
            </h3>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-gray-500">{chapter.chapterContent.length} lectures</span>
            <img
              onClick={() => handleChapter('remove', chapter.chapterId)}
              src={assets.cross_icon}
              alt="Remove chapter"
              className="cursor-pointer hover:text-red-600 transition"
              width={16}
            />
          </div>
        </div>

        {!chapter.collapsed && (
          <div className="p-4 space-y-3">
            {chapter.chapterContent.map((lecture, lectureIndex) => (
              <div
                key={lecture.lectureId}
                className="flex justify-between items-center text-gray-700"
              >
                <span>
                  {lectureIndex + 1}. {lecture.lectureTitle} — {lecture.lectureDuration} mins —{' '}
                  <a
                    href={lecture.lectureUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Link
                  </a>{' '}
                  —{' '}
                  <span className={lecture.isPreviewFree ? 'text-green-600' : 'text-red-600'}>
                    {lecture.isPreviewFree ? 'Free preview' : 'Paid'}
                  </span>
                </span>
                <img
                  onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                  src={assets.cross_icon}
                  alt="Remove lecture"
                  className="cursor-pointer hover:text-red-600 transition"
                  width={16}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => handleLecture('add', chapter.chapterId)}
              className="mt-2 inline-block bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 text-gray-700 font-semibold transition"
            >
              + Add Lecture
            </button>
          </div>
        )}
      </div>
    ))}

    <button
      type="button"
      onClick={() => handleChapter('add')}
      className="w-full py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
    >
      + Add Chapter
    </button>
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`mt-8 bg-black text-white w-max py-3 px-10 rounded-lg font-semibold ${
      loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-900'
    } transition`}
  >
    {loading ? 'Adding...' : 'ADD'}
  </button>
</form>

    </div>
  )
}

export default AddCourse
