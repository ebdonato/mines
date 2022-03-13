import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Alert, Platform } from 'react-native'
import params from './src/params'
import {
    Board,
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed,
} from './src/core'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelection from './src/components/LevelSelection'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#AAA',
    },
})

const WON_MESSAGE = '🎉 You Won!'
const LOST_MESSAGE = '🤦‍♂️ You lost!'

type State = {
    board: Board
    won: boolean
    lost: boolean
}

export default function App() {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    const minesAmount = () => Math.ceil(cols * rows * params.difficultLevel)

    const defaultState = (): State => ({
        board: createMinedBoard(rows, cols, minesAmount()),
        won: false,
        lost: false,
    })

    const [state, setState] = useState<State>(defaultState())

    const [showLevelSelection, setShowLevelSelection] = useState(false)

    const showAlert = (message: string | null) => {
        if (!message) return

        if (Platform.OS === 'web') {
            // eslint-disable-next-line no-alert
            alert(message)
        } else {
            Alert.alert(message)
        }
    }

    const openFieldHandle = (row: number, column: number): void => {
        const board = cloneBoard(state.board)

        openField(board, row, column)

        const lost = hadExplosion(board)
        const won = wonGame(board)

        let message: string | null = null

        if (lost) {
            showMines(board)
            message = LOST_MESSAGE
        }

        if (won) {
            message = WON_MESSAGE
        }

        setState({
            board,
            lost,
            won,
        })

        showAlert(message)
    }

    const selectFieldHandle = (row: number, column: number): void => {
        const board = cloneBoard(state.board)

        invertFlag(board, row, column)

        const won = wonGame(board)

        let message: string | null = null

        if (won) {
            message = WON_MESSAGE
        }

        setState({
            board,
            won,
            lost: false,
        })

        showAlert(message)
    }

    const newGame = () => {
        setState(defaultState())
        setShowLevelSelection(false)
    }

    const levelSelectionHandle = (level: number) => {
        params.difficultLevel = level
        newGame()
    }

    return (
        <View style={styles.container}>
            <LevelSelection
                isVisible={showLevelSelection}
                onCancel={() => setShowLevelSelection(false)}
                onLevelSelected={levelSelectionHandle}
            />
            <Header
                flagsLeft={minesAmount() - flagsUsed(state.board)}
                onNewGame={newGame}
                onFlagPress={() => setShowLevelSelection(true)}
            />
            <View style={styles.board}>
                <MineField board={state.board} onOpenField={openFieldHandle} onSelectField={selectFieldHandle} />
            </View>
            <StatusBar />
        </View>
    )
}
