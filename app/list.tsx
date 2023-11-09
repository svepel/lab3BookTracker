import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { getBookByISBN } from "../api/books";
import * as book1 from "../api/book1.json";
import * as book2 from "../api/book2.json";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "../config/FirebaseConfig";

const list = () => {
	const [scanned, setScanned] = useState(false);
	const [showScanner, setShowScanner] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = async ({
		type,
		data,
	}: {
		type: string;
		data: string;
	}) => {
		setScanned(true);
		const code = data;
		const bookData = await getBookByISBN(code);
		console.log("🚀 ~ file: list.tsx:30 ~ list ~ bookData:", bookData);

		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	const addBook = async () => {
		const result = book1.items[0];
		const newBook = {
			bookId: result.id,
			volumeInfo: result.volumeInfo,
			webReaderLink: result.accessInfo.webReaderLink,
			textSnippet: result.searchInfo.textSnippet,
			favorite: false,
			created: serverTimestamp(),
		};
		const db = await addDoc(
			collection(FIRESTORE_DB, "users", "simon", "books"),
			newBook
		);
		console.log("🚀 ~ file: list.tsx:53 ~ addBook ~ db:", db);
	};

	return (
		<View style={styles.container}>
			{showScanner && (
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			)}

			{hasPermission && (
				//setShowScanner(true)
				<TouchableOpacity style={styles.fab} onPress={() => addBook()}>
					<Text style={styles.fabText}>+</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// Add your other styles here
	},
	fab: {
		backgroundColor: "#007AFF", // Background color of the FAB
		width: 60, // Adjust the size as needed
		height: 60,
		borderRadius: 30, // Make it round by setting half of the width and height
		position: "absolute",
		bottom: 20, // Adjust the position as needed
		right: 20,
		alignItems: "center",
		justifyContent: "center",
		elevation: 5, // Add elevation for a shadow effect
	},
	fabText: {
		color: "white", // Text color of the FAB
		fontSize: 24, // Adjust the text size as needed
	},
});

export default list;
