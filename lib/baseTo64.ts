export async function  baseTo64(url:string) {
    const convertToBase64 = (`data:image/jpeg;base64,${btoa(url)}`);

    return convertToBase64;
}