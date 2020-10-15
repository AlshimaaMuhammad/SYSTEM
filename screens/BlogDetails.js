// screens/BlogDetails.js

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
import * as Print from "expo-print";
/* <FlatList
          data={array}
          renderItem={({ item }) => <Text>{item.name.name}</Text>}
        />*/
class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      discount: null,
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
    var z = parseInt(this.state.discount);
    console.log("z" + z);
    var t = x - z;
    console.log("t" + t);
    var tt = t + y;
    console.log("tt" + tt);

    return tt;
  }
  handle3() {
    var t = parseFloat(this.handle2());
    var tax = t * 0.14;

    return tax;
  }
  handle4() {
    var t = parseFloat(this.handle2());
    var d = t * 0.01;
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
    const { array, date, companyName, receiptNo } = this.props.route.params;
    console.log(companyName, date, receiptNo);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{companyName}</Text>
        <Text>{receiptNo}</Text>
        <DataTable>
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
                <DataTable.Cell>{item.weight}</DataTable.Cell>
                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                <DataTable.Cell>{item.buying_price}</DataTable.Cell>
                <DataTable.Cell>
                  {this.handle1(item.buying_price, item.quantity)}
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
              <Text>discount</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <TextInput
                placeholder="discount"
                onChangeText={(discount) =>
                  this.setState({
                    discount,
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

export default BlogDetails;
