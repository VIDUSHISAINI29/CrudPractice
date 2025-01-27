<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Form from '@/components/Form.vue'
import { useGlobalStore } from '@/stores/global';
import { _ } from 'numeral';

const global = useGlobalStore();
const studentsData = ref(null);
const addDataMessage = ref(null);

const fetchCyferdData = async (req, res) => {
  
    try {
      
        const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/students-data`);
        studentsData.value = result.data;
     //    console.log('Response headers:', result.headers);  // Log response headers
        // console.log('students data:', studentsData.value);  // Log the response body
    } catch (error) {
        console.log("Error in fetching data on frontend", error);
    }
}


function createData(){
    global.showForm = !global.showForm;
    console.log("clicked");
    
}
async function deleteData (recId){

    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-data/${recId}`);
    console.log(recId," deleted successfully");
    await fetchCyferdData();
    
}

async function test(recId){

    // await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-data/${recId}`);
    console.log(recId," deleted successfully");
    // await fetchCyferdData();
}
onMounted(async() => {
     await fetchCyferdData();
})
</script>

<template>
 <div class="tw-flex tw-relative tw-justify-center tw-flex-col tw-items-center tw-bg-gray-200 tw-p-5">
     
      <div class="tw-w-[720px]   tw-p-1 tw-flex tw-flex-col tw-justify-center tw-items-center">
        <div class="tw-flex tw-flex-col tw-gap-2">
          <div class="tw-flex tw-justify-end tw-w-full tw-items-center">
               <span @click="createData" class="tw-bg-blue-950 tw-p-2 tw-cursor-pointer tw-rounded-lg tw-text-white"> <i class="ri-add-line tw-text-lg"></i> Create</span>
          </div>
          <div class="tw-flex tw-bg-blue-950 tw-text-white tw-border-white tw-border-2 ">
            <div class="tw-p-2 tw-w-16 tw-border-r-2 tw-border-white  tw-text-sm tw-text-center"><span>Sr. No.</span></div>

               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-48 tw-text-sm tw-text-center"><span>Name</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-32 tw-text-sm tw-text-center"><span>Class</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-40 tw-text-sm tw-text-center"><span>Phone Number</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-20 tw-text-sm tw-text-center"><span>Edit</span></div>
               <div class="tw-p-2   tw-w-20 tw-text-sm tw-text-center"><span>Delete</span></div>
          </div>
        </div>
        <div v-for="(student, index) in studentsData" :key="index" class="tw-bg-gray-100 tw-flex tw-border-white tw-border-b-2 tw-border-x-2 ">

               <div class="tw-p-2 tw-w-16 tw-border-r-2 tw-border-white  tw-text-sm tw-text-center"><span>{{index + 1}}.</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-48 tw-text-sm tw-text-center"><span>{{student.name}}</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-32 tw-text-sm tw-text-center"><span>{{ student.class }}</span></div>
               <div class="tw-p-2 tw-border-r-2 tw-border-white  tw-w-40 tw-text-sm tw-text-center"><span>{{student.phoneNumber}}</span></div>
               <div class="   tw-w-20 tw-border-r-2 tw-cursor-pointer tw-border-white tw-text-sm tw-flex tw-items-center tw-justify-center"><i class="tw-text-cyan-500 tw-text-2xl ri-edit-2-fill"></i></div>
               <div @click="test(student.id)" class="   tw-w-20  tw-cursor-pointer tw-border-white tw-text-sm tw-flex tw-items-center tw-justify-center"><i  class="tw-text-red-700 tw-text-2xl ri-close-circle-fill"></i></div>
          </div>
      </div>
  
    <div v-if="global.showForm" class="tw-absolute tw-w-full tw-h-screen tw-flex tw-justify-center tw-bg-[#00000033] tw-items-center">
        <Form />
    </div>
 </div>
</template>

<style scoped></style>
