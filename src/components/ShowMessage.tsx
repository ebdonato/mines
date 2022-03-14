import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native'

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        padding: 5,
        alignSelf: 'flex-end',
    },
    buttonLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})

type Props = {
    onCancel: () => void
    message: string
    isVisible: boolean
}

export default function ShowMessage({ isVisible, onCancel, message }: Props) {
    return (
        <Modal onRequestClose={onCancel} visible={isVisible} animationType="fade" transparent>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>{message}</Text>
                    <TouchableOpacity style={styles.button} onPress={onCancel}>
                        <Text style={styles.buttonLabel}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
