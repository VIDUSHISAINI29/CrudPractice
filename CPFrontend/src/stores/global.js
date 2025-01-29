import {defineStore} from "pinia";
import { reactive, ref } from "vue";
export const useGlobalStore = defineStore('global', () => {
    const name = ref(null);
    const standard = ref(null);
    const phoneNumber = ref(null);
    const recordId = ref(null);
    const showForm = ref(false);
    const getDataRepeat = ref(false);
    const isLoading = ref(false);
    const showEditForm = ref(false);
    const studentsData = ref(null);
    const recordIdToEdit = ref(null);
    return{name, standard, phoneNumber, recordId, showForm, studentsData, recordIdToEdit, showEditForm}
})