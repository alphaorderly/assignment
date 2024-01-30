import { ResponsiveContainer, Line, XAxis, YAxis, LineChart } from 'recharts'

interface IProp {
    data: object[]
    margin: [number, number, number, number]
    dataKey: string
    color: string
}

export default function SensorLineChart({
    data,
    margin,
    dataKey,
    color,
}: IProp) {
    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart
                data={data}
                margin={{
                    top: margin[0],
                    right: margin[1],
                    bottom: margin[2],
                    left: margin[3],
                }}
            >
                <Line type="monotone" dataKey={dataKey} stroke={color} />
                <XAxis />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    )
}
