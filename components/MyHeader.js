import * as React from "react";
import {Header} from "react-native-elements";

 const MyHeader =props=>{
    
        return(
            <Header
                backgroundColor="#151B25"
                centerComponent={{text:"Book Santa",style:{color:"#DBE8E1",fontSize:20,fontWeight:"bold"}}}
            />
        )
   
}
export default MyHeader;