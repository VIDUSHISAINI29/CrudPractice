<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import Form from "@/components/CreateForm.vue";
import { useGlobalStore } from "@/stores/global";
import ProgressSpinner from "primevue/progressspinner";
import CreateForm from "@/components/CreateForm.vue";
import EditForm from '@/components/EditForm.vue'

const global = useGlobalStore();
const studentsData = ref(null);
const addDataMessage = ref(null);
const rows = ref(null);

// # Fetching data for display on table

const fetchCyferdData = async (req, res) => {
   try {
      const result = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/students-data`,
      );
      global.studentsData = result.data;
      studentsData.value = global.studentsData
      rows.value = studentsData.value.length;
      global.isLoading = true;
   } catch (error) {
      console.log("Error in fetching data on frontend", error);
   }
};

// # Function for deleting any particular rows/record

async function deleteData(recId, index) {
   const idTodelt = {
      recordId: recId,
   };
   try {
      const result = await axios.delete(
         `${import.meta.env.VITE_BACKEND_URL}/delete-data`,
         { data: idTodelt },
      );

      await fetchCyferdData();
      if (index === 1) {
         index = index + "st";
      } else if (index === 2) {
         index = index + "nd";
      } else if (index === 3) {
         index = index + "rd";
      } else {
         index = index + "th";
      }
      alert(index + " row deleted successfully !");
      global.isLoading = true;
   } catch (error) {
      console.log("error in deleting data ", error);
   }
}

// # Function for sending recordId of the record that is desired to update

const editData = async(id) => {
    global.recordIdToEdit = id;
    global.showEditForm = !global.showEditForm;
}

// # Updating record in the table after editing or creating any particular record

watch(() => global.showEditForm, async (newValue, oldValue) => {
    if(newValue === false){
           await fetchCyferdData();
    }
});
watch(() => global.showForm, async (newValue, oldValue) => {
    if(newValue === false){
           await fetchCyferdData();
    }
});

// # Fetching date when page is refreshed or started

onMounted(async () => {
   await fetchCyferdData();
});
</script>

<template>
   <div
      :class="[
         'tw-relative tw-flex tw-flex-col  tw-items-center tw-bg-gray-200 tw-p-5',
         rows < 13 ? 'tw-h-screen' : '',
      ]">
      <div
         v-if="global.isLoading"
         class="tw-mt-10 tw-flex tw-w-[720px] tw-flex-col tw-items-center tw-justify-center tw-p-1">
         <div class="tw-flex tw-flex-col tw-gap-2">
            <div class="tw-flex tw-w-full tw-items-center tw-justify-end">
               <span
                  @click="global.showForm = !global.showForm"
                  class="tw-cursor-pointer tw-rounded-lg tw-bg-blue-950 tw-p-2 tw-text-white">
                  <i class="ri-add-line tw-text-lg"></i>
                  Create
               </span>
            </div>

        <!--# Table Header -->

            <div
               class="tw-flex tw-border-2 tw-border-white tw-bg-blue-950 tw-text-white">
               <div
                  class="tw-w-16 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
                  <span>Sr. No.</span>
               </div>

               <div
                  class="tw-w-48 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
                  <span>Name</span>
               </div>
               <div
                  class="tw-w-32 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
                  <span>Class</span>
               </div>
               <div
                  class="tw-w-40 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
                  <span>Phone Number</span>
               </div>
               <div
                  class="tw-w-20 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
                  <span>Edit</span>
               </div>
               <div class="tw-w-20 tw-p-2 tw-text-center tw-text-sm">
                  <span>Delete</span>
               </div>
            </div>
         </div>

    <!--# Rows of Table Using loop on array of all students data -->

         <div
            v-for="(student, index) in studentsData"
            :key="index"
            class="tw-flex tw-border-x-2 tw-border-b-2 tw-border-white tw-bg-gray-100">
            <div
               class="tw-w-16 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
               <span>{{ index + 1 }}.</span>
            </div>
            <div
               class="tw-w-48 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
               <span>{{ student.name }}</span>
            </div>
            <div
               class="tw-w-32 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
               <span>{{ student.class }}</span>
            </div>
            <div
               class="tw-w-40 tw-border-r-2 tw-border-white tw-p-2 tw-text-center tw-text-sm">
               <span>{{ student.phoneNumber }}</span>
            </div>
            <div
               class="tw-flex tw-w-20  tw-items-center tw-justify-center tw-border-r-2 tw-border-white tw-text-sm">
               <i @click="editData(student.id)" class="ri-edit-2-fill tw-cursor-pointer tw-text-2xl tw-text-cyan-400"></i>
            </div>
            <div
               
               class="tw-flex tw-w-20  tw-items-center tw-justify-center tw-border-white tw-text-sm">
               <i @click="deleteData(student.id, index + 1)" class="ri-close-circle-fill tw-cursor-pointer tw-text-2xl tw-text-red-600"></i>
            </div>
         </div>
      </div>

      <!-- # Loading State -->

      <div class="tw-absolute tw-top-[40%]" v-else>
         <ProgressSpinner />
      </div>

      <!--# Displaying Create From using State Management -->

      <div
         v-if="global.showForm"
         class="tw-fixed tw-top-0  tw-flex tw-h-[100vh] tw-w-full tw-items-center tw-justify-center tw-bg-[#00000033]">
         <CreateForm />
      </div>

        <!--# Displaying Edit From using State Management -->


      <div
         v-if="global.showEditForm"
         class="tw-fixed tw-top-0 tw-flex tw-h-[100vh] tw-w-full tw-items-center tw-justify-center tw-bg-[#00000033]">
         <EditForm />
      </div>
   </div>
</template>

<style scoped></style>
