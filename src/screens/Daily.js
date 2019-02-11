//Daily Strength Weakness results screen
import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Header } from '../common';
import { dailyDateFetch } from '../actions';
import styles from '../Styles';

class Daily extends Component {

  static navigationOptions = {
    title: 'Daily',
  }

  //initiate 'dailyDateFetch' action
  componentDidMount() {
    this.props.dailyDateFetch();
  }

 onRenderItem = ({ item }) => (
      this.listText(item)
 );

 //recognise 'date' state change
 ComponentDidUpdate(prevProps) {
   if (this.props.date !== prevProps.date) {
     this.props.date = prevProps.date;
   }
 }

 listText(item) {
   return (
     <Text style={styles.listStyle}>
       {item.rank}:    {item.currency}
     </Text>
   );
 }

 //to set up the unique key for the Flatlist data (required)
keyExtractor = (item) => item.id;

 render() {
   return (
    <Card>

      <Header>
        Daily Timeframe
      </Header>


      <Text style={styles.listHeaderStyle}>
        Strongest to Weakest
        {'\n'}{this.props.formatDate}
      </Text>

      <View>
        <FlatList
          data={this.props.list}
          keyExtractor={this.keyExtractor}
          extraData={this.state}
          inverted
          renderItem={this.onRenderItem}
          initialNumToRender={8}
        />

      </View>

    </Card>
  );
 }
}

const mapStateToProps = ({ data }) => ({
  date: data.date,
  list: data.list,
  formatDate: data.formatDate,
});

export default connect(mapStateToProps, { dailyDateFetch })(Daily);
