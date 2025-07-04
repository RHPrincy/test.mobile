import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const InfoRow = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
    <View style={styles.modernInfoRow}>
        <View style={styles.iconContainer}>
            <FontAwesome name={icon as any} size={20} color={COLORS.primary} />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.modernInfoLabel}>{label}</Text>
            <Text style={styles.modernInfoValue} numberOfLines={1}>{value}</Text>
        </View>
    </View>
);

interface InfoCardProps {
  isEditing: boolean;
  onEditToggle: () => void;
  name: string;
  onNameChange: (text: string) => void;
  email: string;
  onEmailChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  userData: { name: string; email: string };
}

const InfoCard = ({ isEditing, onEditToggle, name, onNameChange, email, onEmailChange, onSave, onCancel, isSaving, userData }: InfoCardProps) => {
  return (
    <View style={styles.modernCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Mes Informations</Text>
        {!isEditing && (
          <TouchableOpacity onPress={onEditToggle} style={styles.modernEditButton}>
            <FontAwesome name="pencil" size={16} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <View style={styles.editForm}>
            <Text style={styles.inputLabel}>Nom complet</Text>
            <TextInput style={styles.modernInput} value={name} onChangeText={onNameChange} placeholder="Entrez votre nom" />
            
            <Text style={styles.inputLabel}>Adresse Email</Text>
            <TextInput style={styles.modernInput} value={email} onChangeText={onEmailChange} keyboardType="email-address" placeholder="Entrez votre email" />

            <View style={styles.editActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}><Text style={styles.cancelButtonText}>Annuler</Text></TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={onSave} disabled={isSaving}>
                    {isSaving ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Text style={styles.saveButtonText}>Sauvegarder</Text>}
                </TouchableOpacity>
            </View>
        </View>
      ) : (
        <View style={styles.infoSection}>
            <InfoRow icon="user-o" label="Nom complet" value={userData.name} />
            <InfoRow icon="envelope-o" label="Adresse Email" value={userData.email} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    modernCard: { 
        backgroundColor: COLORS.white, 
        borderRadius: 20, 
        padding: 20, 
        marginHorizontal: 20,
        marginBottom: 20,
        elevation: 8,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
    },
    cardHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 15 
    },
    cardTitle: { 
        ...FONTS.h3, 
        color: COLORS.black 
    },
    modernEditButton: { 
        backgroundColor: COLORS.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoSection: { marginTop: 10, },
    modernInfoRow: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    modernInfoRowLast: { borderBottomWidth: 0, },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    infoContent: { flex: 1, },
    modernInfoLabel: { 
        ...FONTS.body4,
        color: COLORS.gray,
        marginBottom: 2,
    },
    modernInfoValue: { 
        ...FONTS.body3,
        fontWeight: '600', 
        color: COLORS.black,
    },
    editForm: { marginTop: 10 },
    inputLabel: { 
        ...FONTS.h4,
        color: COLORS.darkGray, 
        marginBottom: 8,
        marginTop: 10,
    },
    modernInput: { 
        height: 50, 
        backgroundColor: COLORS.lightGray, 
        borderRadius: 15, 
        paddingHorizontal: 15, 
        ...FONTS.body3,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        color: COLORS.black,
    },
    editActions: { 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginTop: 25 
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginRight: 10,
    },
    cancelButtonText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 25,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '600',
    },
});

export default InfoCard;