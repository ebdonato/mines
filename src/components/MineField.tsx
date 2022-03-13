/* eslint-disable react/no-array-index-key */
import { StyleSheet, View } from 'react-native'
import { Field as FieldType, Board as BoardType } from '../core'
import Field from './Field'

type Props = {
    board: BoardType
    onOpenField: (r: number, c: number) => void
    onSelectField: (r: number, c: number) => void
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    },
})

export default function MineField({ board, onOpenField, onSelectField }: Props) {
    const rows = board.map((row: FieldType[], rowIndex) => {
        const columns = row.map((field: FieldType, colIndex) => {
            const { opened, flagged, mined, exploded, nearMines } = field

            return (
                <Field
                    nearMines={nearMines}
                    onOpen={() => onOpenField(rowIndex, colIndex)}
                    onSelect={() => onSelectField(rowIndex, colIndex)}
                    opened={opened}
                    flagged={flagged}
                    mined={mined}
                    exploded={exploded}
                    key={colIndex}
                />
            )
        })

        return (
            <View key={rowIndex} style={{ flexDirection: 'row' }}>
                {columns}
            </View>
        )
    })
    return <View style={styles.container}>{rows}</View>
}
