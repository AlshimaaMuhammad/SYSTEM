// screens/Home.js

import React, { Component } from "react";
import { Button, View, Text, Platform, TextInput, Alert } from "react-native";
import RNPrint from "react-native-print";
import { Col, Row, Grid } from "react-native-easy-grid";
import SearchableDropdown from "react-native-searchable-dropdown";
import * as Print from "expo-print";
import { Form, Item, Label, Input, DatePicker } from "native-base";
import { getUsers, contains } from "./index";
import firebase, { updateMinus } from "./firebase";

let num = "";
var companyName = "";
var recieptNo = "";
var sampleArray = [];
var buyingArray = [];
var qdata = {};
var items = [
  //name key is must.It is to show the text in front
  { id: 1, name: "جالون" },
  { id: 2, name: "بستلة" },
  { id: 3, name: "كيلو" },
  { id: 4, name: "شيكارة" },
  { id: 7, name: "ش" },
  { id: 8, name: "ورقية" },
  { id: 4, name: "كيس" },
  { id: 5, name: "جركن" },
  { id: 6, name: "عبوة" },
  { id: 7, name: "جزدله"},
];
var type = [
  { id: 1, name: "companies" },
  { id: 2, name: "hotels" },
  { id: 3, name: "stores" },
  { id: 4, name: "customer" },
];
var mNames = [
  {
    id: 1,
    name: "كيماتون مط صاج",
  },
  {
    id: 2,
    name: "كيماتون ابيض(نص لامع) صاج",
  },
  {
    id:3,
    name:"كيماتون مط (بلاستك)"
  },
  {
    id:4,
    name:"كيماتون ابيض (نصف لامع بلاستك)"
  },
  {
    id:5,
    name:"سيلكاتون (ربع لامع)"
  },
  {
    id:6,
    name:"كيماتون سيلك (بلاستك)"
  },
  {
    id:7,
    name:"كيماتون سيلك (صاج)"
  },
  {
    id:8,
    name:"رايت تون 15 ابيض سلكاتون"
  },
  {
    id:9,
    name:"رايت تون 15 ابيض سلكاتون بلاستيك"
  },
  {
    id:10,
    name:"معجون كيماباتى"
  },
  {
    id:11,
    name:"معجون كيماتون الفاخر"
  },
  {
    id:12,
    name:"معجون جبسى ( مستر برفكت )"
  },
  {
    id:13,
    name:"معجون اسمنتى رمادى"
  },
  {
    id:14,
    name:"معجون اسمنتى ابيض"
  },
  {
    id:15,
    name:"د برفكت ابيض"
  },
  {
    id:16,
    name:"د برفكت رمادى"
  },
  {
    id:17,
    name:"Glass Beads"
  },
  {
    id:18,
    name:"كاشو تون ملون"
  },
  {
    id:18,
    name:"كاشو تون Base"
  },
  {
    id:19,
    name:"كيم بليكو ابيض751"
  },
  {
    id:20,
    name:"كيم بليكو ابيض851"
  },
  {
    id:21,
    name:"كيم بليكو ابيض951"
  },
  {
    id:21,
    name:"كيم بليكو ملون ناعم"
  },
  {
    id:22,
    name:"كيم بليكو ملون متوسط"
  },
   {
    id:22,
    name:"كيم بليكو ملون خشن"
  },
  {
    id:23,
    name:"كالزيلpaint"
  },
  {
    id:24,
    name:"كوزي تون"
  },
  {
    id:25,
    name:"كالزيل بليكو-كوزي بليكو"
  },
  {
    id:26,
    name:"مارموكيازد2000"
  },
  {
    id:27,
    name:"برفكتا"
  },
  {
    id:28,
    name:"كيماستون و كيماجرانو جميع الالوان"
  },
  {
    id:29,
    name:"كيماستون فلكس 4000"
  },
  {
    id:30,
    name:"كيماكلير(ورنيش مائي)"
  },
  {
    id:31,
    name:"زيناتون"
  },
  {
    id:32,
    name:"زيناتونA"
  },
  {
    id:33,
    name:"زيناتون B"
  },
  {
    id:34,
    name:"زيناتون C"
  }
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dynamicArrayItem: null,
      staticArrayItem: null,
      typeItem: null,
      qnum: null,
      snum: null,
      weight:null,
      chosenDate: new Date(),
      selected: undefined,
    };
    this.setDate = this.setDate.bind(this);
  }
  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  componentDidMount() {
    //to make local request
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    //request to get user to update the state
    getUsers()
      .then((users) => {
        this.setState({
          data: users,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  updateMinus(weight) {
    const ref = firebase
      .firestore()
      .collection("materials/")
      .doc(this.state.dynamicArrayItem);
    switch (weight) {
      case "جالون":
        ref
          .update({
            "properties.جالون.store_num": this.state.snum - this.state.qnum,
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "كيلو":
        ref
          .update({
            "properties.كيلو.store_num": this.state.snum - this.state.qnum,
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "بستلة":
        ref
          .update({
            "properties.بستلة.store_num": this.state.snum - this.state.qnum,
          })

          .catch((error) => {
            console.log(error);
          });
        break;
    }
  }
  updatePlus() {
    const ref = firebase
      .firestore()
      .collection("materials/")
      .doc(this.state.dynamicArrayItem);
    const q = Number.parseInt(this.state.qnum);
    const inc = firebase.firestore.FieldValue.increment(q);
    var weight = this.state.staticArrayItem;
    switch (weight) {
      case "جالون":
        ref.update({
          "properties.جالون.store_num": inc,
        });

        break;
      case "كيلو":
        ref
          .update({
            "properties.كيلو.store_num": inc,
          })

          .catch((error) => {
            console.log(error);
          });
        break;
      case "بستلة":
        ref
          .update({
            "properties.بستلة.store_num":
              parseInt(this.state.snum) + parseInt(this.state.qnum),
          })

          .catch((error) => {
            console.log(error);
          });
        break;
    }
    console.log("updated");
  }
  store_num() {
    const ref = firebase
      .firestore()
      .collection("materials/")
      .doc(this.state.dynamicArrayItem);
    ref.onSnapshot((doc) => {
      try {
        if (doc.exists) {
          this.setState({
            snum: doc.data().properties[this.state.staticArrayItem].store_num,
          });
        } else {
          console.log("not exist");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
 /* weight() {
    const ref = firebase
      .firestore()
      .collection("materials/")
      .doc(this.state.dynamicArrayItem);
      ref.get().then((doc) => {
      try {
        if (doc.exists) {
          this.setState({
            weight: doc.data().properties[this.state.staticArrayItem].weight,
          });
        } else {
          console.log("not exist");
        }
      } catch (error) {
        console.log(error);
      }
    });
  }*/
  //add to array
  addToArray(v, y, t, q) {
    const ref = firebase.firestore().collection("materials/").doc(v);
    ref.get().then((doc) => {
      try {
        if (doc.exists) {
          var z = {
            name: v,
            properties: doc.data().properties[y],
            selling_price: doc.data().properties[y].selling_price[t],
            quantity: q,
          };

          sampleArray.push(z);
          this.updateMinus(y);
        } else {
          console.log("not exist");
        }
      } catch (error) {
        console.log(error);
      }
    });

    console.log(sampleArray);

    return JSON.stringify(sampleArray);
  }
  //add to array
  addToBuyArray(v, y, q) {
    const ref = firebase.firestore().collection("materials/").doc(v);
    ref.get().then((doc) => {
      try {
        if (doc.exists) {
          var z = {
            name: v,
            weight: y,
            properties: doc.data().properties[y],
            buying_price: doc.data().properties[y].buying_price,
            quantity: q,
          };

          buyingArray.push(z);
        } else {
          console.log("not exist");
        }
      } catch (error) {
        console.log(error);
      }
    });
    this.updatePlus();
    console.log(buyingArray);

    return JSON.stringify(buyingArray);
  }
  //print action
  state = {
    currentSelectedPrinter: null,
  };
  // iOS Only
  choosePrinter = async () => {
    const currentSelectedPrinter = await RNPrint.selectPrinter({
      x: 100,
      y: 100,
    });
    this.setState({ currentSelectedPrinter });
  };

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.currentSelectedPrinter) {
      alert("Must Select Printer First");
    } else {
      await RNPrint.Print({
        printerURL: this.state.currentSelectedPrinter.url,
        html: "<h1>Silent Print</h1>",
      });
    }
  };

  async printHTML() {
    await Print.printToFileAsync({
      html: "<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>",
    });
  }

  // iOS UI Only
  iosOptions = () => {
    return (
      <View>
        <Button
          block
          bordered
          style={{ margin: 15 }}
          onPress={this.choosePrinter}
        >
          <Text>Choose Printer</Text>
        </Button>
        <Button
          block
          bordered
          style={{ margin: 15 }}
          onPress={this.silentPrint}
        >
          <Text>Silent Prinitng</Text>
        </Button>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Form>
          <Grid>
            <Row>
              <Col>
                <SearchableDropdown
                  onTextChange={(text) => console.log(text)}
                  //On text change listner on the searchable input
                  onItemSelect={(item) => {
                    this.setState({ typeItem: item.name });
                  }}
                  //onItemSelect called after the selection from the dropdown
                  containerStyle={{ padding: 5 }}
                  //suggestion container style
                  textInputStyle={{
                    //inserted text style
                    padding: 12,
                  }}
                  itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: "#FAF9F8",
                    borderColor: "#bbb",
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    //single dropdown item's text style
                    color: "#222",
                  }}
                  itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: "60%",
                  }}
                  items={type}
                  //mapping of item array
                  defaultIndex={2}
                  //default selected item index
                  placeholder="placeholder"
                  //place holder for the search input
                  resetValue={false}
                  //reset textInput Value with true and false state
                  underlineColorAndroid="transparent"
                  //To remove the underline from the android input
                />
              </Col>
              <Col>
                <Item floatingLabel>
                  <Label>Company name</Label>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    placeholder="company name"
                    onChangeText={(companyName) => {
                      this.companyName = companyName;
                    }}
                  />
                </Item>
              </Col>
              <Col>
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select date"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
                <Text>
                  Date: {this.state.chosenDate.toString().substr(4, 12)}
                </Text>
              </Col>
              <Col>
                <Item floatingLabel last>
                  <Label>Reciept No.</Label>
                  <TextInput
                    style={{
                      height: 40,
                      backgroundColor: "#FAF9F8",
                      borderColor: "#bbb",
                      borderWidth: 1,
                    }}
                    placeholder="reciept no."
                    onChangeText={(value) => {
                      this.recieptNo = value;
                    }}
                  />
                </Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Text style={{ marginLeft: 10 }}>Material</Text>
                <SearchableDropdown
                  onTextChange={(text) => console.log(text)}
                  //On text change listner on the searchable input
                  onItemSelect={(item) => {
                    this.setState({
                      dynamicArrayItem: item.name,
                      staticArrayItem: null,
                    });
                  }}
                  //onItemSelect called after the selection from the dropdown
                  containerStyle={{ padding: 5 }}
                  //suggestion container style
                  textInputStyle={{
                    //inserted text style
                    padding: 12,
                  }}
                  itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: "#FAF9F8",
                    borderColor: "#bbb",
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    //single dropdown item's text style
                    color: "#222",
                  }}
                  itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: "60%",
                  }}
                  items={mNames}
                  //mapping of item array
                  defaultIndex={2}
                  //default selected item index
                  placeholder="placeholder"
                  //place holder for the search input
                  resetValue={false}
                  //reset textInput Value with true and false state
                  underlineColorAndroid="transparent"
                  //To remove the underline from the android input
                />
              </Col>
            </Row>

            <Row>
            
              <Col>
                <Text style={{ marginLeft: 10 }}>Weight</Text>
                <SearchableDropdown
                  onTextChange={(text) => console.log(text)}
                  //On text change listner on the searchable input
                  onItemSelect={(item) => {
                    this.setState({ staticArrayItem: item.name });
                  }}
                  //onItemSelect called after the selection from the dropdown
                  containerStyle={{ padding: 5 }}
                  //suggestion container style
                  textInputStyle={{
                    //inserted text style
                    padding: 12,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    backgroundColor: "#FAF7F6",
                  }}
                  itemStyle={{
                    //single dropdown item style
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: "#FAF9F8",
                    borderColor: "#bbb",
                    borderWidth: 1,
                  }}
                  itemTextStyle={{
                    //single dropdown item's text style
                    color: "#222",
                  }}
                  itemsContainerStyle={{
                    //items container style you can pass maxHeight
                    //to restrict the items dropdown hieght
                    maxHeight: "60%",
                  }}
                  items={items}
                  //mapping of item array
                  defaultIndex={2}
                  //default selected item index
                  placeholder="placeholder"
                  //place holder for the search input
                  resetValue={false}
                  //reset textInput Value with true and false state
                  underlineColorAndroid="transparent"
                  //To remove the underline from the android input
                />
              </Col>
             
            </Row>
           
                <Row>
              <Col>
                <Text>Quantity</Text>
                <TextInput
                  style={{
                    height: 40,
                    backgroundColor: "#FAF9F8",
                    borderColor: "#bbb",
                    borderWidth: 1,
                  }}
                  placeholder={
                    (this.state.dynamicArrayItem == null ||
                    this.state.staticArrayItem == null
                      ? ""
                      : this.store_num(),
                    JSON.stringify(this.state.snum))
                  }
                  onChangeText={(qnum) => this.setState({ qnum })}
                />
              </Col>
            </Row>
          </Grid>
        </Form>
        <Text style={{ marginLeft: 10 }}>
          {this.state.dynamicArrayItem == null ||
          this.state.staticArrayItem == null
            ? ""
            : this.state.qnum}
        </Text>
        <Button
          title="sell"
          onPress={() => {
            this.state.dynamicArrayItem == null ||
            this.state.staticArrayItem == null ||
            this.state.qnum == null
              ? ""
              : this.addToArray(
                  this.state.dynamicArrayItem,
                  this.state.staticArrayItem,
                  this.state.typeItem,
                  this.state.qnum
                );
          }}
        />
        <Button
          title="buy"
          onPress={() => {
            this.state.dynamicArrayItem == null ||
            this.state.staticArrayItem == null ||
            this.state.qnum == null
              ? ""
              : this.addToBuyArray(
                  this.state.dynamicArrayItem,
                  this.state.staticArrayItem,
                  this.state.qnum
                );
          }}
        />
        <Button
          title="Go to Selling Receipt"
          onPress={() =>
            this.props.navigation.push("Blog", {
              array: sampleArray,
              company: this.companyName,
              recieptNo: this.recieptNo,
            })
          }
        />
        <Button
          title="Go to Buying Reciept"
          onPress={() =>
            this.props.navigation.push("BlogDetails", {
              array: buyingArray,
              company: this.companyName,
              recieptNo: this.recieptNo,
            })
          }
        />
        {Platform.OS === "ios" && this.iosOptions()}
        <Button
          title="print"
          block
          bordered
          style={{ margin: 15 }}
          onPress={this.printHTML}
        />
      </View>
    );
  }
}

export default Home;
