<script setup>
import { ref, onMounted , watch} from 'vue';
import { useGlobalStore } from '@/stores/global';
import axios from "axios";
const global = useGlobalStore();

const selectedStudentsData = ref(null);
const checkPhoneNumber = ref(false);
const digitsPhoneNumber = ref(null);

// # Function for selecting a student's record to edit and fillings fields with data already recorded

async function selectingStudentToEdit(){
    const idToEdit = {
        id : global.recordIdToEdit
    };
   try {
    //   const result = await axios.post(
    //      `${import.meta.env.VITE_BACKEND_URL}/single-student-data`
    //   );
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students-data`)
      console.log("id =", global.recordIdToEdit);
      global.studentsData =  result.data;
      global.studentsData.forEach((student) => {
        if(student.id == global.recordIdToEdit){
            selectedStudentsData.value = student;
            global.name = student.name;
            global.standard = student.class;
            global.phoneNumber = student.phoneNumber;
        }
      });
   } catch (error) {
      console.log("Error in fetching data on frontend", error);
   }
};


// # Function for updating any particular record

async function updateData(){
    digitsPhoneNumber.value = String(global.phoneNumber).split("").length;
   if (digitsPhoneNumber.value !== 10) {
      alert("Contact must contain 10 digits!");
   } else if (global.phoneNumber < 0) {
      alert("Contact number must be positve");
   }
else{
    try{
        const dataToUpdate = {
        recordId: global.recordIdToEdit,
        name: global.name,
        class: global.standard,
        phoneNumber: global.phoneNumber
      }
      const updatedResult = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/update-data`, dataToUpdate);

      console.log("patch data = ", updatedResult);
      global.showEditForm = !global.showEditForm;
    }
    catch(error){
        console.log("error in updating data on frontend",error);
    }
}
}


function validatePhoneNumber() {
   const digitsWhileTyping = String(global.phoneNumber).split("").length;
   if (digitsWhileTyping > 1 && digitsWhileTyping !== 10) {
      checkPhoneNumber.value = true;
   } else {
      checkPhoneNumber.value = false;
   }
}

watch(
   () => global.phoneNumber,
   async (newValue) => {
      validatePhoneNumber();
   },
);

onMounted(async() => {
    await selectingStudentToEdit();
})

</script>

<!-- # Edit Form  -->
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
      <div
         class="tw-flex tw-flex-col tw-items-end tw-rounded-md tw-bg-gray-300 tw-p-2">
         <div class="tw-flex tw-items-center tw-gap-2">
            <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold">
               Contact
            </span>
            <span>:</span>
            <input
               v-model="global.phoneNumber"
               class="tw-w-60 tw-items-center tw-rounded-md tw-p-2 tw-px-2 tw-text-sm tw-outline-none"
               type="number" />
         </div>
         <span
            v-if="checkPhoneNumber"
            class="text tw-w-48 tw-text-center tw-text-[12px] tw-font-semibold tw-text-red-600">
            Contact must contain 10 digits *
         </span>
      </div>
      <div class="tw-mb-2">
          <span @click="updateData"  class="tw-cursor-pointer  tw-bg-gray-300 tw-rounded-md tw-p-1 tw-px-3  tw-font-semibold">Submit</span>
      </div>
  </div>
  </template>