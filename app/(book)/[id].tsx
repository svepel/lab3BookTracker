import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
	Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams, useNavigation } from "expo-router";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../config/FirebaseConfig";
import { Ionicons } from "@expo/vector-icons";

const BookPage = () => {
	const { id } = useGlobalSearchParams();
	const [book, setBook] = useState<any>(null);

	useEffect(() => {
		if (!id) return;
		const load = async () => {
			const fbDoc = await getDoc(doc(FIRESTORE_DB, `users/simon/books/${id}`));
			if (!fbDoc.exists()) return;
			const data = await fbDoc.data();
			console.log("🚀 ~ file: [id].tsx:17 ~ load ~ data:", data);

			setBook(data);
		};
		load();
	}, [id]);

	return (
		<View>
			<Text>BookPage</Text>
		</View>
	);
};

export default BookPage;
