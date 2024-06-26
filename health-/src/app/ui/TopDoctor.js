"use client"
import React, { useEffect, useState } from 'react'
import DoctorCard from '../components/DoctorCard'
import PromotionCard from '../components/PromotionCard'
import Glide from "@glidejs/glide"
import ProductCard from '../components/ProductCard'
import PartnerSlider from '../components/PartnerSlider'
import Carousel from '../components/Carousel'
import Searchbar from '../components/Searchbar'

const TopDoctor = () => {
  useEffect(() => {
    const slider = new Glide(".glide-03", {
      type: "carousel",
      focusAt: "center",
      perView: 5,
      autoplay: 3000,
      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 3,
        },
        640: {
          perView: 1,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }

  }, [])

  return (
    <>
      <Carousel />
      <div className='mt-12'>
        <h1 className="text-red-700 text-center font-bold text-3xl mb-8">Find Doctors, Book Tests & Order Medicines</h1>

        <Searchbar options={["Karachi", "Lahore", "Islamabad"]} searchingFor={["Doctor", "Lab", "Pharmacy"]} showSecDropdown={true} placeholder={"Search Doctor medicine or lab test"} />

      </div>
      <div className='px-6 md:px-12 bg-gray-50 py-4'>
        <h2 className='text-2xl font-bold text-[#c30404] mb-4 mt-7'>Shifaam Top Doctors</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />

          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
          <DoctorCard name="Dr Raman Kumar" specialist="PAEDIATRIC NEUROLOGIST" about="Dr. Raman Kumar (F.C.P.S Pediatrics). He completed his MBBS from Baqai Medical University in 2007 and FCPS from Aga Khan University in 2015. He did his fellowship of Pediatric Neurology from Aga khan university Hospital ,Karachi. He Joined LNH as a consultant pediatric Neurologist in 2018 and established paeds Development unit and child Neurology unit .The unit serves children with special needs and provides support to their families. He is experienced in providing care for infants and children with all types of neurological and developmental disorders like autism and neuro behavioral disorders, epilepsy, functional impairments in cerebral palsy, CNS, infections, inflammatory conditions of the brain, movement disorders, evaluating and managing childhood headaches." rating="192" location="Karachi" url="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" />
        </div>
        <h2 className='text-2xl font-bold text-[#c30404] mb-4 mt-10'>Promotions</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 justify-center'>
          <PromotionCard src="/Promotion/tabba-heart-institute.jpg" tittle="Tabba Heart Institute" />
          <PromotionCard src="/Promotion/dr-essa-laboratory.jpg" tittle="Dr. Essa Lab" />
          <PromotionCard src="/Promotion/hashmanis-hospital-lab.jpg" tittle="Hashmanis Hospital Lab" />
          <PromotionCard src="/Promotion/chughtai-laboratory.jpg" tittle="Chughtai Laboratory" />
          <PromotionCard src="/Promotion/one-health-lab.jpg" tittle="One Health Lab" />
          <PromotionCard src="/Promotion/prolab.jpg" tittle="Pro Lab" />
          <PromotionCard src="/Promotion/sky-blue-labs.jpg" tittle="Sky Blue Labs" />
          <PromotionCard src="/Promotion/rehman-medical-institute-rmi.jpg" tittle="Rehman Medical Institute RMI" />
          <PromotionCard src="/Promotion/metropole-laboratories-private-limited.jpg" tittle="Metropole Laboratories Private Limited" />
          <PromotionCard src="/Promotion/eshifa.jpg" tittle="eShifa" />
        </div>



        <div className='bg-white rounded-xl px-12 py-8 mt-12 relative'>

          <h2 className='text-2xl font-bold text-[#c30404] mb-4'>Best Selling Products</h2>

          {/*<!-- Component: Carousel with indicators & controls inside --> */}
          <div className="glide-03  w-full">
            {/*    <!-- Slides --> */}
            <div className="overflow-hidden" data-glide-el="track">
              <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">

                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/panadol.webp" price="3" productName="Panadol 500mg Tablet" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/cac.webp" price="222" productName="Cac-1000 Orange 10 s" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/flagyl.webp" price="41" productName="Flagyl 400mg Tablet" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/smecta.webp" price="31" productName="Smecta Sachet" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/cranmax.webp" price="50" productName="Cranmax Sachet" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/polyfax.webp" price="99" productName="Polyfax Skin 20g Ointment" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/Brufen%20120ml.webp" price="102" productName="Burfen 120ml Syrup" />
                <ProductCard imgSrc="https://www.shifaam.com/uploads/store/05405.jpeg" price="26" productName="Ascard 75mg Tablet" />
              </ul>
            </div>
            {/*    <!-- Controls --> */}
            <div
              className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between"
              data-glide-el="controls"
            >
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-tr-xl rounded-br-xl  bg-[#c30404] bg-opacity-50 text-white hover:bg-opacity-100 transition duration-300  focus-visible:outline-none lg:h-20 lg:w-8"
                data-glide-dir="<"
                aria-label="prev slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <title>prev slide</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
              </button>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-tl-xl rounded-bl-xl  bg-[#c30404] bg-opacity-50 text-white hover:bg-opacity-100 transition duration-300  focus-visible:outline-none lg:h-20 lg:w-8"
                data-glide-dir=">"
                aria-label="next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <title>next slide</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>


        {/* PArtner Slider */}
        <PartnerSlider />




      </div>
    </>
  )
}

export default TopDoctor