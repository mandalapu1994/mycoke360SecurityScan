
interface option {
  key: string;
  value: string;
}

export const ReasonForRequest :option[]= [
    { key: '1', value: 'General Inquiry' },
    { key: '2', value: 'Custom Service' },
    { key: '3', value: 'Equipment' },
   
]
export const SelectEqupment :option[]= [
    { key: '1', value: 'Cooler' },
    { key: '2', value: 'Dispenser-Fountain' },
    { key: '3', value: 'Dispenser-Tea Urn/Tower' },
    { key: '4', value: 'Vending Machine' },
]
export const AssetNumber:option[] = [
    { key: '1', value: 'TA14222441' },
    { key: '2', value: 'TA14161070' },
    { key: '3', value: 'TA14091363' },
    { key: '4', value: 'TA14161069' },
]
export const ProblemCategory :option[]= [
    { key: '1', value: 'Damaged' },
    { key: '2', value: 'Electrical' },
    { key: '3', value: 'General Maintenace' },
    { key: '4', value: 'Leaking' },
    { key: '5', value: 'Temperature' },
    { key: '6', value: 'Other Problem' },
]
export const SelectProblem_Damaged:option[] = [
    { key: '1', value: 'Needs Keys' },
    { key: '2', value: 'Noise' },
    { key: '3', value: 'Cosmetic' },
    { key: '4', value: 'Bad Odor' },
    { key: '5', value: 'Door Seal Worn' },
]
export const SelectDays:option[]= [
    { key: '1', value: 'Monday' },
    { key: '2', value: 'Tuesday' },
    { key: '3', value: 'Wednesday' },
    { key: '4', value: 'Thursday' },
    { key: '5', value: 'Friday' },
    { key: '6', value: 'Saturday' },
    { key: '7', value: 'Sunday' },
]

// CST DropDown  ProblemType,DeliveryRelatedInquiryAndIssue,FutureDeliveries,ChangeIReceiveMyProduct,FutureDeliveries2

export const ProblemType:option[] =[
    { key: '1', value: 'Financial Inquiry' },
    { key: '2', value: 'Complaint or Complement regarding an employee' },
    { key: '3', value: 'Delivery Related Inquiry/Issue' },
    { key: '4', value: 'Sales/Account Related' },
    { key: '5', value: 'Full Service Inquiry (where Coca-Cola fills and manages my vendingmachine) ' },
    { key: '6', value: 'Complaint or Complement regarding an employee' },
    ]

export const DeliveryRelatedInquiryAndIssue :option[]=  [
    { key: '1', value: 'Past' },
    { key: '2', value: 'Currently Scheduled Order' },
    { key: '3', value: 'Future Deliveries' },
]  

export const FutureDeliveries:option[] =[
    { key: '1', value: 'Change how I receive my product' },
    { key: '2', value: 'Change my delivery address' },
    { key: '3', value: 'Change when I receive my delivery' },
]

export const ChangeIReceiveMyProduct :option[]=[
    { key: '1', value: 'I receive my product by a carrier (UPS, FedEx or other).' },
    { key: '2', value: 'I receive my product by a Coke Florida Representative' },
  
]

export const FutureDeliveries2 :option[]=[
    { key: '1', value: 'Alternate distributor of Coca-Cola' },
    { key: '2', value: 'Coca-Cola filling my vending machine directly' },
    { key: '3', value: 'A Coke Florida Representative' },
]

export const Time_Form :option[]=[
    { key: '1', value: '6:00am' },
    { key: '2', value: '6:30am' },
    { key: '3', value: '7:00am' },
    { key: '4', value: '7:30am' },
    { key: '5', value: '8:00am' },
    
]
export const Time_To :option[]=[
    { key: '1', value: '6:00am' },
    { key: '2', value: '6:30am' },
    { key: '3', value: '7:00am' },
    { key: '4', value: '7:30am' },
    { key: '5', value: '8:00am' },
]

export const Language :option[]=[
    { key: '1', value: 'English' },
]