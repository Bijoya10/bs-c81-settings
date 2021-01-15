import * as React from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ToastAndroid} from "react-native";
import MyHeader from "../components/MyHeader"
import firebase from "firebase";
import db from "../config";

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:firebase.auth().currentUser.email,
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            docId:""
        }
    }
    getUserDetails=()=>{

        db.collection("user").where("emailId","==",this.state.emailId).get()
        .then(snapshot=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();

                this.setState({
                    emailId:data.emailId,
                    firstName:data.firstName,
                    lastName:data.lastName,
                    contact:data.contact,
                    address:data.address,
                    docId:doc.id
                })
            })
        })
        ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG)
    }

    updateUserDetails=()=>{
        db.collection("user").doc(this.state.docId).update({
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                contact:this.state.contact,
                address:this.state.address           
        })
    }


    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader/>
                <TextInput 
                    style={styles.inputBox}
                    placeholder="first name"
                    value={this.state.firstName}
                    onChangeText={(text)=>{
                        this.setState({firstName:text})
                    }}/>
                <TextInput
                    style={styles.inputBox}
                    placeholder="last name"
                    value={this.state.lastName}
                    onChangeText={(text)=>{
                        this.setState({lastName:text})
                    }}
                />
                <TextInput 
                    style={styles.inputBox}
                    value={this.state.address}
                    placeholder="address"
                    onChangeText={(text)=>{
                        this.setState({address:text})
                    }}/>
                <TextInput
                    style={styles.inputBox}
                    value={this.state.contact}
                    placeholder="contact"
                    keyboardType={"numeric"}
                    onChangeText={(text)=>{
                        this.setState({contact:text})
                    }}
                />
                <View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={()=>{
                            this.updateUserDetails()
                        }}
                    ><Text style={styles.text}>Save</Text></TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    modalStyle:{
        justifyContent:"center",
        alignItems:"center"
    },

    button:{
        width:"50%",
        height:60,
        borderRadius:10,
        borderWidth:2,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#E10032",
        marginTop:10,
        alignSelf:"center"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        color:"#DBE8E1"
    },
    inputBox:{
        width:200,
        height:80,
        borderRadius:2,
        borderWidth:2,
        padding:5,
        alignItems:"center",
        justifyContent:"center",
        marginTop:5,
        alignSelf:"center"
    }
})