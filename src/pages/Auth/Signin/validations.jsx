import * as yup from "yup";

const validations = yup.object().shape({
    email: yup.string().email('Geçerli bir email girin.').required('Zorunlu alan'), // email string bir alan email formatında girilmeli ve zorunlu alan.
    password: yup.string().min(8, 'Parolanız en az 8 karakter olmalıdır.').required(),
});

export default validations;