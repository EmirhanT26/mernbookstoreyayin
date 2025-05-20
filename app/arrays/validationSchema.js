import * as YUP from 'yup'

const schema=YUP.object().shape({
    username:YUP.string().required(),
    password:YUP.string().required().min(8),
    email:YUP.string().email("eposta formatına uygun olmalıdır ").required("E posta alanı gereklidir")
})

export default schema;