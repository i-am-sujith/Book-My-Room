import React from 'react'

export default function ({ selected , onChange }) {

  function  handleCheckBox(ev){
    const {checked,name}=ev.target
    if(checked){
        onChange([...selected,name])
    }else{
        onChange([...selected.filter(selectedName=>selectedName!==name)])
    }
    

    }
    return (
        <div>
            <div className='grid gap-2 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3'>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='wifi' onChange={handleCheckBox} />
                    <span>Wifi</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='parking' onChange={handleCheckBox} />
                    <span>parking area</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='tv' onChange={handleCheckBox} />
                    <span>TV</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='pets' onChange={handleCheckBox} />
                    <span>Pets</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='entrance' onChange={handleCheckBox} />
                    <span>Private entrance</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='service' onChange={handleCheckBox} />
                    <span>Room service</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='pool' onChange={handleCheckBox} />
                    <span>Swimming pool</span>
                </label>
                <label className='border p-4 text-center hover:shadow-md'>
                    <input type="checkbox" name='gym' onChange={handleCheckBox} />
                    <span>Gym</span>
                </label>

            </div>

        </div>
    )
}
