<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const fetchCyferdData = async () => {
    try {
        const result = await axios.get(`${import.meta.env.BACKEND_URL}/students-data`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
     //    console.log('Response headers:', result.headers);  // Log response headers
        console.log('Response body:', result.data);  // Log the response body
    } catch (error) {
        console.log("Error in fetching data on frontend", error);
    }
}


onMounted(async() => {
     await fetchCyferdData();
})
</script>

<template>
 <div class="tw-flex tw-justify-center tw-flex-col tw-items-center tw-bg-gray-100 tw-p-5">
     
      <div class="tw-w-[650px]  tw-bg-red-200 tw-p-1 tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-flex tw-justify-end tw-w-full tw-items-center">
               <span class="tw-bg-blue-950 tw-p-2 tw-cursor-pointer tw-rounded-lg tw-text-white"> <i class="ri-add-line tw-text-lg"></i> Create</span>
          </div>
          <div class="tw-flex tw-border-white tw-border-2 ">
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-48 tw-text-sm tw-text-center"><span>Name</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-32 tw-text-sm tw-text-center"><span>Class</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-40 tw-text-sm tw-text-center"><span>Phone Number</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-20 tw-text-sm tw-text-center"><span>Edit</span></div>
               <div class="tw-p-2  tw-bg-green-300 tw-w-20 tw-text-sm tw-text-center"><span>Delete</span></div>
          </div>
        </div>
        <div class="tw-flex tw-border-white tw-border-b-2 tw-border-x-2 ">
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-48 tw-text-sm tw-text-center"><span>Name</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-32 tw-text-sm tw-text-center"><span>Class</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white tw-bg-green-300 tw-w-40 tw-text-sm tw-text-center"><span>Phone Number</span></div>
               <div class="  tw-bg-green-300 tw-w-20 tw-border-r-2 tw-cursor-pointer tw-border-white tw-text-sm tw-flex tw-items-center tw-justify-center"><i class="tw-text-cyan-500 tw-text-2xl ri-edit-2-fill"></i></div>
               <div class="  tw-bg-green-300 tw-w-20  tw-cursor-pointer tw-border-white tw-text-sm tw-flex tw-items-center tw-justify-center"><i class="tw-text-red-700 tw-text-2xl ri-close-circle-fill"></i></div>
          </div>
      </div>
  
 </div>
</template>

<style scoped></style>
