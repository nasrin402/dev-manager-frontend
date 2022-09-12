export const formatContact = (data) =>{
    return {
        id: data.id,
        ...data.attributes,
    }
}