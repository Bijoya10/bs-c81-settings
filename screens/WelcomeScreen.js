import * as React from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert, ScrollView,KeyboardAvoidingView,Modal} from "react-native";
import db from "../config";
import firebase from "firebase";

import MyHeader from "../components/MyHeader";
import { Header } from "react-native/Libraries/NewAppScreen";

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
            isModalVisible:false,
            firstName:"",
            lastName:"",
            contact:"",
            address:"",
            confirmPassword:""
        }
    }
    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(()=>{
            this.props.navigation.navigate("Donate");
        })
        .catch((error)=>{
            var errMsg=error.message;
            return Alert.alert(errMsg)
        })
    }

    userSignUp=(email,password,confirmPassword)=>{
        if(password!==confirmPassword){
            Alert.alert("Password doesn't match");
        }else{
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(()=>{
            Alert.alert("successfully added")
        })
        .catch(error=>{
            var errMsg=error.message;
            return Alert.alert(errMsg)
        })
        db.collection("user").add({
            emailId:this.state.emailId,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address,

        })
        this.setState({isModalVisible:false})
    }
    }

    showModal=()=>{
        return(
            <Modal transparent={false}
                    visible={this.state.isModalVisible}
                    animationType="fade">
                        <View style={styles.modalStyle}>
                            <ScrollView style={{width:"100%"}}>
                                <KeyboardAvoidingView style={styles.container}>
                                    <MyHeader/>
                                    <View style={{alignItems:"center"}}><Text style={styles.text}>Registration</Text></View>
                                    
                                
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
                                    <TextInput
                                        style={styles.inputBox}
                                        value={this.state.emailId}
                                        placeholder="abc@email.com"
                                        keyboardType={'email-address'}
                                        onChangeText={(text)=>{
                                            this.setState({emailId:text})
                                        }}
                                        />
                                    <TextInput 
                                        style={styles.inputBox}
                                        value={this.state.password}
                                        placeholder="password"
                                        secureTextEntry={true}
                                        onChangeText={(text)=>{
                                            this.setState({password:text})
                                        }}
                                        />
                                    <TextInput 
                                        style={styles.inputBox}
                                        value={this.state.confirmPassword}
                                        placeholder="confirm password"
                                        secureTextEntry={true}
                                        onChangeText={(text)=>{
                                            this.setState({confirmPassword:text})
                                        }}
                                        />
                                    <View>
                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress={()=>{
                                                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
                                            }}
                                        ><Text style={styles.text}>Register</Text></TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress={()=>{this.setState({isModalVisible:false})}}>
                                            <Text style={styles.text}>Cancel</Text></TouchableOpacity>
                                    </View>
                                </KeyboardAvoidingView>
                            </ScrollView>
                        </View>

            </Modal>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                {this.showModal()}
                <MyHeader/>
                <View style={[styles.container,{marginTop:100}]}>
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
                                        onPress={()=>this.setState({isModalVisible:true})}>
                        <Text style={styles.text}> Sign Up </Text>
                    </TouchableOpacity>

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