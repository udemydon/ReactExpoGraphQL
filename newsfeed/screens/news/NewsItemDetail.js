import React, {Component} from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

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
			<View style={{padding: 10}}>
				<Text>{this.props.data.NewsItem.content}</Text>
			</View>
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
	}
})