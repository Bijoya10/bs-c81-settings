import * as React from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity, Alert, ScrollView,KeyboardAvoidingView,Modal} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:"",
            password:"",
            isModalVisible:"",
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
            Alert.alert("logged in successfully");
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
                        <View>
                            <ScrollView style={{width:"100%"}}>
                                <KeyboardAvoidingView>
                                    <Text>Registration</Text>
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder="first name"
                                        onChangeText={(text)=>{
                                            this.setState({firstName:text})
                                        }}/>
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="last name"
                                        onChangeText={(text)=>{
                                            this.setState({lastName:text})
                                        }}
                                    />
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder="address"
                                        onChangeText={(text)=>{
                                            this.setState({address:text})
                                        }}/>
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="contact"
                                        keyboardType={"numeric"}
                                        onChangeText={(text)=>{
                                            this.setState({contact:text})
                                        }}
                                    />
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="abc@email.com"
                                        keyboardType={'email-address'}
                                        onChangeText={(text)=>{
                                            this.setState({emailId:text})
                                        }}
                                        />
                                    <TextInput 
                                        style={styles.inputBox}
                                        placeholder="password"
                                        secureTextEntry={true}
                                        onChangeText={(text)=>{
                                            this.setState({password:text})
                                        }}
                                        />
                                    <TextInput 
                                        style={styles.inputBox}
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
                                        ><Text>Sign Up</Text></TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.button}
                                            onPress={()=>{this.setState({isModalVisible:false})}}>
                                            <Text>Cancel</Text></TouchableOpacity>
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
                                    onPress={()=>this.setState({isModalVisible:true})}>
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