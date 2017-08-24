import React, {Component} from 'react';
import {View, Text, ListView, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity} from 'react-native';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

//ES6
class NewsList extends Component {

  	constructor(props){
  		super(props);
  		const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });
  		this.state = {
  			dataSource: ds.cloneWithRows([]),
  			refreshing: false
  		}
  		this._onRefresh = this._onRefresh.bind(this);
  		this._renderRow = this._renderRow.bind(this);
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
				refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
			/>	
		)
	}

	_renderRow(newsItem){
		return(
			<TouchableOpacity style={styles.itemContainer} onPress={this._goToNewsItemDetail.bind(this, newsItem)}>
				<Text>{newsItem.title}</Text>
			</TouchableOpacity>	
		)	
	}

	_renderSeparator(){
		return (
			<View style={styles.itemSeparator} />
		)
	}

	_onRefresh(){
		this.setState({
            refreshing: true
        })
		this.props.data.refetch().then((items) => {
			this.setState({
            	refreshing: false
        	})
		})
	}

	_goToNewsItemDetail(newsItem){
		this.props.navigation.navigate("NewsItemDetail", {id: newsItem.id});
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
			id
			title
		}
	}
`;

export const NewsListWithData = graphql(NewsItemsQuery)(NewsList);