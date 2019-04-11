const buffConfigs = {
    health: {
        name: 'health',
        value: 20,
        isTemporary: false,
    },
    increaseHpCapacity: {
        name: 'increaseHpCapacity',
        value: 20,
        isTemporary: true,
        time: 30 * 1000,
    },
    increaseVelocity: {
        name: 'increaseVelocity',
        value: 20,
        isTemporary: true,
        time: 15 * 1000,
    }
}

export default buffConfigs;
