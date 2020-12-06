import * as React from "react";
import {View, Text,StyleSheet,TextInput,TouchableOpacity, Alert,KeyboardAvoidingView} from "react-native";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userID:firebase.auth().currentUser.email,
            bookName:"",
            reasonToRequest:""
        }
    }
    createUniqueId=()=>{
        return Math.random().toString(36).substring(7);
    }

    addRequest=(bookName,reasonToRequest)=>{
        var userID=this.state.userID;
        var randomRequestID= this.createUniqueId();
        db.collection("requestedBooks").add({
            userID:userID,
            requestId:randomRequestID,
            bookName:bookName,
            reasonToRequest:reasonToRequest
        })
        this.setState({
            bookName:"",
            reasonToRequest:""
        })
        return Alert.alert("Book requested successfully")
    }
    render(){
        return(
            <View >
                <MyHeader/>
                <KeyboardAvoidingView style={styles.container}>
                <TextInput 
                    placeholder={"Book Name"}
                    onChangeText={(text)=>{
                        this.setState({
                            bookName:text
                        })
                    }}
                    value={this.state.bookName}
                    style={styles.inputBox}/>
                <TextInput 
                    placeholder={"Reason to Request"}
                    multiline
                    numberOfLines={8}
                    onChangeText={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    value={this.state.reasonToRequest}
                    style={styles.inputBox}/>
                <TouchableOpacity 
                   onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                    style={styles.button} >
                    <Text style={styles.text}>Request</Text>
                </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        width:"50%",
        height:50,
        marginTop:10,
        borderRadius:10,
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
        height:60,
        borderRadius:2,
        marginTop:10,
        borderWidth:2,
        padding:10,
        justifyContent:"center"
    }
})