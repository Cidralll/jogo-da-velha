export default function validationName(name:string) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
}