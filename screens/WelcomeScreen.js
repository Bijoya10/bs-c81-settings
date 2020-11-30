import * as React from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:""
        }
    }
    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            Alert.alert("logged in successfully");
        })
        .catch((error)=>{
            var errMsg=error.message;
            return Alert.alert(errMsg)
        })
    }

    userSignUp=(email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            Alert.alert("successfully added")
        })
        .catch(error=>{
            var errMsg=error.message;
            return Alert.alert(errMsg)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome
                </Text>


                <TextInput 
                    style={styles.inputBox}
                    placeholder="abc@email.com"
                    keyboardType={"email-address"}
                    onChangeText={(text)=>{this.setState({emailId:text})}}
                    />
                <TextInput 
                    style={styles.inputBox}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(text)=>{this.setState({password:text})}}
                    />
                <TouchableOpacity  style={styles.button}
                                    onPress={()=>this.userLogin(this.state.emailId,this.state.password)}>
                    <Text style={styles.text}> Login </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                    onPress={()=>this.userSignUp(this.state.emailId,this.state.password)}>
                    <Text style={styles.text}> Sign Up </Text>
                </TouchableOpacity>



            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        marginTop:100,
        justifyContent:"center",
        alignItems:"center"
    },

    button:{
        width:"70%",
        height:80,
        borderRadius:2,
        borderWidth:2,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"pink"
    },
    text:{
        fontSize:30,
        fontWeight:"bold"
    },
    inputBox:{
        width:"70%",
        height:80,
        borderRadius:2,
        borderWidth:2,
        padding:10,
        alignItems:"center",
        justifyContent:"center"
    }
})