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
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold',
    },
    bgEasy: {
        backgroundColor: '#49b65d',
    },
    bgNormal: {
        backgroundColor: '#2765F7',
    },
    bgHard: {
        backgroundColor: '#F26337',
    },
})

type Props = {
    onCancel: () => void
    onLevelSelected: (l: number) => void
    isVisible: boolean
}

type LevelOptions = {
    label: string
    backgroundColor: string
    difficultLevel: number
}

const levelOptions: LevelOptions[] = [
    {
        label: 'Easy',
        backgroundColor: '#49b65d',
        difficultLevel: 0.1,
    },
    {
        label: 'Normal',
        backgroundColor: '#2765F7',
        difficultLevel: 0.2,
    },
    {
        label: 'Hard',
        backgroundColor: '#F26337',
        difficultLevel: 0.3,
    },
]

export default function LevelSelection({ isVisible, onCancel, onLevelSelected }: Props) {
    return (
        <Modal onRequestClose={onCancel} visible={isVisible} animationType="fade" transparent>
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Choose level</Text>
                    {levelOptions.map(({ backgroundColor, difficultLevel, label }) => (
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor }]}
                            onPress={() => onLevelSelected(difficultLevel)}
                        >
                            <Text style={styles.buttonLabel}>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
    )
}
