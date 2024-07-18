import { snapreference } from "@/app/lib/snap-reference"
import { useEffect} from "react"

const useSnap = () => {

    useEffect(()=>{
        const snapScript = snapreference
        
        const clientKey = process.env.MIDTRANS_CLIENT_KEY
    
        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clientKey!)
        script.async = true;
    
        document.body.appendChild(script)
    
        return () => {
          document.body.removeChild(script)
        }
    
      },[])

    // const snapEmbed = (snap_token: string, embedId: string ) => {
    //     if(window.snap) {
    //         window.snap.embed(snap_token, {
    //             embedId,
    //               onSuccess: function (result: any) {
    //                 /* You may add your own implementation here */
    //                 alert("payment success!"); console.log(result);
    //               },
    //               onPending: function (result: any) {
    //                 /* You may add your own implementation here */
    //                 alert("wating your payment!"); console.log(result);
    //               },
    //               onError: function (result: any) {
    //                 /* You may add your own implementation here */
    //                 alert("payment failed!"); console.log(result);
    //               },
    //               onClose: function () {
    //                 /* You may add your own implementation here */
    //                 alert('you closed the popup without finishing the payment');
    //             }
    //         })
    //     }
    // }

    // return { snapEmbed }
}

export default useSnap;