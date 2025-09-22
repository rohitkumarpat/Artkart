import { onlyCustomer } from "@/lib/onlycustomer";
import Customer from "./customer";

export default async function C_dashboard () {
       const user = await onlyCustomer();
     return (
        <div>
            <Customer />
        </div>
     )
}