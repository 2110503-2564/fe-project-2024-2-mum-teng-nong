export interface CompanyItems {
    _id: string,
    Companyname: string,
    businessType: string,
    size: string,
    address: string,
    tel: string,
    website: string,
    description: string
  }
export interface BookingItems{
  _id:string,
  apptDate:string,
  user:string,
  company:string,
  createdAt:string
}