import * as React from "react";
import {Header} from "react-native-elements";

 const MyHeader =props=>{
    
        return(
            <Header
                backgroundColor="blue"
                centerComponent={{text:"Book Santa",style:{color:"white",fontSize:20,fontWeight:"bold"}}}
            />
        )
   
}
export default MyHeader;