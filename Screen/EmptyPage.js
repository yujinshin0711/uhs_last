import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const BookPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://172.18.4.22:3000/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const renderBookItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.tag}</Text>
            <Text>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                renderItem={renderBookItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default BookPage;
