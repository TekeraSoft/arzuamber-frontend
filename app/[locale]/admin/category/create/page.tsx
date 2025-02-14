'use client'
import React from "react";
import {OrderList} from "primereact/orderlist";
import {InputText} from "primereact/inputtext";
import { FaCirclePlus } from "react-icons/fa6";
import {Button} from "primereact/button";

function AdminCreateCategory() {

  return (
      <div>

          <div className='p-6 grid grid-cols-2 gap-x-6 rounded-lg'>
              <div className='mt-12 w-full flex flex-col items-center gap-y-10'>
          <span className='relative w-full flex justify-center'>
            <InputText className='w-full'/>
            <FaCirclePlus className='absolute top-2.5 right-4 text-blue-600 w-7 h-7'/>
          </span>
                  <OrderList dataKey="id" header="Category" className='w-full'/>
              </div>
              <div className='mt-12 w-full flex flex-col items-center gap-y-10'>
          <span className='relative w-full flex justify-center'>
            <InputText className='w-full'/>
            <FaCirclePlus className='absolute top-2.5 right-4 text-blue-600 w-7 h-7'/>
          </span>
                  <OrderList dataKey="id" header="Sub Category" className='w-full'/>
              </div>

          </div>
          <div className='flex justify-center mt-12'>
              <Button>Update</Button>
          </div>
      </div>

  )
}

export default AdminCreateCategory;
