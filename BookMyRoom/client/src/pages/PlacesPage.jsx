import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from './Perks'
import axios from "axios";


export default function Places() {
     const { action } = useParams()
     const [title, setTitle] = useState('')
     const [address, setAddress] = useState('')
     const [addedPhotos, setAddedPhotos] = useState([])
     const [photoLink, setPhotoLink] = useState('')
     const [description, setDescription] = useState('')
     const [perks, setPerks] = useState([])
     const [extraIfo, setExtraInfo] = useState('')
     const [checkIn, setCheckIn] = useState('')
     const [checkOut, setCheckOut] = useState('')
     const [maxGuests, setMaxGuests] = useState(1)
     const [redirect,setRedirect]=useState('')

     async function addPhotoByLink(ev) {
          ev.preventDefault()
          const { data: filename } = await axios.post('/photo-by-link', { link: photoLink })
          setAddedPhotos(prev => {
               return [...prev, ...filename]
          })
          setPhotoLink('')
     }
     function uploadPhoto(ev) {
          const files = ev.target.files
          const data = new FormData()
          for (let i = 0; i < files.length; i++) {
               data.append('photos', files[i])

          }
          axios.post('/upload', data, {
               headers: { 'Content-type': 'multipart/form-data' }
          }).then(response => {
               const { data: filenames } = response
               setAddedPhotos(prev => {
                    return [...filenames]
               })
          })
     }

     async function addNewPlace(ev) {
          ev.preventDefault()
     
           await axios.post('/places',  {
               title,
               address,
               addedPhotos,
               description,
               perks,
               extraIfo,
               checkIn,
               checkOut,
               maxGuests,
          })
      setRedirect('/account/places')
     }

     if(redirect){
        return  <Navigate to={redirect}/>
     }

     return (
          <div>
               <div className='mt-10'>
                    {action !== 'new' && (
                         <div >
                              <div className='text-center mt-12'>
                                   <Link className=' px-6 py-2 rounded-full bg-red-500 text-white' to={'/account/places/new'}>Add new place</Link>
                              </div>
                              Add new place
                         </div>

                    )}

                    {action === 'new' && (
                         <div className='max-w-lg mx-auto'>
                              <form onSubmit={addNewPlace}>
                                   <h2>Add title</h2>
                                   <p className='text-gray-400 '> title should be short and catchy as in advertisement </p>
                                   <input value={title}
                                        onChange={ev => setTitle(ev.target.value)} className='hover:shadow-md' type="text" placeholder='title , example : my lovely appartment' />

                                   <h2>Address</h2>
                                   <p className='text-gray-400'> Address to this place</p>
                                   <input value={address}
                                        onChange={ev => setAddress(ev.target.value)} className='hover:shadow-md' type="text" placeholder='address' />

                                   <h2>Photos</h2>
                                   <p className='text-gray-400'>more = better</p>
                                   <div className='flex gap-2'>
                                        <input value={photoLink}
                                             onChange={ev => setPhotoLink(ev.target.value)} className='hover:shadow-md' type="text" placeholder={'Add using link....jpg'} />
                                        <button onClick={addPhotoByLink} className=' px-1 py-1 rounded-2xl hover:shadow-lg border'>Add&nbsp;photo</button>
                                   </div>
                                   <div className='mt-8 '>
                                        <div className='grid gap-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 overflow-hidden'>
                                             {addedPhotos.length > 0 && addedPhotos.map(link => (
                                                  <div className='flex' key={link}>
                                                       <img src={"http://localhost:4000/upload/" + link} alt="" className='object-cover' />
                                                  </div>
                                             ))}
                                        </div>
                                        <div className='mt-8'>
                                             <label type='file' placeholder='upload' className='h-10 cursor-pointer display:none border bg-transparent rounded-2xl px-4 hover:shadow-md'>
                                                  <input type="file" multiple onChange={uploadPhoto} className='hidden' />
                                                  upload </label>
                                        </div>
                                   </div>
                                   <div className='mt-8'>
                                        <h2>Description</h2>
                                        <p className='text-gray-400 '>description of the place</p>
                                        <textarea value={description}
                                             onChange={ev => setDescription(ev.target.setDescription)} className='border hover:shadow-md'></textarea>

                                        <h2>perks</h2>
                                        <p className='text-gray-400 '>select all the perks of your place</p>

                                        <Perks selected={perks} onChange={setPerks} />
                                   </div>                                          {/* perks page imported */}


                                   <div>
                                        <h2>Extra info</h2>
                                        <p className='text-gray-400'>house rule , etc...</p>
                                        <textarea value={extraIfo}
                                             onChange={ev => setExtraInfo(ev.target.value)} className='hover:shadow-md'></textarea>
                                   </div>
                                   <div className=''>
                                        <h2>Check In&Out time</h2>
                                        <p className='text-gray-400'>Add check-in & check-out time , remember to have some windows for cleaning room between guests </p>
                                        <div className='grid lg:grid-cols-3 sm:grid-cols-3 gap-2'>
                                             <div>
                                                  <h3 className='mt-2 -mb-2'>Check-in time</h3>
                                                  <input value={checkIn}
                                                       onChange={ev => setCheckIn(ev.target.value)} className='hover:shadow-md' type="text" placeholder='' />
                                             </div>
                                             <div>
                                                  <h3 className='mt-2 -mb-2'>Check-out time</h3>
                                                  <input value={checkOut}
                                                       onChange={ev => setCheckOut(ev.target.value)} className='hover:shadow-md' type="text" placeholder='' />
                                             </div>
                                             <div>
                                                  <h3 className='mt-2 -mb-2 hover:shadow-md'>Max number of guests</h3>
                                                  <input value={maxGuests}
                                                       onChange={ev => setMaxGuests(ev.target.value)} className='hover:shadow-md' type="number" placeholder='' />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="mt-8 mb-8"> <button className='primary hover:shadow-lg'>save</button></div>

                              </form>
                         </div>
                    )}
               </div>

          </div>
     )
}
