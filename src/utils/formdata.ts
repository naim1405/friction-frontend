/* eslint-disable @typescript-eslint/no-explicit-any */
export const modifyPayload = (data: any) => {
  //Format value
  const { file, ...rest } = data;

  //Stringify
  const obj = JSON.stringify(rest);

  //Form Data
  const formData = new FormData();
  formData.append("data", obj);
  formData.append("file", file as Blob);

  //Return
  return formData;
};
