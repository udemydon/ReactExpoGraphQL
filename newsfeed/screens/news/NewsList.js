import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet} from 'react-native';

const ds = new ListView.DataSource({
	rowHasChanged: (r1, r2) => r1.id !== r2.id
})

const newsItems = [
	{
		title: "News Item1"
	},
	{
		title: "News Item2"
	}
]

//ES6
export default class NewsList extends Component {

	static navigationOptions = {
    	title: 'News'
  	};
	
	render(){
		return (
			<ListView
				enableEmptySections
				dataSource={ds.cloneWithRows(newsItems)} 
				renderRow={this._renderRow}
				renderSeparator={this._renderSeparator}
			/>	
		)
	}

	_renderRow(newsItem){
		return(
			<View style={styles.itemContainer}>
				<Text>{newsItem.title}</Text>
			</View>	
		)	
	}

	_renderSeparator(){
		return (
			<View style={styles.itemSeparator} />
		)
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		height: 50,
		padding: 10
	},
	itemSeparator: {
		height:1,
		backgroundColor: '#CCC'
	}
})