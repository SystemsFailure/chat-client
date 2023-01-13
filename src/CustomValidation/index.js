import { FieldIsEmptyError, FieldLengthIsLong } from "@/CustomsError"

const validName = (name, type=null) => {
    if(type === 'object') {
        if(!name || name === '') {
            throw new FieldIsEmptyError(
                'Поле имени либо пустое, либо не корректно',
                 validName.name
                 )
        } else {
            if(name.length > 300) {
                throw new FieldLengthIsLong(
                    'Name слишком длинное, более 50 simbols, пожалуйтста, поменяйте длину',
                    validName.name
                )
            } else {
                return true
            }
        }
    } else {
        if(!name || name === '') {
            throw new FieldIsEmptyError(
                'Поле имени либо пустое, либо не корректно',
                 validName.name
                 )
        } else {
            if(name.length > 50) {
                throw new FieldLengthIsLong(
                    'Name слишком длинное, более 50 simbols, пожалуйтста, поменяйте длину',
                    validName.name
                )
            } else {
                return true
            }
        }
    }
}



// const validEmail = (email) => {
//     
// }

export {validName}