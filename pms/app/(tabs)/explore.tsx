"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Sample data for categories and medicines
const categories = [
  { id: "1", name: "All", icon: "grid-outline" },
  { id: "2", name: "Prescription", icon: "document-text-outline" },
  { id: "3", name: "Vitamins", icon: "fitness-outline" },
  { id: "4", name: "Diabetes", icon: "water-outline" },
  { id: "5", name: "Pain Relief", icon: "bandage-outline" },
  { id: "6", name: "Cold & Flu", icon: "thermometer-outline" },
]

const medicines = [
  { id: "1", name: "Paracetamol", category: "Pain Relief", price: 5.99, image: "https://via.placeholder.com/100" },
  { id: "2", name: "Vitamin C", category: "Vitamins", price: 12.5, image: "https://via.placeholder.com/100" },
  { id: "3", name: "Insulin", category: "Diabetes", price: 45.99, image: "https://via.placeholder.com/100" },
  { id: "4", name: "Amoxicillin", category: "Prescription", price: 8.75, image: "https://via.placeholder.com/100" },
  { id: "5", name: "Ibuprofen", category: "Pain Relief", price: 6.25, image: "https://via.placeholder.com/100" },
  { id: "6", name: "Cold Relief", category: "Cold & Flu", price: 9.99, image: "https://via.placeholder.com/100" },
  { id: "7", name: "Vitamin D3", category: "Vitamins", price: 14.5, image: "https://via.placeholder.com/100" },
  { id: "8", name: "Metformin", category: "Diabetes", price: 18.75, image: "https://via.placeholder.com/100" },
]

export default function ExploreScreen() {
  const insets = useSafeAreaInsets()
  const [selectedCategory, setSelectedCategory] = useState("1")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter medicines based on selected category and search query
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesCategory =
      selectedCategory === "1" || medicine.category === categories.find((cat) => cat.id === selectedCategory)?.name
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Medicines</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryItem, selectedCategory === category.id && styles.categoryItemSelected]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons name={category.icon} size={20} color={selectedCategory === category.id ? "#ffffff" : "#64748b"} />
            <Text style={[styles.categoryText, selectedCategory === category.id && styles.categoryTextSelected]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.medicinesGrid}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.medicineCard}>
            <View style={styles.medicineImageContainer}>
              <Ionicons name="heart-outline" size={20} color="#64748b" style={styles.favoriteIcon} />
              <View style={styles.medicineImage}>
                <Ionicons name="medical-outline" size={30} color="#0891b2" />
              </View>
            </View>
            <View style={styles.medicineInfo}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <Text style={styles.medicineCategory}>{item.category}</Text>
              <View style={styles.medicineBottom}>
                <Text style={styles.medicinePrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Ionicons name="add" size={18} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#0f172a",
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#0891b2",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    maxHeight: 50,
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryItemSelected: {
    backgroundColor: "#0891b2",
  },
  categoryText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "#ffffff",
  },
  medicinesGrid: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  medicineCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  medicineImageContainer: {
    position: "relative",
    padding: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  medicineImage: {
    height: 100,
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  medicineInfo: {
    padding: 10,
  },
  medicineName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  medicineCategory: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 8,
  },
  medicineBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0891b2",
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0891b2",
    justifyContent: "center",
    alignItems: "center",
  },
})
