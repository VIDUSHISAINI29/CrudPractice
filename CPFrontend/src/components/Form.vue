<script setup>
import axios from 'axios';
import { ref } from 'vue';
import{ useGlobalStore} from "@/stores/global.js"
const global = useGlobalStore();

const postData = async () => {
    const dataToPost = {
        name: global.name,
        class: global.standard,
        phoneNumber: global.phoneNumber
    }
    try {
           const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add-data`, dataToPost, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        addDataMessage.value = result.message;
        console.log("message = ", addDataMessage.value);
        console.log("data = ", result.data);
        
    } catch (error) {
        
    }
}

async function hideForm(){
    global.showForm = !global.showForm;
    await postData();
}


</script>
<template>
  <div class="tw-text-blue-950  tw-bg-blue-950  tw-py-4 tw-gap-6 tw-rounded-lg tw-w-[500px] tw-p-2 tw-flex-col tw-flex tw-justify-center tw-items-center">
    <div class="">
        <span class="tw-underline tw-text-sky-200 tw-text-lg tw-font-semibold">Student's Detail</span>
    </div>
    <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
        <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Name</span><span>:</span> <input v-model="global.name" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="text">
    </div>
    <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
        <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Class</span><span>:</span> <input v-model="global.standard" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="text">
    </div>
    <div class="tw-flex tw-gap-2 tw-items-center tw-bg-gray-300 tw-p-2 tw-rounded-md">
        <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold ">Contact</span><span>:</span> <input v-model="global.phoneNumber" class=" tw-rounded-md tw-p-2 tw-w-60 tw-text-sm tw-items-center tw-px-2 tw-outline-none"  type="text">
    </div>
    <div class="tw-mb-2">
        <span @click="hideForm" class="tw-cursor-pointer  tw-bg-gray-300 tw-rounded-md tw-p-1 tw-px-3  tw-font-semibold">Submit</span>
    </div>
</div>
</template>