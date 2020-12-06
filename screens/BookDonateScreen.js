import * as React from "react";
import {View,FlatList,  Text,StyleSheet, TouchableOpacity} from "react-native";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";
import { ListItem } from "react-native-elements";

 
export default class BookDonateScreen extends React.Component{
    constructor(){
        super();
        this.state={    
            requestedBookList:[]
        }
        this.requestRef=null;
    }

    getRequestedBookList=()=>{
        this.requestRef=db.collection("requestedBooks")
        .onSnapshot((snapshot)=>{
            var requestedBookList=snapshot.docs.map(document=>document.data());
            this.setState({
                requestedBookList:requestedBookList
            })
        })
    }

    componentDidMount(){
        this.getRequestedBookList();
    }

    componentWillUnmount(){
        this.requestRef()
    }

    keyExtractor=(item,index)=>index.toString()

    renderItem=({item,i})=>{
        return(
            <ListItem
                key={i}
                title={item.bookName}
                subtitle={item.reasonToRequest}
                titleStyle={{fontWeight:"bold", color:"black"}}
                rightElement={
                    <TouchableOpacity style={{
                        width:50,
                        height:30,
                        backgroundColor:"orange",
                        borderRadius:5,
                        alignItems:"center",
                        justifyContent:"center",
                    
                    }}>
                        <Text style={{color:'#ffff'}}>View</Text>

                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <MyHeader/>
                <View >
                    {
                    this.state.requestedBookList.length===0?(
                        <View>
                            <Text>List of all the books</Text>
                        </View>
                    ):
                    (<FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.requestedBookList}
                        renderItem={this.renderItem}
                    />)}
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1
    }
})