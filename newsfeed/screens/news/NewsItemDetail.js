import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet, WebView, Dimensions} from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class NewsItemDetail extends Component{
	render(){
		if (this.props.data.error) {       
            return (
                <View style={styles.container}>
                    <Text>Error occurred while showing the available NewsItem. Try again!</Text>
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
			
				<WebView style={styles.webViewContainer} source={{html:this.props.data.NewsItem.contentHTML}} />
	
		)
	}
}

const NewsItemDetailQuery = gql`
	query NewsItem ($id: ID!){
		NewsItem (id: $id ) {
			content
		}
	}
`;

export const NewsItemDetailWithData = graphql(NewsItemDetailQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.navigation.state.params.id
    }
  })
})(NewsItemDetail);

const styles = StyleSheet.create({
	container: {
		flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
	},
	webViewContainer: {
		flex: 1,
		backgroundColor: '#fff',
		height, 
		width
	}
})