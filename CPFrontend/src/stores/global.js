import {defineStore} from "pinia";
import { reactive, ref } from "vue";
export const useGlobalStore = defineStore('global', () => {
    const name = ref(null);
    const standard = ref(null);
    const phoneNumber = ref(null);
    const recordId = ref(null);
    const showForm = ref(false);
    return{name, standard, phoneNumber, recordId, showForm}
})