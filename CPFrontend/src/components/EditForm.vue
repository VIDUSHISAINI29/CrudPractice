<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '@/stores/global';
import axios from "axios";
const global = useGlobalStore();

const studentsData = ref(null);

async function fetchCyferdData(){

    const idToEdit = {
        recordId : global.recordIdToEdit
    };
   try {
      const result = await axios.post(
         `${import.meta.env.VITE_BACKEND_URL}/single-student-data`,{ data: idToEdit },
      );
      console.log("id =", global.recordIdToEdit);
      global.studentsData =  result;
      console.log("single data = ", global.studentsData);
    //   global.studentsData.forEach((student) => {
    //     studentsData.value = {
    //         name: student.name,
    //         class: student.class,
    //         pho: student.phoneNumber
    //     }
    //   })
      global.isLoading = true;
   } catch (error) {
      console.log("Error in fetching data on frontend", error);
   }
};
// async function test(){
//     console.log("id =", global.recordIdToEdit);
// }
onMounted(async() => {
    await fetchCyferdData();
})

</script>
<template>
    <div  class="tw-text-blue-950  tw-bg-blue-950  tw-py-4 tw-gap-6 tw-rounded-lg tw-w-[500px] tw-p-2 tw-flex-col tw-flex tw-justify-center tw-items-center">
      <div class=" tw-flex  tw-w-full">
          <span class="tw-underline tw-text-sky-200 tw-text-lg tw-font-semibold tw-w-[65%] tw-text-end">Student's Detail</span><i @click="global.showEditForm = !global.showEditForm" class="tw-text-white tw-cursor-pointer tw-w-[33%] tw-text-end tw-text-3xl ri-close-circle-fill"></i>
      </div>
      <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
          <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Name</span><span>:</span> <input v-model="global.name" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="text">
      </div>
      <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
          <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Class</span><span>:</span> <input v-model="global.standard" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="text">
      </div>
      <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
          <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Contact</span><span>:</span> <input v-model="global.phoneNumber" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="number">
      </div>
      <div class="tw-mb-2">
          <span @click="fetchCyferdData"  class="tw-cursor-pointer  tw-bg-gray-300 tw-rounded-md tw-p-1 tw-px-3  tw-font-semibold">Submit</span>
      </div>
  </div>
  </template>