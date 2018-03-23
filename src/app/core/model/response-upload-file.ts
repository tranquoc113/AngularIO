export class ResponseUploadFile {
  elements: ResponseFileItem[]
}
export class ResponseFileItem {
  uuid: string;
  name: string;
  mimetype: string;
  filesize: number
}