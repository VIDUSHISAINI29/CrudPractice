<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useGlobalStore } from "@/stores/global.js";
const global = useGlobalStore();
const digitsPhoneNumber = ref(null);
const checkPhoneNumber = ref(false);

// # Function for posting data

const postData = async () => {
   digitsPhoneNumber.value = String(global.phoneNumber).split("").length;
   if (digitsPhoneNumber.value !== 10) {
      alert("Contact must contain 10 digits!");
   } else if (global.phoneNumber < 0) {
      alert("Contact number must be positve");
   } else {
      console.log(typeof global.phoneNumber, " = dgts");
      const dataToPost = {
         name: global.name,
         class: global.standard,
         phoneNumber: global.phoneNumber,
      };

      try {
         const result = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/add-data`,
            dataToPost,
            {
               headers: {
                  "Content-Type": "application/json",
               },
            },
         );
         addDataMessage.value = result.message;
         await fetchCyferdData();
         global.getDataRepeat = true;
      } catch (error) {
         console.log("error in posting data", error);
      }
   }
};

// Function fo validating contact details

function validatePhoneNumber() {
   const digitsWhileTyping = String(global.phoneNumber).split("").length;
   if (digitsWhileTyping > 1 && digitsWhileTyping !== 10) {
      checkPhoneNumber.value = true;
   } else {
      checkPhoneNumber.value = false;
   }
}

// # Function for hiding from and calling posting function

async function hideForm() {
   await postData();
   if (digitsPhoneNumber.value === 10) {
      global.showForm = !global.showForm;
      console.log("isdie if ", global.showForm);
   }
}

watch(
   () => global.phoneNumber,
   async (newValue) => {
      validatePhoneNumber();
   },
);
</script>

<!-- # Form for creating new record  -->
<template>
   <div
      class="tw-flex tw-w-[500px] tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-rounded-lg tw-bg-blue-950 tw-p-2 tw-py-4 tw-text-blue-950">
      <div class="tw-flex tw-w-full">
         <span
            class="tw-w-[65%] tw-text-end tw-text-lg tw-font-semibold tw-text-sky-200 tw-underline">
            Student's Detail
         </span>
         <i
            @click="global.showForm = !global.showForm"
            class="ri-close-circle-fill tw-w-[33%] tw-cursor-pointer tw-text-end tw-text-3xl tw-text-white"></i>
      </div>
      <div
         class="tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-bg-gray-300 tw-p-2">
         <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold">
            Name
         </span>
         <span>:</span>
         <input
            v-model="global.name"
            class="tw-w-60 tw-items-center tw-rounded-md tw-p-2 tw-px-2 tw-text-sm tw-outline-none"
            type="text" />
      </div>
      <div
         class="tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-bg-gray-300 tw-p-2">
         <span class="tw-w-28 tw-text-center tw-text-sm tw-font-semibold">
            Class
         </span>
         <span>:</span>
         <input
            v-model="global.standard"
            class="tw-w-60 tw-items-center tw-rounded-md tw-p-2 tw-px-2 tw-text-sm tw-outline-none"
            type="text" />
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
         <span
            @click="hideForm"
            class="tw-cursor-pointer tw-rounded-md tw-bg-gray-300 tw-p-1 tw-px-3 tw-font-semibold">
            Submit
         </span>
      </div>
   </div>
</template>
