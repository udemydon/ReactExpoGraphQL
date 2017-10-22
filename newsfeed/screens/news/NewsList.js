import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, ActivityIndicator} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

//ES6
class NewsList extends Component {

	static navigationOptions = {
    	title: 'News'
  	};

  	constructor(props){
  		super(props);
  		const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
  		this.state = {
  			dataSource: ds.cloneWithRows([])
  		}
  	}

  	componentWillReceiveProps(nextProps){
  		const {data} = nextProps;
  		if (!data.loading && !data.error) {
            const {dataSource} = this.state;
            //console.log("News Items:", data.allNewsItems);
            this.setState({
                dataSource: dataSource.cloneWithRows(data.allNewsItems)
            });
        }
  	}
	
	render(){
		console.log("ERROR:", this.props.data.error);
		if (this.props.data.error) {       
            return (
                <View style={styles.container}>
                    <Text>Error occurred while showing the available News. Try again!</Text>
                </View>
            );
        }

        if (this.props.data.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        }
		return (
			<ListView
				enableEmptySections
				dataSource={this.state.dataSource} 
				renderRow={this._renderRow}
				renderSeparator={this._renderSeparator}
			/>	
		);
	}

	_renderRow(newsItem){
		return(
			<View style={styles.itemContainer}>
				<Text>{newsItem.title}</Text>
			</View>	
		);
	}

	_renderSeparator(){
		return (
			<View style={styles.itemSeparator} />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
	},
	itemContainer: {
		height: 50,
		padding: 10
	},
	itemSeparator: {
		height:1,
		backgroundColor: '#CCC'
	}
})

const NewsItemsQuery = gql`
	query NewsItems {
		allNewsItems {
			title
		}
	}
`;

export const NewsListWithData = graphql(NewsItemsQuery)(NewsList);