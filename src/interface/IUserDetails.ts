
export interface IAddress {
  line1: string;
  line2?: string;  // Optional field
  city: string;
  state: string;
  pincode: string;
  googleMapsLocation?: string; // Optional field
}
export interface IUserDetails {
    id: string;
    name: string;
    email: string;
    address?: IAddress; // Optional field
    phoneNumber?: string; // Optional field
    // Add any other fields that are part of the user details
    
  aadharNumber:string;
  bankAccountNumber:string;
  }