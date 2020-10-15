// screens/Blog.js

import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import { DataTable } from "react-native-paper";
import RNPrint from "react-native-print";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Print from "expo-print";
import { Form, Item, Label } from "native-base";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      transport: 0,
      total_after_dis: null,
      dis: null,
    };
  }
  handle1(x, y) {
    this.setState((state) => ({ total: state.total + x * y }));
    return x * y;
  }
  handle2() {
    var x = parseInt(this.state.total);
    console.log("x" + x);
    var y = parseInt(this.state.transport);
    console.log("y" + y);
    
    
    var t = x + y;
    console.log("t" + t);

    return t;
  }
  handle3() {
    var t = parseFloat(this.handle2());
    var tax = t * 0.14;

    return tax;
  }
  handle4() {
    var t = parseFloat(this.handle2());
    var d = parseFloat(t * 0.01,1);
    this.setState({
      dis: d,
    });
    return d;
  }
  handle5() {
    var num = parseFloat(this.handle2());
    var tax = parseFloat(this.handle3());
    var dis = parseFloat(this.state.dis);
    var t = num + tax + dis;
    return t;
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
    const { array, company, receiptNo } = this.props.route.params;
    console.log(array);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Grid><Row><Col><Text>NAME :</Text> 
        </Col>
        <Col><TextInput
        placeholder="Customer name"
        /></Col>
        <Col><Text>receiptNo :</Text> 
        </Col>
        <Col><TextInput
        placeholder="Resciept number"
        /></Col></Row></Grid>
        
        
        <DataTable style={{margin:1}}>
          <DataTable.Header>
            <DataTable.Title>Material Name</DataTable.Title>
            <DataTable.Title>Weight</DataTable.Title>
            <DataTable.Title>Quantity</DataTable.Title>
            <DataTable.Title>Price Per one</DataTable.Title>
            <DataTable.Title>Total</DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={array}
            renderItem={({ item }) => (
              <DataTable.Row>
                <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.properties.weight}</DataTable.Cell>
                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                <DataTable.Cell>{item.selling_price}</DataTable.Cell>
                <DataTable.Cell>
                  {this.handle1(item.selling_price, item.quantity)}
                </DataTable.Cell>
              </DataTable.Row>
            )}
          />
        </DataTable>
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>total</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{this.state.total}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>transport</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <TextInput
                placeholder="transport fees"
                onChangeText={(transport) =>
                  this.setState({
                    transport,
                  })
                }
              />
            </DataTable.Cell>
          </DataTable.Row>
          
          
          <DataTable.Row>
            <DataTable.Cell>
              <Text>total after discount</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{this.handle2()}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>tax</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{this.handle3()}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text> 1 % discount</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <TextInput
                placeholder={JSON.stringify(this.state.dis)}
                onChangeText={(dis) =>
                  this.setState({
                    dis,
                  })
                }
              />
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>TOTAL</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text>{this.handle5()}</Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row><DataTable.Cell></DataTable.Cell><DataTable.Cell></DataTable.Cell><DataTable.Cell> <Text>"سجل القيمة المضافة : 559_726_288 ضرائب النزهة"</Text></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell></DataTable.Cell><DataTable.Cell></DataTable.Cell><DataTable.Cell>  <Text>س.ت: 319702 
        </Text> </DataTable.Cell></DataTable.Row>
        <DataTable.Row><DataTable.Cell><Text>Chief Financial Officer</Text></DataTable.Cell><DataTable.Cell><Text>Financial</Text></DataTable.Cell><DataTable.Cell>  <Text>Sales 
        </Text> </DataTable.Cell></DataTable.Row><DataTable.Row><DataTable.Cell>............</DataTable.Cell><DataTable.Cell>...........</DataTable.Cell><DataTable.Cell>  
      ............. </DataTable.Cell></DataTable.Row>
        </DataTable>
        {console.log("1% " + this.state.dis)}
       
       
        <Button
          title="calc"
          onPress={() => {
            this.handle4();
          }}
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

export default Blog;
