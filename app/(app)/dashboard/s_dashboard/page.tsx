"use server"
import { onlySeller } from "@/lib/onlysellerpage";

import ArtKartSellerPage from "./seller";
import View from "./viewproduct/page";

export default async function S_dashboard () {
       const user = await onlySeller(); 

     return (
        <div>
           <ArtKartSellerPage />
        </div>
     )
}