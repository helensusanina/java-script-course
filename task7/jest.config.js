
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '\\.(js|jsx)$': 'babel-jest'
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy'
    }
};
