import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function HomeScreen() {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, John</Text>
          <Text style={styles.subGreeting}>Welcome back!</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#0891b2" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#64748b" />
          <Text style={styles.searchPlaceholder}>Search medicines, symptoms...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#e0f2fe" }]}>
              <Ionicons name="medkit-outline" size={24} color="#0891b2" />
            </View>
            <Text style={styles.actionText}>Medicines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#dcfce7" }]}>
              <Ionicons name="calendar-outline" size={24} color="#16a34a" />
            </View>
            <Text style={styles.actionText}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#fef3c7" }]}>
              <Ionicons name="document-text-outline" size={24} color="#d97706" />
            </View>
            <Text style={styles.actionText}>Prescriptions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: "#f3e8ff" }]}>
              <Ionicons name="cart-outline" size={24} color="#9333ea" />
            </View>
            <Text style={styles.actionText}>Orders</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.upcomingSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Refills</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.refillsScroll}>
          <TouchableOpacity style={styles.refillCard}>
            <View style={styles.refillCardContent}>
              <View style={styles.medicineIconContainer}>
                <Ionicons name="pill-outline" size={24} color="#0891b2" />
              </View>
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>Amoxicillin</Text>
                <Text style={styles.medicineDetails}>500mg • 30 tablets</Text>
                <View style={styles.refillDate}>
                  <Ionicons name="calendar-outline" size={14} color="#64748b" />
                  <Text style={styles.refillDateText}>Refill in 2 days</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.refillButton}>
              <Text style={styles.refillButtonText}>Refill Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refillCard}>
            <View style={styles.refillCardContent}>
              <View style={styles.medicineIconContainer}>
                <Ionicons name="medical-outline" size={24} color="#0891b2" />
              </View>
              <View style={styles.medicineInfo}>
                <Text style={styles.medicineName}>Lisinopril</Text>
                <Text style={styles.medicineDetails}>10mg • 90 tablets</Text>
                <View style={styles.refillDate}>
                  <Ionicons name="calendar-outline" size={14} color="#64748b" />
                  <Text style={styles.refillDateText}>Refill in 5 days</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.refillButton}>
              <Text style={styles.refillButtonText}>Refill Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.nearbySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pharmacyCard}>
          <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.pharmacyImage} />
          <View style={styles.pharmacyInfo}>
            <Text style={styles.pharmacyName}>MediCare Pharmacy</Text>
            <View style={styles.pharmacyDetails}>
              <Ionicons name="location-outline" size={14} color="#64748b" />
              <Text style={styles.pharmacyAddress}>123 Health St, Medical District</Text>
            </View>
            <View style={styles.pharmacyDetails}>
              <Ionicons name="time-outline" size={14} color="#64748b" />
              <Text style={styles.pharmacyHours}>Open until 9:00 PM</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  subGreeting: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  notificationButton: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
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
  searchPlaceholder: {
    marginLeft: 10,
    color: "#94a3b8",
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#0891b2",
    justifyContent: "center",
    alignItems: "center",
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 15,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionItem: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
  upcomingSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: "#0891b2",
    fontWeight: "500",
  },
  refillsScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  refillCard: {
    width: 280,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  refillCardContent: {
    flexDirection: "row",
    marginBottom: 15,
  },
  medicineIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  medicineDetails: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
  },
  refillDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  refillDateText: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 5,
  },
  refillButton: {
    backgroundColor: "#0891b2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  refillButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  nearbySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  pharmacyCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  pharmacyInfo: {
    flex: 1,
    justifyContent: "center",
  },
  pharmacyName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 8,
  },
  pharmacyDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  pharmacyAddress: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 5,
  },
  pharmacyHours: {
    fontSize: 13,
    color: "#64748b",
    marginLeft: 5,
  },
})
