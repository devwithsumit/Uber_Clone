import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearchPanel from '../components/LocationSearchPanel';
import 'remixicon/fonts/remixicon.css';
import SelectVehiclePanel from '../components/SelectVehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver'
const Home = () => {

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('');
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [VehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(true);
  // ref for small arrow to reduce it's opacity
  const panelCloseRef = useRef();
  // ref for all the panels
  const locationPanelRef = useRef();
  const vehiclePanelRef = useRef();
  const confirmRidePanelRef = useRef();
  const LookingForDriverRef = useRef();
  const waitingForDriverPanelRef = useRef();

  //Location panel open/close animation
  useGSAP(function () {
    if (locationPanelOpen) {
      gsap.to(locationPanelRef.current, {
        height: '70%',
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      })
    } else {
      gsap.to(locationPanelRef.current, {
        height: '0%',
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [locationPanelOpen])

  //select vehicle panel open/close animation
  useGSAP(function () {
    if(VehiclePanelOpen){
      gsap.to(vehiclePanelRef.current, {
        transform: `translateY(0)`
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform: `translateY(100%)`
      })
    }
  }, [VehiclePanelOpen])

  //confirm ride panel open/close animation
  useGSAP(function () {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        transform: `translateY(0)`
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: `translateY(100%)`
      })
    }
  }, [confirmRidePanelOpen])

  //looking for driver panel open/close animation
  useGSAP(function () {
    if (lookingForDriver) {
      gsap.to(LookingForDriverRef.current, {
        transform: `translateY(0)`
      })
    } else {
      gsap.to(LookingForDriverRef.current, {
        transform: `translateY(100%)`
      })
    }
  }, [lookingForDriver])

  useGSAP(function () {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriverPanel])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        {/* image for temporary use  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setLocationPanelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setLocationPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setLocationPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
              type="text"
              placeholder='Enter your destination' />
          </form>
        </div>

        <div ref={locationPanelRef} className='bg-white h-0'>
          <LocationSearchPanel setLocationPanelOpen={setLocationPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <SelectVehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        
        <ConfirmRidePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} setLookingForDriver={setLookingForDriver}/>
      </div>
      <div ref={LookingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setLookingForDriver={setLookingForDriver} />
      </div>

      <div ref={waitingForDriverPanelRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
      </div>
    </div>
  )
}

export default Home;
