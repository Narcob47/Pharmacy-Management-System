"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"

// Sample data for order history
const orderHistory = [
  {
    id: "1",
    date: "2023-04-15",
    status: "Delivered",
    items: [
      { name: "Paracetamol", quantity: 2, price: 5.99 },
      { name: "Vitamin C", quantity: 1, price: 12.5 },
    ],
    total: 24.48,
  },
  {
    id: "2",
    date: "2023-04-02",
    status: "Delivered",
    items: [{ name: "Insulin", quantity: 1, price: 45.99 }],
    total: 45.99,
  },
  {
    id: "3",
    date: "2023-03-20",
    status: "Delivered",
    items: [
      { name: "Ibuprofen", quantity: 1, price: 6.25 },
      { name: "Cold Relief", quantity: 1, price: 9.99 },
      { name: "Vitamin D3", quantity: 1, price: 14.5 },
    ],
    total: 30.74,
  },
  {
    id: "4",
    date: "2023-03-10",
    status: "Cancelled",
    items: [{ name: "Metformin", quantity: 1, price: 18.75 }],
    total: 18.75,
  },
  {
    id: "5",
    date: "2023-02-28",
    status: "Delivered",
    items: [
      { name: "Amoxicillin", quantity: 1, price: 8.75 },
      { name: "Vitamin C", quantity: 2, price: 12.5 },
    ],
    total: 33.75,
  },
]

// Sample data for prescription history
const prescriptionHistory = [
  {
    id: "1",
    date: "2023-04-10",
    doctor: "Dr. Sarah Johnson",
    medicines: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
    status: "Active",
    refills: 2,
  },
  {
    id: "2",
    date: "2023-03-15",
    doctor: "Dr. Michael Chen",
    medicines: ["Lisinopril 10mg", "Atorvastatin 20mg"],
    status: "Active",
    refills: 5,
  },
  {
    id: "3",
    date: "2023-02-20",
    doctor: "Dr. Emily Wilson",
    medicines: ["Metformin 500mg"],
    status: "Expired",
    refills: 0,
  },
  {
    id: "4",
    date: "2023-01-05",
    doctor: "Dr. James Brown",
    medicines: ["Prednisone 10mg", "Albuterol Inhaler"],
    status: "Expired",
    refills: 0,
  },
]

export default function HistoryScreen() {
  const insets = useSafeAreaInsets()
  const [activeTab, setActiveTab] = useState("orders")

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.historyCardHeader}>
        <View>
          <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
          <Text style={styles.historyId}>Order #{item.id}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === "Delivered" ? styles.deliveredBadge : styles.cancelledBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.itemsList}>
        {item.items.map((product, index) => (
          <View key={index} style={styles.historyItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {product.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.historyCardFooter}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text-outline" size={16} color="#0891b2" />
          <Text style={styles.actionText}>Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="repeat-outline" size={16} color="#0891b2" />
          <Text style={styles.actionText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="help-circle-outline" size={16} color="#0891b2" />
          <Text style={styles.actionText}>Help</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  const renderPrescriptionItem = ({ item }) => (
    <TouchableOpacity style={styles.historyCard}>
      <View style={styles.historyCardHeader}>
        <View>
          <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
          <Text style={styles.doctorName}>{item.doctor}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === "Active" ? styles.activeBadge : styles.expiredBadge]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.medicinesList}>
        {item.medicines.map((medicine, index) => (
          <View key={index} style={styles.medicineItem}>
            <Ionicons name="medical-outline" size={16} color="#0891b2" />
            <Text style={styles.medicineName}>{medicine}</Text>
          </View>
        ))}
      </View>

      <View style={styles.refillInfo}>
        <Text style={styles.refillLabel}>Refills Remaining:</Text>
        <Text style={[styles.refillCount, item.refills === 0 ? styles.noRefills : null]}>{item.refills}</Text>
      </View>

      {item.status === "Active" && item.refills > 0 && (
        <TouchableOpacity style={styles.refillButton}>
          <Text style={styles.refillButtonText}>Request Refill</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "orders" && styles.activeTab]}
          onPress={() => setActiveTab("orders")}
        >
          <Text style={[styles.tabText, activeTab === "orders" && styles.activeTabText]}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "prescriptions" && styles.activeTab]}
          onPress={() => setActiveTab("prescriptions")}
        >
          <Text style={[styles.tabText, activeTab === "prescriptions" && styles.activeTabText]}>Prescriptions</Text>
        </TouchableOpacity>
      </View>

      {activeTab === "orders" ? (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={prescriptionHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderPrescriptionItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#0891b2",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
  },
  activeTabText: {
    color: "#0891b2",
  },
  listContainer: {
    padding: 15,
  },
  historyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  historyDate: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  historyId: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0f172a",
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0f172a",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveredBadge: {
    backgroundColor: "#dcfce7",
  },
  cancelledBadge: {
    backgroundColor: "#fee2e2",
  },
  activeBadge: {
    backgroundColor: "#e0f2fe",
  },
  expiredBadge: {
    backgroundColor: "#f3f4f6",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  itemsList: {
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 13,
    color: "#64748b",
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  historyCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0f172a",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0891b2",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#0891b2",
    fontWeight: "500",
  },
  medicinesList: {
    marginBottom: 15,
  },
  medicineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  medicineName: {
    marginLeft: 10,
    fontSize: 14,
    color: "#0f172a",
  },
  refillInfo: {
    flexDirection: "row",
    marginBottom: 15,
  },
  refillLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  refillCount: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#0891b2",
  },
  noRefills: {
    color: "#94a3b8",
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
})
